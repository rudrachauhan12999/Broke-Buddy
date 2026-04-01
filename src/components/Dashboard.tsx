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
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-pixel text-sm text-foreground uppercase tracking-widest">BrokeBuddy</h1>
        <p className="font-retro text-lg text-muted-foreground">Your financial companion 🐱</p>
      </div>

      {/* Cat companion */}
      <div className="pixel-card flex flex-col items-center py-6">
        <PixelCat mood={getCatMood()} skin={catSkin} onSkinChange={onCatSkinChange} showCustomizer />
        <p className="font-retro text-sm text-muted-foreground mt-3">tap the cat! 👆</p>
      </div>

      {/* Relatable balance */}
      <div className="pixel-card bg-accent/10">
        <div className="text-center mb-3">
          <span className="font-pixel text-[8px] text-accent uppercase tracking-wider">Your Balance</span>
          <div className="font-retro text-4xl text-foreground mt-1">₹{balance.toLocaleString()}</div>
        </div>
        <div className="pixel-border-sm bg-card p-3 text-center">
          <p className="font-retro text-xl text-foreground">
            That's <span className="text-pixel-orange font-bold">{chaiCount} chai ☕</span> and{' '}
            <span className="text-pixel-yellow font-bold">{dosaCount} dosa 🥞</span> left!
          </p>
          <p className="font-retro text-sm text-destructive mt-1">
            ⚠️ You'll run out in ~{daysLeft} days
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="pixel-card space-y-3">
        <h3 className="font-pixel text-[8px] text-foreground uppercase tracking-wider">Stats</h3>
        <StatBar label="Balance" value={Math.min(100, (balance / 10000) * 100)} icon="💰" color="hsl(var(--accent))" />
        <StatBar label="Spending Habit" value={65} icon="🍔" color="hsl(var(--pixel-orange))" />
        <StatBar label="Risk Level" value={40} icon="📉" color="hsl(var(--destructive))" />
        <StatBar label="Discipline" value={72} icon="🧠" color="hsl(var(--pixel-blue))" />
        <StatBar label="Savings" value={35} icon="🎯" color="hsl(var(--pixel-green))" />
      </div>

      {/* Spending categories */}
      <div className="pixel-card">
        <h3 className="font-pixel text-[8px] text-foreground uppercase tracking-wider mb-3">This Month</h3>
        <div className="grid grid-cols-3 gap-2">
          {spendingCategories.map(cat => (
            <div key={cat.label} className="pixel-border-sm p-2 text-center bg-muted/50">
              <span className="text-xl block">{cat.icon}</span>
              <span className="font-pixel text-[6px] text-foreground block mt-1">{cat.label}</span>
              <span className="font-retro text-sm text-muted-foreground">₹{cat.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Test balance over */}
      <button onClick={onTriggerBalanceOver} className="pixel-btn bg-destructive text-destructive-foreground w-full text-[8px]">
        💀 Simulate Balance Over
      </button>
    </div>
  );
};

export default Dashboard;
