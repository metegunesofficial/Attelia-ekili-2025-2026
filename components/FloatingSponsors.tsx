import React from 'react';
import { LEFT_SPONSORS, RIGHT_SPONSORS } from '../constants';

// Tüm sponsor logoları - sayfanın altında sıralı + kardan adamlar yan yana
export const FloatingSponsors: React.FC = () => {
  const allSponsors = [...LEFT_SPONSORS, ...RIGHT_SPONSORS];

  return (
    <>
      {/* Büyük kardan adamlar - logo barının hemen üstünde, sol ve sağda YAN YANA */}
      <div className="fixed bottom-[76px] left-4 z-20 flex items-end gap-2 pointer-events-none">
        <span style={{ fontSize: '120px', lineHeight: 1 }}>⛄</span>
        <span style={{ fontSize: '72px', lineHeight: 1 }}>⛄</span>
      </div>
      <div className="fixed bottom-[76px] right-4 z-20 flex items-end gap-2 pointer-events-none">
        <span style={{ fontSize: '72px', lineHeight: 1 }}>⛄</span>
        <span style={{ fontSize: '120px', lineHeight: 1 }}>⛄</span>
      </div>

      {/* Logo barı */}
      <div className="fixed bottom-0 left-0 right-0 z-20 py-3 px-4 bg-white">
        <div className="flex items-center justify-center gap-6">
          {allSponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex items-center justify-center bg-white"
              style={{
                width: '90px',
                height: '55px',
              }}
            >
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
