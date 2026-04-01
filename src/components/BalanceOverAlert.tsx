import React, { useState, useEffect } from 'react';

interface BalanceOverAlertProps {
  show: boolean;
  onDismiss: () => void;
}

const BalanceOverAlert: React.FC<BalanceOverAlertProps> = ({ show, onDismiss }) => {
  const [phase, setPhase] = useState(0);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!show) { setPhase(0); return; }
    
    // Phase sequence: 0=hunter enters, 1=duck enters, 2=POOF!, 3=hunter falls, 4=message
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => { setPhase(3); setShaking(true); }, 2000),
      setTimeout(() => setShaking(false), 2400),
      setTimeout(() => setPhase(4), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'hsl(var(--foreground) / 0.85)',
        animation: shaking ? 'screen-shake 0.4s ease-in-out' : undefined,
      }}
      onClick={onDismiss}
    >
      <div
        className="pixel-card bg-card max-w-sm w-full text-center relative overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'scale-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* Animation stage */}
        <div className="relative h-32 mb-4 overflow-hidden">
          {/* Hunter */}
          <div
            className="absolute bottom-2 text-4xl transition-all duration-500"
            style={{
              left: phase >= 0 ? '20%' : '-20%',
              opacity: phase >= 3 ? 0 : 1,
              transform: phase >= 3 ? 'rotate(90deg) translateY(20px)' : 'rotate(0)',
              transition: 'all 0.4s ease',
            }}
          >
            🤠
          </div>

          {/* Duck */}
          <div
            className="absolute bottom-2 text-4xl transition-all duration-500"
            style={{
              right: phase >= 1 ? '20%' : '-20%',
              transform: phase === 2 ? 'scale(1.5)' : 'scale(1)',
            }}
          >
            🦆
          </div>

          {/* POOF effect */}
          {phase >= 2 && phase < 4 && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'poof-pop 0.6s ease-out forwards' }}>
              <span className="font-pixel text-2xl text-pixel-orange" style={{ textShadow: '2px 2px 0 hsl(var(--destructive))' }}>
                {phase === 2 ? 'BAM!' : 'POOF!'}
              </span>
            </div>
          )}

          {/* Stars/sparkles */}
          {phase >= 2 && (
            <>
              <span className="absolute top-2 left-1/4 text-xl" style={{ animation: 'float-away 1s ease-out forwards' }}>✨</span>
              <span className="absolute top-4 right-1/3 text-lg" style={{ animation: 'float-away 1.2s ease-out 0.1s forwards' }}>💥</span>
              <span className="absolute top-6 left-1/3 text-sm" style={{ animation: 'float-away 0.8s ease-out 0.2s forwards' }}>⭐</span>
            </>
          )}
        </div>

        {/* Message */}
        {phase >= 4 && (
          <div style={{ animation: 'slide-up 0.4s ease-out' }}>
            <h2 className="font-pixel text-sm text-destructive mb-2">BALANCE OVER 💀</h2>
            <p className="font-retro text-2xl text-foreground mb-2">
              Uh-oh! Your wallet has been defeated!
            </p>
            <p className="font-retro text-lg text-muted-foreground mb-2">
              The duck of debt has arrived... 🎯
            </p>
            <p className="font-retro text-sm text-muted-foreground mb-1 italic">
              "Your wallet has officially given up"
            </p>
            <p className="font-retro text-sm text-destructive mb-4">
              "Even my 9 lives can't save this budget" — 🐱
            </p>
            <button
              onClick={onDismiss}
              className="pixel-btn bg-primary text-primary-foreground w-full active:scale-95 transition-transform"
            >
              I'll do better! 😤
            </button>
          </div>
        )}

        {phase < 4 && (
          <p className="font-retro text-lg text-muted-foreground animate-pulse">
            Something is happening...
          </p>
        )}
      </div>
    </div>
  );
};

export default BalanceOverAlert;
