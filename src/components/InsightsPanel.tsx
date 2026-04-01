import React, { useState } from 'react';

const achievements = [
  { icon: '🔥', title: 'Saving Streak', desc: '3 days no overspending!', unlocked: true },
  { icon: '🎯', title: 'Budget Master', desc: 'Stayed under budget all week', unlocked: true },
  { icon: '🐱', title: 'Cat Whisperer', desc: 'Kept your cat happy for 7 days', unlocked: false },
  { icon: '💎', title: 'Diamond Saver', desc: 'Saved ₹5,000 in a month', unlocked: false },
];

const investmentNudges = [
  { icon: '📈', title: 'Start a SIP', desc: '₹500/month → ₹12,400 in 2 years', highlight: true },
  { icon: '🏦', title: 'FD Alert', desc: 'Park ₹2,000 at 7% interest', highlight: false },
  { icon: '💡', title: 'Did you know?', desc: '₹100/day = ₹36,500/year saved!', highlight: false },
];

const InsightsPanel: React.FC = () => {
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <h2 className="font-pixel text-xs text-foreground uppercase tracking-widest text-center">
        Insights & Goals 🎯
      </h2>

      {/* AI Insights */}
      <div className="pixel-card" style={{ background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.08), hsl(var(--pixel-blue) / 0.05))', transform: 'rotate(-0.3deg)' }}>
        <h3 className="font-pixel text-[9px] text-secondary uppercase mb-3 flex items-center gap-2">
          <span className="animate-pulse">🤖</span> AI Says
        </h3>
        <div className="space-y-2.5">
          {[
            { text: 'You spent 40% more on food this week', emoji: '🍔', severity: 'warning' },
            { text: '2 unused subscriptions detected', emoji: '🎵', severity: 'alert' },
            { text: 'Great job saving on transport!', emoji: '🚌', severity: 'good' },
          ].map((insight, i) => (
            <div
              key={i}
              className="pixel-border-sm p-2.5 flex items-start gap-2 transition-all active:scale-98 cursor-pointer hover:bg-muted/30"
              style={{ animationDelay: `${i * 0.1}s`, animation: 'slide-up 0.4s ease-out backwards' }}
            >
              <span className="text-lg mt-0.5">{insight.emoji}</span>
              <p className={`font-retro text-lg ${
                insight.severity === 'warning' ? 'text-pixel-orange' :
                insight.severity === 'alert' ? 'text-destructive' :
                'text-accent'
              }`}>
                {insight.text}
                {insight.severity === 'good' && ' ✨'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ transform: 'rotate(0.3deg)' }}>
        <h3 className="font-pixel text-[9px] text-foreground uppercase mb-3 tracking-wider flex items-center gap-2">
          <span>🏆</span> Achievements
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {achievements.map((a, i) => (
            <div
              key={a.title}
              onClick={() => setExpandedAchievement(expandedAchievement === i ? null : i)}
              className={`pixel-card flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                a.unlocked ? 'hover:scale-102' : 'opacity-35 grayscale'
              }`}
              style={{
                transform: `rotate(${(i % 2 === 0 ? 0.8 : -0.8)}deg)`,
                boxShadow: a.unlocked && expandedAchievement === i ? '0 0 15px hsl(var(--accent) / 0.3)' : undefined,
              }}
            >
              <span className={`text-3xl ${a.unlocked ? '' : 'filter blur-[1px]'}`}>{a.icon}</span>
              <span className="font-pixel text-[7px] text-foreground">{a.title}</span>
              <span className="font-retro text-xs text-muted-foreground">{a.desc}</span>
              {a.unlocked && (
                <span className="font-pixel text-[6px] text-accent flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-accent inline-block" /> UNLOCKED
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Investment Nudges */}
      <div style={{ transform: 'rotate(-0.2deg)' }}>
        <h3 className="font-pixel text-[9px] text-foreground uppercase mb-3 tracking-wider flex items-center gap-2">
          <span>📈</span> Invest Smart
        </h3>
        <div className="space-y-2.5">
          {investmentNudges.map((n, i) => (
            <div
              key={n.title}
              className={`pixel-card flex items-center gap-3 transition-all active:scale-98 cursor-pointer hover:bg-muted/30 ${n.highlight ? '' : ''}`}
              style={{
                transform: `rotate(${i % 2 === 0 ? 0.5 : -0.5}deg)`,
                border: n.highlight ? '2px solid hsl(var(--accent))' : undefined,
                boxShadow: n.highlight ? '0 0 15px hsl(var(--accent) / 0.2), 3px 3px 0 hsl(var(--foreground))' : undefined,
              }}
            >
              <span className={`text-2xl ${n.highlight ? 'animate-float' : ''}`}>{n.icon}</span>
              <div>
                <span className="font-pixel text-[8px] text-foreground block">{n.title}</span>
                <span className="font-retro text-base text-muted-foreground">{n.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
