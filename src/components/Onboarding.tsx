import React, { useState } from 'react';
import BottomNav from './BottomNav';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

const steps = [
  {
    emoji: '🐱',
    title: 'Meet Your Buddy',
    desc: 'A pixel cat that reacts to your spending habits. Keep it happy!',
  },
  {
    emoji: '💰',
    title: 'Track Spending',
    desc: 'See your money in chai ☕ and dosa 🥞, not boring numbers!',
  },
  {
    emoji: '🎮',
    title: 'Level Up',
    desc: 'Earn streaks, achievements, and watch your financial health grow!',
  },
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  if (step < 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <div className="pixel-card max-w-sm w-full text-center" style={{ animation: 'slide-up 0.4s ease-out' }} key={step}>
          <span className="text-6xl block mb-4">{steps[step].emoji}</span>
          <h2 className="font-pixel text-xs text-foreground uppercase mb-2">{steps[step].title}</h2>
          <p className="font-retro text-xl text-muted-foreground mb-6">{steps[step].desc}</p>
          <button
            onClick={() => setStep(s => s + 1)}
            className="pixel-btn bg-primary text-primary-foreground w-full"
          >
            {step < 2 ? 'Next →' : "Let's Go!"}
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, i) => (
              <div key={i} className={`w-3 h-3 pixel-border-sm ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="pixel-card max-w-sm w-full text-center" style={{ animation: 'slide-up 0.4s ease-out' }}>
        <span className="text-5xl block mb-4">🪪</span>
        <h2 className="font-pixel text-xs text-foreground uppercase mb-4">What's your name?</h2>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter username..."
          className="pixel-border-sm bg-card px-4 py-3 font-retro text-2xl text-center text-foreground placeholder:text-muted-foreground outline-none w-full mb-4"
        />
        <button
          onClick={() => name.trim() && onComplete(name.trim())}
          disabled={!name.trim()}
          className="pixel-btn bg-accent text-accent-foreground w-full disabled:opacity-30"
        >
          Start Journey! 🚀
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
