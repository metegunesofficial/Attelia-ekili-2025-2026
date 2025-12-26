import React from 'react';
import { LEFT_SPONSORS } from '../constants';

export const GoldSponsorsColumn: React.FC = () => {
  return (
    <aside className="col-span-2 flex flex-col h-full min-h-0 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-100 shadow-soft overflow-hidden">
      <div className="overflow-y-auto no-scrollbar p-3 flex flex-col gap-3 flex-1 bg-transparent">
        {LEFT_SPONSORS.map((sponsor) => (
          <div
            key={sponsor.id}
            className="group bg-white/80 p-3 rounded-lg flex items-center justify-center border border-slate-200 shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 h-20 shrink-0"
          >
            <img
              src={sponsor.logoUrl}
              alt={sponsor.name}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: '60px' }}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};