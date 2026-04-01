import React from 'react';

interface StatBarProps {
  label: string;
  value: number; // 0-100
  icon: string;
  color: string; // tailwind color class
}

const StatBar: React.FC<StatBarProps> = ({ label, value, icon, color }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg w-6 text-center">{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-pixel text-[8px] uppercase tracking-wider text-foreground">{label}</span>
          <span className="font-retro text-sm text-muted-foreground">{value}%</span>
        </div>
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{
              width: `${value}%`,
              color: color,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatBar;
