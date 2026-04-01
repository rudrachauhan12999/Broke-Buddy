import React, { useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);

  const getScoreColor = () => {
    if (healthScore >= 70) return 'hsl(var(--accent))';
    if (healthScore >= 40) return 'hsl(var(--pixel-yellow))';
    return 'hsl(var(--destructive))';
  };

  const getScoreLabel = () => {
    if (healthScore >= 70) return 'EXCELLENT';
    if (healthScore >= 40) return 'WARNING';
    return 'CRITICAL';
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow backdrop */}
      <div
        className="absolute -inset-1 rounded-sm opacity-60 blur-md transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--pixel-purple)), hsl(var(--pixel-blue)))`,
          opacity: isHovered ? 0.8 : 0.4,
        }}
      />

      <div
        className="relative overflow-hidden"
        style={{
          transform: `rotate(-1.5deg)`,
          border: '3px solid hsl(var(--foreground))',
          boxShadow: '4px 4px 0 hsl(var(--foreground))',
          background: `linear-gradient(145deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.95))`,
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Scanline effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--background)) 2px, hsl(var(--background)) 4px)'
          }}
        />

        {/* Holographic shimmer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, hsl(var(--pixel-blue) / 0.4) 45%, hsl(var(--pixel-purple) / 0.3) 50%, hsl(var(--pixel-pink) / 0.4) 55%, transparent 60%)',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />

        <div className="p-5 relative z-10">
          {/* Top badge */}
          <div className="flex justify-between items-start mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-accent animate-pulse" />
                <h2 className="font-pixel text-sm text-primary-foreground uppercase tracking-wider">{username}</h2>
              </div>
              <p className="font-retro text-2xl text-muted-foreground mt-1">
                LVL {level} <span className="text-pixel-yellow text-lg">★</span>
              </p>
            </div>
            <div
              className="px-3 py-1.5"
              style={{
                border: '2px solid hsl(var(--primary))',
                boxShadow: '0 0 10px hsl(var(--primary) / 0.3)',
                background: 'hsl(var(--primary) / 0.15)',
              }}
            >
              <span className="font-pixel text-[8px] text-primary">ID-{String(Math.abs(username.split('').reduce((a, c) => a + c.charCodeAt(0), 0))).padStart(4, '0')}</span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mb-5 relative z-10">
            <div className="flex justify-between font-retro text-sm text-muted-foreground mb-1">
              <span>EXP</span>
              <span className="text-pixel-yellow">{xp.toLocaleString()} / {(Math.ceil(xp / 10000) * 10000).toLocaleString()}</span>
            </div>
            <div className="h-3 pixel-border-sm overflow-hidden" style={{ background: 'hsl(var(--foreground) / 0.5)' }}>
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{
                  width: `${(xp % 10000) / 100}%`,
                  background: 'repeating-linear-gradient(90deg, hsl(var(--pixel-yellow)) 0px, hsl(var(--pixel-yellow)) 6px, hsl(var(--pixel-orange)) 6px, hsl(var(--pixel-orange)) 8px)',
                }}
              />
            </div>
          </div>

          {/* Health Score */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-pixel text-[8px] uppercase text-primary tracking-wider">Financial Health</span>
              <span className="font-pixel text-[8px]" style={{ color: getScoreColor() }}>{getScoreLabel()}</span>
            </div>
            <div className="stat-bar">
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{
                  width: `${healthScore}%`,
                  background: `repeating-linear-gradient(90deg, ${getScoreColor()} 0px, ${getScoreColor()} 6px, transparent 6px, transparent 8px)`,
                }}
              />
            </div>
          </div>

          {/* Balance */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-pixel text-[8px] uppercase text-pixel-yellow tracking-wider">Balance</span>
            <span className="font-retro text-3xl text-primary-foreground" style={{ textShadow: '0 0 10px hsl(var(--pixel-yellow) / 0.3)' }}>
              ₹{monthlyBalance.toLocaleString()}
            </span>
          </div>

          {/* Spending tag */}
          <div
            className="px-4 py-2.5 text-center"
            style={{
              border: '2px solid hsl(var(--primary) / 0.5)',
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--pixel-purple) / 0.1))',
              boxShadow: '0 0 15px hsl(var(--primary) / 0.1)',
            }}
          >
            <span className="font-pixel text-[9px] text-primary uppercase tracking-wide">{spendingTag}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
