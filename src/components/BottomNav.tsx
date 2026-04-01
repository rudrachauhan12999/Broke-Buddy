import React from 'react';

interface NavItem {
  icon: string;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { icon: '🏠', label: 'Home', id: 'dashboard' },
  { icon: '💸', label: 'Add', id: 'expense' },
  { icon: '💡', label: 'Insights', id: 'insights' },
  { icon: '🤖', label: 'Chat', id: 'chat' },
  { icon: '🎧', label: 'Wrap', id: 'wrap' },
  { icon: '🪪', label: 'Profile', id: 'profile' },
];

interface BottomNavProps {
  active: string;
  onNavigate: (id: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card pixel-border-sm border-l-0 border-r-0 border-b-0 z-40">
      <div className="flex justify-around items-center py-2 px-1 max-w-lg mx-auto">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-transform ${
              active === item.id ? 'scale-110' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`font-pixel text-[6px] uppercase ${
              active === item.id ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
