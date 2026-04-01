import React, { useState } from 'react';

const wrapData = [
  {
    title: "Your Month in Review",
    subtitle: "March 2026",
    emoji: "📊",
    gradient: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--pixel-pink)))',
    content: "You made 47 transactions this month. That's a lot of beeping! 🔔",
    stat: "47",
    statLabel: "transactions",
  },
  {
    title: "Biggest Category",
    subtitle: "40% of spending",
    emoji: "🍔",
    gradient: 'linear-gradient(135deg, hsl(var(--pixel-orange)), hsl(var(--pixel-yellow)))',
    content: "FOOD took the crown! You spent ₹4,500 on food. That's 45 cups of chai! ☕",
    stat: "₹4,500",
    statLabel: "on food",
  },
  {
    title: "Most Expensive Day",
    subtitle: "March 15th",
    emoji: "💸",
    gradient: 'linear-gradient(135deg, hsl(var(--destructive)), hsl(var(--pixel-orange)))',
    content: "You spent ₹2,800 in one day. Shopping spree alert! 🛍️",
    stat: "₹2,800",
    statLabel: "in one day",
  },
  {
    title: "Biggest Regret",
    subtitle: "That subscription...",
    emoji: "😅",
    gradient: 'linear-gradient(135deg, hsl(var(--pixel-purple)), hsl(var(--pixel-blue)))',
    content: "₹999 on a streaming service you used once. The cat judged you. 🐱",
    stat: "₹999",
    statLabel: "wasted",
  },
  {
    title: "Saving Streak!",
    subtitle: "Personal best",
    emoji: "🔥",
    gradient: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--pixel-green)))',
    content: "You saved for 8 days straight! Your best streak yet! Keep going! 🎉",
    stat: "8",
    statLabel: "day streak",
  },
];

const MonthlyWrap: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-pixel text-xs text-center text-foreground mb-4 uppercase tracking-widest">
        Monthly Wrap 🎧
      </h2>

      {/* Card */}
      <div
        className="flex-1 pixel-card text-primary-foreground flex flex-col items-center justify-center text-center p-6 relative overflow-hidden"
        style={{
          background: wrapData[currentCard].gradient,
          animation: 'slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          minHeight: '300px',
        }}
        key={currentCard}
      >
        {/* Decorative pixels */}
        <div className="absolute top-3 left-3 w-2 h-2 bg-primary-foreground/20" />
        <div className="absolute top-3 right-3 w-2 h-2 bg-primary-foreground/20" />
        <div className="absolute bottom-3 left-3 w-2 h-2 bg-primary-foreground/20" />
        <div className="absolute bottom-3 right-3 w-2 h-2 bg-primary-foreground/20" />

        <span className="text-6xl mb-3" style={{ animation: 'float 2s ease-in-out infinite' }}>{wrapData[currentCard].emoji}</span>
        <h3 className="font-pixel text-xs mb-1 uppercase">{wrapData[currentCard].title}</h3>
        <p className="font-retro text-lg mb-3 opacity-80">{wrapData[currentCard].subtitle}</p>
        
        {/* Big stat */}
        <div className="font-pixel text-3xl mb-1" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}>
          {wrapData[currentCard].stat}
        </div>
        <span className="font-retro text-base opacity-70 mb-3">{wrapData[currentCard].statLabel}</span>
        
        <p className="font-retro text-xl leading-relaxed max-w-xs">{wrapData[currentCard].content}</p>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2.5 mt-4">
        {wrapData.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentCard(i)}
            className={`h-2 pixel-border-sm transition-all ${i === currentCard ? 'bg-primary w-6' : 'bg-muted w-2'}`}
          />
        ))}
      </div>

      {/* Nav buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setCurrentCard(c => Math.max(0, c - 1))}
          disabled={currentCard === 0}
          className="flex-1 pixel-btn bg-muted text-foreground disabled:opacity-30 active:scale-95 transition-transform"
        >
          ← Prev
        </button>
        <button
          onClick={() => setCurrentCard(c => Math.min(wrapData.length - 1, c + 1))}
          disabled={currentCard === wrapData.length - 1}
          className="flex-1 pixel-btn bg-primary text-primary-foreground disabled:opacity-30 active:scale-95 transition-transform"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default MonthlyWrap;
