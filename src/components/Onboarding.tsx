import React, { useState } from 'react';
import PixelCat from './PixelCat';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

const steps = [
  {
    emoji: '🐱',
    title: 'Meet Your Buddy',
    desc: 'A pixel cat that reacts to your spending habits. Keep it happy!',
    showCat: true,
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
        {/* Floating decorations */}
        <div className="absolute top-20 left-8 text-2xl animate-float opacity-30">✨</div>
        <div className="absolute top-32 right-12 text-xl animate-float opacity-20" style={{ animationDelay: '1s' }}>💰</div>
        <div className="absolute bottom-40 left-16 text-lg animate-float opacity-25" style={{ animationDelay: '0.5s' }}>🎮</div>

        <div
          className="pixel-card max-w-sm w-full text-center"
          style={{ animation: 'slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: `rotate(${step === 1 ? -0.5 : step === 2 ? 0.5 : 0}deg)` }}
          key={step}
        >
          {steps[step].showCat ? (
            <div className="mb-4 flex justify-center">
              <PixelCat mood="happy" skin="orange" />
            </div>
          ) : (
            <span className="text-6xl block mb-4" style={{ animation: 'float 2s ease-in-out infinite' }}>{steps[step].emoji}</span>
          )}
          <h2 className="font-pixel text-xs text-foreground uppercase mb-3">{steps[step].title}</h2>
          <p className="font-retro text-xl text-muted-foreground mb-6">{steps[step].desc}</p>
          <button
            onClick={() => setStep(s => s + 1)}
            className="pixel-btn bg-primary text-primary-foreground w-full active:scale-95 transition-transform"
          >
            {step < 2 ? 'Next →' : "Let's Go!"}
          </button>
          <div className="flex justify-center gap-3 mt-5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 pixel-border-sm transition-all duration-300 ${i <= step ? 'bg-primary' : 'bg-muted'}`}
                style={{ width: i === step ? '24px' : '12px' }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="pixel-card max-w-sm w-full text-center" style={{ animation: 'slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        <div className="mb-4 flex justify-center">
          <PixelCat mood="happy" skin="orange" />
        </div>
        <h2 className="font-pixel text-xs text-foreground uppercase mb-4">What's your name?</h2>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter username..."
          className="pixel-border-sm bg-card px-4 py-3 font-retro text-2xl text-center text-foreground placeholder:text-muted-foreground outline-none w-full mb-4 focus:ring-2 focus:ring-primary transition-shadow"
        />
        <button
          onClick={() => name.trim() && onComplete(name.trim())}
          disabled={!name.trim()}
          className="pixel-btn bg-accent text-accent-foreground w-full disabled:opacity-30 active:scale-95 transition-transform"
        >
          Start Journey! 🚀
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
