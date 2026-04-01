import React, { useEffect, useState } from 'react';

interface StatBarProps {
  label: string;
  value: number; // 0-100
  icon: string;
  color: string; // hsl color
}

const StatBar: React.FC<StatBarProps> = ({ label, value, icon, color }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const isLow = value < 25;
  const isWarning = value < 50 && value >= 25;

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timeout);
  }, [value]);

  const getBarColor = () => {
    if (value >= 60) return 'hsl(var(--accent))';
    if (value >= 35) return 'hsl(var(--pixel-yellow))';
    return 'hsl(var(--destructive))';
  };

  const dynamicColor = color || getBarColor();

  return (
    <div className={`flex items-center gap-2.5 ${isLow ? 'animate-shake-subtle' : ''}`}>
      <span className={`text-xl w-7 text-center ${isLow ? 'animate-pulse' : ''}`}>{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-pixel text-[8px] uppercase tracking-wider text-foreground">{label}</span>
          <span className={`font-retro text-base ${isLow ? 'text-destructive' : isWarning ? 'text-pixel-yellow' : 'text-muted-foreground'}`}>
            {animatedValue}%
          </span>
        </div>
        <div className="stat-bar relative">
          <div
            className="stat-bar-fill"
            style={{
              width: `${animatedValue}%`,
              color: dynamicColor,
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          {isLow && (
            <div
              className="absolute inset-0 opacity-30"
              style={{
                animation: 'pulse-glow-bar 1.5s ease-in-out infinite',
                boxShadow: `inset 0 0 10px ${dynamicColor}`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatBar;
