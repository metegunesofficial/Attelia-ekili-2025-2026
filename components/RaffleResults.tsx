import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';
import { RAFFLE_RESULTS, INITIAL_PARTICIPANTS } from '../constants';
import { RaffleResult, Participant } from '../types';
import { read, utils, writeFile } from 'xlsx';

// --- Components for Searchable Dropdown ---
interface WinnerSelectorProps {
  currentName: string;
  participants: Participant[];
  onSelect: (name: string) => void;
}

const WinnerSelector: React.FC<WinnerSelectorProps> = ({ currentName, participants, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(currentName);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(currentName);
  }, [currentName]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (search === '') setSearch(currentName);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [currentName, search]);

  const filteredParticipants = participants.filter(p =>
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (name: string) => {
    setSearch(name);
    onSelect(name);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef} style={{ zIndex: isOpen ? 9999 : 'auto' }}>
      <div className="relative">
        <input
          type="text"
          className={`w-full bg-white/10 border ${isOpen ? 'border-amber-400 ring-1 ring-amber-400' : 'border-white/20'} rounded py-1.5 pl-3 pr-6 text-sm text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all`}
          placeholder="Kazanan seç..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
          <Icon name="arrow_drop_down" className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Dropdown - aşağı doğru açılır, animasyonlu */}
      <div
        className={`absolute left-0 top-full mt-1 w-full bg-slate-800 border border-white/20 rounded shadow-xl z-[9999] max-h-40 overflow-y-auto no-scrollbar transform transition-all duration-300 ease-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}
      >
        {filteredParticipants.length > 0 ? (
          <ul>
            {filteredParticipants.map((p) => (
              <li
                key={p.id}
                className="px-3 py-2 text-sm hover:bg-white/10 cursor-pointer"
                onClick={() => handleSelect(p.fullName)}
              >
                <span className="font-medium text-white">{p.fullName}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-3 py-2 text-sm text-white/50 italic">Sonuç bulunamadı</div>
        )}
      </div>
    </div>
  );
};

export const RaffleResults: React.FC = () => {
  const [results, setResults] = useState<RaffleResult[]>(RAFFLE_RESULTS);
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Kazanan güncellendiğinde saat de otomatik dolar
  const handleWinnerUpdate = (id: string, newName: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    setResults(prev => prev.map(r => r.id === id ? { ...r, winnerName: newName, drawnAt: timeStr } : r));
  };

  const handleExport = () => {
    // 1. Prepare Data
    const resultsData = results.map(r => ({
      'Saat': r.drawnAt,
      'Hediye': r.giftTitle,
      'Kategori': r.giftCategory,
      'Kazanan': r.winnerName
    }));

    const participantsData = participants.map(p => ({
      'ID': p.id,
      'Ad Soyad': p.fullName,
      'Departman': p.department || ''
    }));

    // 2. Create Workbook
    const wb = utils.book_new();

    // 3. Create Sheets
    const wsResults = utils.json_to_sheet(resultsData);
    const wsParticipants = utils.json_to_sheet(participantsData);

    // 4. Append Sheets
    utils.book_append_sheet(wb, wsResults, "Çekiliş Sonuçları");
    utils.book_append_sheet(wb, wsParticipants, "Katılımcı Listesi");

    // 5. Download
    writeFile(wb, "Gala_Cekilis_Verileri.xlsx");
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target?.result;
      const wb = read(bstr, { type: 'binary' });

      // Import Participants
      const participantsSheetName = wb.SheetNames.find(n => n.includes("Katılımcı") || n.includes("Personel"));
      if (participantsSheetName) {
        const ws = wb.Sheets[participantsSheetName];
        const data = utils.sheet_to_json(ws) as any[];
        // Map excel columns to state structure
        const mappedParticipants: Participant[] = data.map((row, idx) => ({
          id: row['ID'] || `p-imp-${idx}`,
          fullName: row['Ad Soyad'] || row['Name'] || row['Full Name'] || 'Bilinmeyen',
          department: row['Departman'] || row['Department']
        }));
        if (mappedParticipants.length > 0) setParticipants(mappedParticipants);
      }

      // Import Results/Gifts
      const resultsSheetName = wb.SheetNames.find(n => n.includes("Sonuç") || n.includes("Çekiliş") || n.includes("Hediye"));
      if (resultsSheetName) {
        const ws = wb.Sheets[resultsSheetName];
        const data = utils.sheet_to_json(ws) as any[];
        // Map excel columns to state
        const mappedResults: RaffleResult[] = data.map((row, idx) => ({
          id: `r-imp-${idx}`,
          drawnAt: row['Saat'] || '21:00',
          giftTitle: row['Hediye'] || 'Sürpriz Hediye',
          giftCategory: row['Kategori'] || 'Genel',
          winnerName: row['Kazanan'] || ''
        }));
        if (mappedResults.length > 0) setResults(mappedResults);
      }

      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsBinaryString(file);
  };

  return (
    <section className="flex flex-col h-full min-h-0 overflow-hidden relative">
      {/* Hidden File Input */}
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Actions Only */}
      <div className="px-3 py-1.5 flex items-center justify-end gap-1 z-10">
        <button
          onClick={handleImportClick}
          className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white/80 bg-white/10 hover:bg-white/20 border border-white/20 rounded transition-colors"
          title="Excel Yükle"
        >
          <Icon name="upload_file" className="text-xs" />
          İçe Aktar
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white/80 bg-white/10 hover:bg-white/20 border border-white/20 rounded transition-colors"
          title="Excel İndir"
        >
          <Icon name="download" className="text-xs" />
          Dışa Aktar
        </button>
      </div>

      {/* List Header */}
      <div className="grid grid-cols-12 gap-2 px-3 py-2 text-sm font-bold text-white uppercase tracking-wider border-b border-white/20">
        <div className="col-span-2">Saat</div>
        <div className="col-span-5">Hediye</div>
        <div className="col-span-5">Kazanan</div>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ overflowY: 'auto', overflowX: 'visible', position: 'relative' }}>
        {results.map((result, index) => (
          <div
            key={result.id}
            className={`grid grid-cols-12 gap-2 px-3 py-3 items-center border-b border-white/5 hover:bg-white/5 transition-colors animate-fade-in group`}
            style={{ animationDelay: `${index * 30}ms`, position: 'relative', zIndex: results.length - index }}
          >
            <div className="col-span-2 font-mono text-sm text-white">
              {result.drawnAt}
            </div>
            <div className="col-span-5">
              <p className="font-bold text-white text-sm truncate pr-1" title={result.giftTitle}>{result.giftTitle}</p>
              <p className="text-xs text-white/80 font-medium truncate">{result.giftCategory}</p>
            </div>
            <div className="col-span-5 relative">
              <WinnerSelector
                currentName={result.winnerName}
                participants={participants}
                onSelect={(name) => handleWinnerUpdate(result.id, name)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};