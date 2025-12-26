import React from 'react';
import { ATTELIA_LOGO } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="w-full flex-none py-6 px-4 z-10">
      <style>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
        
        @keyframes sparkleGlow {
          0%, 100% {
            opacity: 0.3;
            filter: blur(0px);
          }
          50% {
            opacity: 1;
            filter: blur(1px);
          }
        }
        
        .sparkle-star {
          position: absolute;
          width: 20px;
          height: 20px;
          pointer-events: none;
        }
        
        .sparkle-star::before,
        .sparkle-star::after {
          content: '';
          position: absolute;
          background: white;
        }
        
        .sparkle-star::before {
          width: 100%;
          height: 3px;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          border-radius: 2px;
          box-shadow: 0 0 10px 2px rgba(255,255,255,0.8), 0 0 20px 4px rgba(255,255,255,0.4);
        }
        
        .sparkle-star::after {
          width: 3px;
          height: 100%;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          border-radius: 2px;
          box-shadow: 0 0 10px 2px rgba(255,255,255,0.8), 0 0 20px 4px rgba(255,255,255,0.4);
        }
        
        .sparkle-1 {
          top: -5px;
          left: -5px;
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .sparkle-2 {
          top: -5px;
          right: -5px;
          animation: sparkle 2s ease-in-out infinite 0.5s;
        }
        
        .sparkle-3 {
          bottom: -5px;
          left: -5px;
          animation: sparkle 2s ease-in-out infinite 1s;
        }
        
        .sparkle-4 {
          bottom: -5px;
          right: -5px;
          animation: sparkle 2s ease-in-out infinite 1.5s;
        }
        
        .sparkle-center {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          animation: sparkle 3s ease-in-out infinite 0.75s;
        }
        
        .sparkle-center::before {
          height: 4px;
          box-shadow: 0 0 15px 3px rgba(255,255,255,0.9), 0 0 30px 6px rgba(255,255,255,0.5);
        }
        
        .sparkle-center::after {
          width: 4px;
          box-shadow: 0 0 15px 3px rgba(255,255,255,0.9), 0 0 30px 6px rgba(255,255,255,0.5);
        }
        
        .logo-container {
          position: relative;
          display: inline-block;
        }
        
        .logo-glow {
          filter: drop-shadow(0 0 20px rgba(255,255,255,0.4)) drop-shadow(0 0 40px rgba(255,215,0,0.3));
        }
      `}</style>
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="logo-container">
          <img
            src={ATTELIA_LOGO}
            alt="ATTELIA"
            className="h-24 object-contain logo-glow"
          />
          {/* Köşe yıldızları */}
          <div className="sparkle-star sparkle-1"></div>
          <div className="sparkle-star sparkle-2"></div>
          <div className="sparkle-star sparkle-3"></div>
          <div className="sparkle-star sparkle-4"></div>
          {/* Merkez yıldız */}
          <div className="sparkle-star sparkle-center"></div>
        </div>
        <h1
          className="text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 uppercase"
          style={{
            textShadow: '0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.3)',
            fontFamily: "'Manrope', sans-serif"
          }}
        >
          ✨ Yeni Yıl Galası ✨
        </h1>
      </div>
    </header>
  );
};