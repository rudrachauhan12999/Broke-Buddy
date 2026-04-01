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
    <nav className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: 'hsl(var(--card))',
        borderTop: '3px solid hsl(var(--foreground))',
        boxShadow: '0 -4px 20px hsl(var(--foreground) / 0.1)',
      }}
    >
      <div className="flex justify-around items-center py-2 px-1 max-w-lg mx-auto">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-all active:scale-90 ${
              active === item.id ? 'scale-110' : 'opacity-50 hover:opacity-100'
            }`}
            style={active === item.id ? {
              filter: 'drop-shadow(0 0 6px hsl(var(--primary) / 0.4))',
            } : undefined}
          >
            <span className={`text-xl transition-transform ${active === item.id ? 'animate-float' : ''}`}>{item.icon}</span>
            <span className={`font-pixel text-[6px] uppercase ${
              active === item.id ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {item.label}
            </span>
            {active === item.id && (
              <div className="w-1 h-1 bg-primary mt-0.5" style={{ boxShadow: '0 0 4px hsl(var(--primary))' }} />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
