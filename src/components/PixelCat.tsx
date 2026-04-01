import React, { useState, useEffect, useCallback } from 'react';

type CatMood = 'happy' | 'neutral' | 'tired' | 'angry';
type CatSkin = 'white' | 'calico' | 'orange' | 'gray' | 'brown' | 'black';

interface PixelCatProps {
  mood?: CatMood;
  skin?: CatSkin;
  onSkinChange?: (skin: CatSkin) => void;
  showCustomizer?: boolean;
}

const skinColors: Record<CatSkin, { body: string; spots?: string; ears: string }> = {
  white: { body: '#F5F5F5', ears: '#FFD1DC', },
  calico: { body: '#F5F5F5', spots: '#FF8C42', ears: '#FF8C42' },
  orange: { body: '#FF8C42', ears: '#E07030' },
  gray: { body: '#A0A0A0', ears: '#808080' },
  brown: { body: '#8B6914', ears: '#6B4E10' },
  black: { body: '#3A3A3A', ears: '#2A2A2A' },
};

const moodFaces: Record<CatMood, { eyes: string; mouth: string }> = {
  happy: { eyes: '◠ ◠', mouth: 'ω' },
  neutral: { eyes: '• •', mouth: '▽' },
  tired: { eyes: '- -', mouth: '~' },
  angry: { eyes: '> <', mouth: 'Д' },
};

const moodMessages: Record<CatMood, string[]> = {
  happy: ['Purr~ Great savings!', 'Meow! 💰', 'You\'re doing great!'],
  neutral: ['Meow~', '*stretches*', 'Hey there!'],
  tired: ['*yawns* spend less...', 'Zzz... budget...', 'So tired of bills...'],
  angry: ['HISS! Stop spending!', '>:( No more chai!', 'My wallet hurts!'],
};

const PixelCat: React.FC<PixelCatProps> = ({ mood = 'happy', skin = 'white', onSkinChange, showCustomizer = false }) => {
  const [isJumping, setIsJumping] = useState(false);
  const [showMeow, setShowMeow] = useState(false);
  const [meowText, setMeowText] = useState('');
  const [position, setPosition] = useState(0);
  const [facingRight, setFacingRight] = useState(true);

  useEffect(() => {
    const walkInterval = setInterval(() => {
      setPosition(prev => {
        const next = prev + (facingRight ? 2 : -2);
        if (next > 30) { setFacingRight(false); return 30; }
        if (next < -30) { setFacingRight(true); return -30; }
        return next;
      });
    }, 200);
    return () => clearInterval(walkInterval);
  }, [facingRight]);

  const handleClick = useCallback(() => {
    setIsJumping(true);
    const msgs = moodMessages[mood];
    setMeowText(msgs[Math.floor(Math.random() * msgs.length)]);
    setShowMeow(true);
    setTimeout(() => setIsJumping(false), 400);
    setTimeout(() => setShowMeow(false), 2000);
  }, [mood]);

  const colors = skinColors[skin];
  const face = moodFaces[mood];

  return (
    <div className="relative flex flex-col items-center">
      {/* Meow bubble */}
      {showMeow && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 pixel-border-sm bg-card px-3 py-1 text-sm font-retro z-10 whitespace-nowrap"
          style={{ animation: 'meow-pop 2s forwards' }}>
          {meowText}
        </div>
      )}

      {/* Cat */}
      <div
        className={`cursor-pointer select-none transition-transform ${isJumping ? 'animate-cat-bounce' : ''}`}
        onClick={handleClick}
        style={{ transform: `translateX(${position}px) scaleX(${facingRight ? 1 : -1})` }}
      >
        <svg width="64" height="64" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
          {/* Ears */}
          <rect x="2" y="1" width="3" height="3" fill={colors.ears} />
          <rect x="11" y="1" width="3" height="3" fill={colors.ears} />
          {/* Head */}
          <rect x="2" y="3" width="12" height="6" fill={colors.body} />
          {/* Body */}
          <rect x="3" y="9" width="10" height="5" fill={colors.body} />
          {/* Spots */}
          {colors.spots && (
            <>
              <rect x="4" y="4" width="2" height="2" fill={colors.spots} />
              <rect x="10" y="10" width="2" height="2" fill={colors.spots} />
            </>
          )}
          {/* Tail */}
          <rect x="13" y="10" width="2" height="1" fill={colors.body} />
          <rect x="14" y="9" width="1" height="2" fill={colors.body} />
          {/* Feet */}
          <rect x="3" y="14" width="3" height="1" fill={colors.ears} />
          <rect x="10" y="14" width="3" height="1" fill={colors.ears} />
        </svg>
        {/* Face overlay */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center pixel-font text-[6px] leading-none pointer-events-none"
          style={{ transform: `translateX(${position}px) scaleX(${facingRight ? 1 : -1})` }}>
        </div>
      </div>

      {/* Face text */}
      <div className="font-pixel text-[10px] -mt-6 text-foreground select-none">
        {face.eyes}
      </div>
      <div className="font-pixel text-[8px] -mt-1 text-primary select-none">
        {face.mouth}
      </div>

      {/* Skin customizer */}
      {showCustomizer && (
        <div className="flex gap-2 mt-3">
          {(Object.keys(skinColors) as CatSkin[]).map(s => (
            <button
              key={s}
              onClick={(e) => { e.stopPropagation(); onSkinChange?.(s); }}
              className={`w-6 h-6 pixel-border-sm transition-transform ${skin === s ? 'scale-110 ring-2 ring-primary' : 'hover:scale-105'}`}
              style={{ backgroundColor: skinColors[s].body }}
              title={s}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PixelCat;
