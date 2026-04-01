import React from 'react';
import PixelCat from './PixelCat';
import StatBar from './StatBar';

type CatSkin = 'white' | 'calico' | 'orange' | 'gray' | 'brown' | 'black';

interface DashboardProps {
  balance: number;
  catSkin: CatSkin;
  onCatSkinChange: (skin: CatSkin) => void;
  onTriggerBalanceOver: () => void;
}

const spendingCategories = [
  { icon: '🍔', label: 'Food', amount: 4500 },
  { icon: '🚌', label: 'Transport', amount: 1200 },
  { icon: '🎮', label: 'Gaming', amount: 800 },
  { icon: '📱', label: 'Bills', amount: 2000 },
  { icon: '🛍️', label: 'Shopping', amount: 1500 },
  { icon: '☕', label: 'Chai', amount: 600 },
];

const Dashboard: React.FC<DashboardProps> = ({ balance, catSkin, onCatSkinChange, onTriggerBalanceOver }) => {
  const getCatMood = () => {
    if (balance > 5000) return 'happy' as const;
    if (balance > 2000) return 'neutral' as const;
    if (balance > 500) return 'tired' as const;
    return 'angry' as const;
  };

  const chaiCount = Math.floor(balance / 15);
  const dosaCount = Math.floor(balance / 50);
  const daysLeft = Math.ceil(balance / 400);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center pt-1">
        <h1 className="font-pixel text-sm text-foreground uppercase tracking-widest">BrokeBuddy</h1>
        <p className="font-retro text-xl text-muted-foreground mt-0.5">Your financial companion 🐱</p>
      </div>

      {/* Cat companion - larger area */}
      <div className="pixel-card flex flex-col items-center py-8 min-h-[180px] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(var(--card)), hsl(var(--pixel-cream)))' }}>
        {/* Ground line */}
        <div className="absolute bottom-8 left-0 right-0 h-px" style={{ background: 'repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 4px, transparent 4px, transparent 8px)' }} />
        <PixelCat mood={getCatMood()} skin={catSkin} onSkinChange={onCatSkinChange} showCustomizer />
        <p className="font-retro text-sm text-muted-foreground mt-4 animate-pulse">tap the cat! 👆</p>
      </div>

      {/* Relatable balance */}
      <div className="relative" style={{ transform: 'rotate(0.5deg)' }}>
        <div className="pixel-card" style={{ background: 'linear-gradient(135deg, hsl(var(--accent) / 0.08), hsl(var(--pixel-blue) / 0.05))' }}>
          <div className="text-center mb-3">
            <span className="font-pixel text-[8px] text-accent uppercase tracking-wider">Your Balance</span>
            <div className="font-retro text-5xl text-foreground mt-1" style={{ textShadow: '2px 2px 0 hsl(var(--accent) / 0.15)' }}>
              ₹{balance.toLocaleString()}
            </div>
          </div>
          <div className="pixel-border-sm bg-card p-3 text-center" style={{ transform: 'rotate(-0.5deg)' }}>
            <p className="font-retro text-xl text-foreground">
              That's <span className="text-pixel-orange font-bold">{chaiCount} chai ☕</span> and{' '}
              <span className="text-pixel-yellow font-bold">{dosaCount} dosa 🥞</span> left!
            </p>
            <p className="font-retro text-base text-destructive mt-2 flex items-center justify-center gap-1">
              <span className="inline-block animate-pulse">⚠️</span> You'll run out in ~{daysLeft} days
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="pixel-card space-y-3" style={{ transform: 'rotate(-0.3deg)' }}>
        <h3 className="font-pixel text-[9px] text-foreground uppercase tracking-wider flex items-center gap-2">
          <span>⚡</span> Stats
        </h3>
        <StatBar label="Balance" value={Math.min(100, (balance / 10000) * 100)} icon="💰" color="hsl(var(--accent))" />
        <StatBar label="Spending Habit" value={65} icon="🍔" color="hsl(var(--pixel-orange))" />
        <StatBar label="Risk Level" value={40} icon="📉" color="hsl(var(--destructive))" />
        <StatBar label="Discipline" value={72} icon="🧠" color="hsl(var(--pixel-blue))" />
        <StatBar label="Savings" value={35} icon="🎯" color="hsl(var(--pixel-green))" />
      </div>

      {/* Spending categories */}
      <div className="pixel-card" style={{ transform: 'rotate(0.3deg)' }}>
        <h3 className="font-pixel text-[9px] text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>📊</span> This Month
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {spendingCategories.map((cat, i) => (
            <div
              key={cat.label}
              className="pixel-border-sm p-2.5 text-center bg-muted/50 transition-all active:scale-95 hover:bg-muted/80 cursor-pointer"
              style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.8}deg)` }}
            >
              <span className="text-2xl block">{cat.icon}</span>
              <span className="font-pixel text-[7px] text-foreground block mt-1">{cat.label}</span>
              <span className="font-retro text-base text-muted-foreground">₹{cat.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Test balance over */}
      <button
        onClick={onTriggerBalanceOver}
        className="pixel-btn bg-destructive text-destructive-foreground w-full text-[8px] active:scale-95 transition-transform"
      >
        💀 Simulate Balance Over
      </button>
    </div>
  );
};

export default Dashboard;
