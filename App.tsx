import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RaffleResults } from './components/RaffleResults';
import { ChristmasDecorations } from './components/ChristmasDecorations';
import { Christmas3DDecorations } from './components/Christmas3DDecorations';
import { FloatingSponsors } from './components/FloatingSponsors';

export default function App() {
  return (
    <div className="relative flex flex-col w-screen h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-text-main font-display overflow-hidden">
      {/* Yılbaşı dekorasyonları (kar yağışı + yüzen dekorlar) */}
      <ChristmasDecorations />

      {/* 3D Yılbaşı dekorasyonları (Kızak, Cin, Kar Küresi) */}
      <Christmas3DDecorations />

      {/* Sponsor logoları - kenarlardan */}
      <FloatingSponsors />

      {/* Ana içerik */}
      <div className="relative z-10 flex flex-col h-full w-full">
        <Header />

        <main className="flex-1 w-full max-w-3xl mx-auto px-6 pb-4 pt-2 min-h-0">
          {/* Center: Raffle Results List */}
          <RaffleResults />
        </main>

        <Footer />
      </div>
    </div>
  );
}