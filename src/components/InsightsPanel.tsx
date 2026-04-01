import React from 'react';

const achievements = [
  { icon: '🔥', title: 'Saving Streak', desc: '3 days no overspending!', unlocked: true },
  { icon: '🎯', title: 'Budget Master', desc: 'Stayed under budget all week', unlocked: true },
  { icon: '🐱', title: 'Cat Whisperer', desc: 'Kept your cat happy for 7 days', unlocked: false },
  { icon: '💎', title: 'Diamond Saver', desc: 'Saved ₹5,000 in a month', unlocked: false },
];

const investmentNudges = [
  { icon: '📈', title: 'Start a SIP', desc: '₹500/month → ₹12,400 in 2 years', highlight: true },
  { icon: '🏦', title: 'FD Alert', desc: 'Park ₹2,000 at 7% interest' },
  { icon: '💡', title: 'Did you know?', desc: '₹100/day = ₹36,500/year saved!' },
];

const InsightsPanel: React.FC = () => {
  return (
    <div className="space-y-5">
      <h2 className="font-pixel text-xs text-foreground uppercase tracking-widest text-center">
        Insights & Goals 🎯
      </h2>

      {/* AI Insights */}
      <div className="pixel-card bg-secondary/10">
        <h3 className="font-pixel text-[8px] text-secondary uppercase mb-3">🤖 AI Says</h3>
        <div className="space-y-2">
          <p className="font-retro text-lg text-foreground">• You spent 40% more on food this week 🍔</p>
          <p className="font-retro text-lg text-foreground">• 2 unused subscriptions detected 🎵</p>
          <p className="font-retro text-lg text-foreground">• Great job saving on transport! 🚌✨</p>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="font-pixel text-[8px] text-foreground uppercase mb-3 tracking-wider">🏆 Achievements</h3>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map(a => (
            <div key={a.title} className={`pixel-card flex flex-col items-center text-center gap-1 ${
              a.unlocked ? '' : 'opacity-40'
            }`}>
              <span className="text-2xl">{a.icon}</span>
              <span className="font-pixel text-[7px] text-foreground">{a.title}</span>
              <span className="font-retro text-xs text-muted-foreground">{a.desc}</span>
              {a.unlocked && <span className="font-pixel text-[6px] text-accent">✓ UNLOCKED</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Investment Nudges */}
      <div>
        <h3 className="font-pixel text-[8px] text-foreground uppercase mb-3 tracking-wider">📈 Invest Smart</h3>
        <div className="space-y-2">
          {investmentNudges.map(n => (
            <div key={n.title} className={`pixel-card flex items-center gap-3 ${n.highlight ? 'ring-2 ring-accent' : ''}`}>
              <span className="text-2xl">{n.icon}</span>
              <div>
                <span className="font-pixel text-[8px] text-foreground block">{n.title}</span>
                <span className="font-retro text-sm text-muted-foreground">{n.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
