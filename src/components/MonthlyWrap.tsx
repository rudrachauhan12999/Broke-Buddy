import React from 'react';

const wrapData = [
  {
    title: "Your Month in Review",
    subtitle: "March 2026",
    emoji: "📊",
    bg: "bg-primary",
    content: "You made 47 transactions this month. That's a lot of beeping! 🔔"
  },
  {
    title: "Biggest Category",
    subtitle: "40% of spending",
    emoji: "🍔",
    bg: "bg-pixel-orange",
    content: "FOOD took the crown! You spent ₹4,500 on food. That's 45 cups of chai! ☕"
  },
  {
    title: "Most Expensive Day",
    subtitle: "March 15th",
    emoji: "💸",
    bg: "bg-destructive",
    content: "You spent ₹2,800 in one day. Shopping spree alert! 🛍️"
  },
  {
    title: "Biggest Regret",
    subtitle: "That subscription...",
    emoji: "😅",
    bg: "bg-pixel-purple",
    content: "₹999 on a streaming service you used once. The cat judged you. 🐱"
  },
  {
    title: "Saving Streak!",
    subtitle: "Personal best",
    emoji: "🔥",
    bg: "bg-accent",
    content: "You saved for 8 days straight! Your best streak yet! Keep going! 🎉"
  },
];

const MonthlyWrap: React.FC = () => {
  const [currentCard, setCurrentCard] = React.useState(0);

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-pixel text-xs text-center text-foreground mb-4 uppercase tracking-widest">
        Monthly Wrap 🎧
      </h2>

      {/* Card */}
      <div className={`flex-1 pixel-card ${wrapData[currentCard].bg} text-primary-foreground flex flex-col items-center justify-center text-center p-6`}
        style={{ animation: 'slide-up 0.4s ease-out' }}
        key={currentCard}>
        <span className="text-5xl mb-4">{wrapData[currentCard].emoji}</span>
        <h3 className="font-pixel text-xs mb-1 uppercase">{wrapData[currentCard].title}</h3>
        <p className="font-retro text-lg mb-4 opacity-80">{wrapData[currentCard].subtitle}</p>
        <p className="font-retro text-2xl leading-relaxed">{wrapData[currentCard].content}</p>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {wrapData.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentCard(i)}
            className={`w-3 h-3 pixel-border-sm transition-all ${i === currentCard ? 'bg-primary scale-125' : 'bg-muted'}`}
          />
        ))}
      </div>

      {/* Nav buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setCurrentCard(c => Math.max(0, c - 1))}
          disabled={currentCard === 0}
          className="flex-1 pixel-btn bg-muted text-foreground disabled:opacity-30"
        >
          ← Prev
        </button>
        <button
          onClick={() => setCurrentCard(c => Math.min(wrapData.length - 1, c + 1))}
          disabled={currentCard === wrapData.length - 1}
          className="flex-1 pixel-btn bg-primary text-primary-foreground disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default MonthlyWrap;
