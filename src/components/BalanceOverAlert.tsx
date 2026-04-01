import React, { useState, useEffect } from 'react';

interface BalanceOverAlertProps {
  show: boolean;
  onDismiss: () => void;
}

const BalanceOverAlert: React.FC<BalanceOverAlertProps> = ({ show, onDismiss }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => setFrame(f => (f + 1) % 4), 300);
    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  const duckFrames = ['🦆', '🦆💨', '🦆💥', '💀'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4" onClick={onDismiss}>
      <div className="pixel-card bg-card max-w-sm w-full text-center" style={{ animation: 'shake 0.3s ease-in-out 3' }}
        onClick={e => e.stopPropagation()}>
        {/* Duck animation */}
        <div className="text-6xl mb-4" style={{ animation: 'duck-shoot 2s ease-in-out infinite' }}>
          {duckFrames[frame]}
        </div>

        <h2 className="font-pixel text-sm text-destructive mb-2">BALANCE OVER 💀</h2>
        <p className="font-retro text-xl text-foreground mb-2">
          Uh-oh! Your wallet has been defeated!
        </p>
        <p className="font-retro text-lg text-muted-foreground mb-4">
          The duck of debt has arrived... 🎯
        </p>

        <div className="space-y-2">
          <p className="font-retro text-sm text-destructive">
            "Even my 9 lives can't save this budget" — Your Cat
          </p>
          <button
            onClick={onDismiss}
            className="pixel-btn bg-primary text-primary-foreground w-full mt-4"
          >
            I'll do better! 😤
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceOverAlert;
