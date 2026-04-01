import React from 'react';

interface ProfileCardProps {
  username: string;
  healthScore: number;
  spendingTag: string;
  monthlyBalance: number;
  level: number;
  xp: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  username, healthScore, spendingTag, monthlyBalance, level, xp
}) => {
  const getScoreColor = () => {
    if (healthScore >= 70) return 'text-accent';
    if (healthScore >= 40) return 'text-pixel-yellow';
    return 'text-destructive';
  };

  return (
    <div className="pixel-card bg-foreground relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--background)) 2px, hsl(var(--background)) 4px)'
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h2 className="font-pixel text-sm text-primary-foreground uppercase tracking-wider">{username}</h2>
          <p className="font-retro text-xl text-muted-foreground mt-1">LVL {level}</p>
        </div>
        <div className="pixel-border-sm p-2 bg-primary/20">
          <span className="font-pixel text-[10px] text-primary">ID</span>
        </div>
      </div>

      {/* XP */}
      <div className="mb-4 relative z-10">
        <div className="flex justify-between font-retro text-sm text-muted-foreground">
          <span>EXP</span>
          <span>{xp.toLocaleString()}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3 relative z-10">
        <div>
          <span className="font-pixel text-[8px] uppercase text-primary tracking-wider">Financial Health</span>
          <div className="stat-bar mt-1">
            <div className="stat-bar-fill" style={{ width: `${healthScore}%`, color: 'hsl(var(--accent))' }} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-pixel text-[8px] uppercase text-pixel-yellow tracking-wider">Balance</span>
          <span className="font-retro text-2xl text-primary-foreground">₹{monthlyBalance.toLocaleString()}</span>
        </div>

        <div className="pixel-border-sm bg-primary/10 px-3 py-2 text-center">
          <span className="font-pixel text-[8px] text-primary uppercase">{spendingTag}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
