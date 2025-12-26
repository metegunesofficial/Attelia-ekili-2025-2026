import React, { useMemo } from 'react';
import Snowfall from 'react-snowfall';

// Yılbaşı dekorasyon emojileri - daha büyük ve renkli
const decorations = ['🎅', '🦌', '⭐', '❄️', '🎄', '⛄', '🎁', '🌟', '✨'];

interface FloatingDecorationProps {
  emoji: string;
  style: React.CSSProperties;
  animationDelay: number;
  size: number;
}

const FloatingDecoration: React.FC<FloatingDecorationProps> = ({ emoji, style, animationDelay, size }) => (
  <div
    className="absolute pointer-events-none select-none animate-float"
    style={{
      ...style,
      animationDelay: `${animationDelay}s`,
      fontSize: `${size}px`,
      opacity: 0.7,
      filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
    }}
  >
    {emoji}
  </div>
);

export const ChristmasDecorations: React.FC = () => {
  // Dekorasyonlar (büyük kardan adamlar FloatingSponsors'ta)
  const floatingDecorations = useMemo(() => [
    // Küçük kardan adamlar sayfaya dağılmış
    { emoji: '⛄', style: { left: '15%', top: '15%' }, delay: 1.2, size: 32 },
    { emoji: '⛄', style: { right: '18%', top: '20%' }, delay: 1.5, size: 28 },
    { emoji: '⛄', style: { left: '20%', bottom: '35%' }, delay: 1.8, size: 30 },
    { emoji: '⛄', style: { right: '22%', bottom: '30%' }, delay: 2.1, size: 26 },
    // Diğer dekorasyonlar
    { emoji: '🎅', style: { left: '12%', top: '45%' }, delay: 0, size: 40 },
    { emoji: '🦌', style: { right: '15%', top: '50%' }, delay: 0.5, size: 38 },
    { emoji: '🎄', style: { left: '8%', top: '65%' }, delay: 2, size: 42 },
    { emoji: '🎄', style: { right: '10%', top: '60%' }, delay: 1, size: 45 },
    { emoji: '🎁', style: { right: '20%', bottom: '18%' }, delay: 2, size: 35 },
    { emoji: '🎁', style: { left: '18%', bottom: '15%' }, delay: 0.7, size: 30 },
    { emoji: '⭐', style: { left: '25%', top: '8%' }, delay: 0.8, size: 32 },
    { emoji: '🌟', style: { right: '25%', top: '10%' }, delay: 1.2, size: 28 },
    { emoji: '✨', style: { left: '30%', top: '5%' }, delay: 1.8, size: 26 },
    { emoji: '❄️', style: { right: '30%', top: '6%' }, delay: 0.3, size: 24 },
    { emoji: '❄️', style: { left: '35%', top: '12%' }, delay: 2.2, size: 24 },
  ], []);

  return (
    <>
      {/* Kar yağışı - çok daha yoğun */}
      <Snowfall
        color="white"
        snowflakeCount={180}
        radius={[1, 4]}
        speed={[0.5, 2]}
        wind={[-0.5, 1]}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Yüzen dekorasyonlar */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {floatingDecorations.map((dec, index) => (
          <FloatingDecoration
            key={index}
            emoji={dec.emoji}
            style={dec.style}
            animationDelay={dec.delay}
            size={dec.size}
          />
        ))}
      </div>

      {/* CSS Animasyonları için style */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1) rotate(0deg); 
          }
          25% {
            transform: translateY(-10px) scale(1.05) rotate(3deg);
          }
          50% { 
            transform: translateY(-5px) scale(1.08) rotate(-2deg); 
          }
          75% {
            transform: translateY(-12px) scale(1.03) rotate(2deg);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
