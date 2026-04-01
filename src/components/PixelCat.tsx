import React, { useState, useEffect, useCallback, useRef } from 'react';

type CatMood = 'happy' | 'neutral' | 'tired' | 'angry';
type CatSkin = 'white' | 'calico' | 'orange' | 'gray' | 'brown' | 'black';

interface PixelCatProps {
  mood?: CatMood;
  skin?: CatSkin;
  onSkinChange?: (skin: CatSkin) => void;
  showCustomizer?: boolean;
  freeRoam?: boolean;
}

const skinColors: Record<CatSkin, { body: string; spots?: string; ears: string; belly: string }> = {
  white: { body: '#F5F5F5', ears: '#FFD1DC', belly: '#FFF5F7' },
  calico: { body: '#F5F5F5', spots: '#FF8C42', ears: '#FF8C42', belly: '#FFF0E5' },
  orange: { body: '#FF8C42', ears: '#E07030', belly: '#FFB078' },
  gray: { body: '#A0A0A0', ears: '#808080', belly: '#C0C0C0' },
  brown: { body: '#8B6914', ears: '#6B4E10', belly: '#A88030' },
  black: { body: '#3A3A3A', ears: '#2A2A2A', belly: '#555555' },
};

const moodFaces: Record<CatMood, { eyes: string; mouth: string }> = {
  happy: { eyes: '◠ ◠', mouth: 'ω' },
  neutral: { eyes: '• •', mouth: '▽' },
  tired: { eyes: '− −', mouth: '~' },
  angry: { eyes: '> <', mouth: 'Д' },
};

const moodMessages: Record<CatMood, string[]> = {
  happy: ['Purr~ Great savings!', 'Meow! 💰', 'You\'re doing great!', 'Nya~ Keep it up! ✨'],
  neutral: ['Meow~', '*stretches*', 'Hey there!', '*purrs softly*'],
  tired: ['*yawns* spend less...', 'Zzz... budget...', 'So tired of bills...', '*sleepy meow*'],
  angry: ['HISS! Stop spending!', '>:( No more chai!', 'My wallet hurts!', 'MEOW! Budget NOW!'],
};

const PixelCat: React.FC<PixelCatProps> = ({ mood = 'happy', skin = 'white', onSkinChange, showCustomizer = false, freeRoam = false }) => {
  const [isJumping, setIsJumping] = useState(false);
  const [showMeow, setShowMeow] = useState(false);
  const [meowText, setMeowText] = useState('');
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [facingRight, setFacingRight] = useState(true);
  const [isIdle, setIsIdle] = useState(false);
  const [blinkFrame, setBlinkFrame] = useState(false);
  const [tailWag, setTailWag] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Random target position for free roaming
  useEffect(() => {
    if (!freeRoam) {
      // Simple back-and-forth for in-card mode
      const walkInterval = setInterval(() => {
        setPos(prev => {
          const next = { ...prev, x: prev.x + (facingRight ? 1.5 : -1.5) };
          if (next.x > 25) { setFacingRight(false); return { ...prev, x: 25 }; }
          if (next.x < -25) { setFacingRight(true); return { ...prev, x: -25 }; }
          return next;
        });
      }, 120);
      return () => clearInterval(walkInterval);
    }

    const pickTarget = () => {
      const bounds = containerRef.current?.parentElement?.getBoundingClientRect();
      const maxX = bounds ? bounds.width - 80 : 200;
      const maxY = bounds ? bounds.height - 80 : 300;
      setTargetPos({
        x: Math.random() * maxX - maxX / 2,
        y: Math.random() * maxY * 0.6 - maxY * 0.3,
      });
      setIsIdle(false);
    };

    pickTarget();
    const targetInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        pickTarget();
      } else {
        setIsIdle(true);
      }
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(targetInterval);
  }, [freeRoam, facingRight]);

  // Smooth movement toward target (free roam)
  useEffect(() => {
    if (!freeRoam || isIdle) return;
    const moveInterval = setInterval(() => {
      setPos(prev => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3) { setIsIdle(true); return prev; }
        const speed = 2.5;
        setFacingRight(dx > 0);
        return {
          x: prev.x + (dx / dist) * speed,
          y: prev.y + (dy / dist) * speed,
        };
      });
    }, 50);
    return () => clearInterval(moveInterval);
  }, [freeRoam, targetPos, isIdle]);

  // Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkFrame(true);
      setTimeout(() => setBlinkFrame(false), 200);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Tail wag
  useEffect(() => {
    const wagInterval = setInterval(() => {
      setTailWag(w => (w + 1) % 3);
    }, 400);
    return () => clearInterval(wagInterval);
  }, []);

  const handleClick = useCallback(() => {
    setIsJumping(true);
    const msgs = moodMessages[mood];
    setMeowText(msgs[Math.floor(Math.random() * msgs.length)]);
    setShowMeow(true);
    setTimeout(() => setIsJumping(false), 500);
    setTimeout(() => setShowMeow(false), 2500);
  }, [mood]);

  const colors = skinColors[skin];
  const face = moodFaces[mood];
  const tailOffsets = [0, -2, 1];

  return (
    <div className="relative flex flex-col items-center" ref={containerRef}>
      {/* Meow bubble */}
      {showMeow && (
        <div
          className="absolute -top-14 left-1/2 z-20 whitespace-nowrap pointer-events-none"
          style={{
            transform: `translateX(calc(-50% + ${pos.x}px))`,
            animation: 'meow-pop 2.5s forwards',
          }}
        >
          <div className="pixel-border-sm bg-card px-3 py-1.5 font-retro text-base text-foreground relative">
            {meowText}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card pixel-border-sm rotate-45 border-t-0 border-l-0" />
          </div>
        </div>
      )}

      {/* Cat body */}
      <div
        className={`cursor-pointer select-none transition-all duration-100 ${isJumping ? '' : ''}`}
        onClick={handleClick}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scaleX(${facingRight ? 1 : -1}) ${isJumping ? 'translateY(-16px)' : ''}`,
          transition: isJumping ? 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.1s ease',
          filter: isJumping ? 'drop-shadow(0 8px 4px rgba(0,0,0,0.15))' : 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
        }}
      >
        <svg width="72" height="72" viewBox="0 0 18 18" style={{ imageRendering: 'pixelated' }}>
          {/* Shadow */}
          <ellipse cx="9" cy="17" rx="5" ry="1" fill="rgba(0,0,0,0.1)" />
          {/* Ears */}
          <rect x="2" y="0" width="3" height="4" fill={colors.ears} />
          <rect x="13" y="0" width="3" height="4" fill={colors.ears} />
          {/* Inner ears */}
          <rect x="3" y="1" width="1" height="2" fill={colors.belly} />
          <rect x="14" y="1" width="1" height="2" fill={colors.belly} />
          {/* Head */}
          <rect x="2" y="3" width="14" height="6" fill={colors.body} />
          {/* Belly */}
          <rect x="5" y="9" width="8" height="4" fill={colors.belly} />
          {/* Body */}
          <rect x="3" y="9" width="12" height="5" fill={colors.body} opacity="0.85" />
          <rect x="5" y="10" width="8" height="3" fill={colors.belly} opacity="0.6" />
          {/* Spots */}
          {colors.spots && (
            <>
              <rect x="4" y="4" width="2" height="2" fill={colors.spots} />
              <rect x="12" y="4" width="2" height="1" fill={colors.spots} />
              <rect x="10" y="10" width="3" height="2" fill={colors.spots} />
              <rect x="4" y="11" width="2" height="2" fill={colors.spots} />
            </>
          )}
          {/* Tail */}
          <rect x="15" y={9 + tailOffsets[tailWag]} width="2" height="1" fill={colors.body} />
          <rect x="16" y={8 + tailOffsets[tailWag]} width="1" height="2" fill={colors.body} />
          <rect x="17" y={7 + tailOffsets[tailWag]} width="1" height="2" fill={colors.ears} />
          {/* Feet */}
          <rect x="3" y="14" width="3" height="2" fill={colors.ears} />
          <rect x="12" y="14" width="3" height="2" fill={colors.ears} />
          {/* Whiskers */}
          <rect x="0" y="6" width="3" height="1" fill={colors.ears} opacity="0.5" />
          <rect x="15" y="6" width="3" height="1" fill={colors.ears} opacity="0.5" />
          <rect x="0" y="8" width="2" height="1" fill={colors.ears} opacity="0.3" />
          <rect x="16" y="8" width="2" height="1" fill={colors.ears} opacity="0.3" />
          {/* Eyes */}
          {blinkFrame ? (
            <>
              <rect x="5" y="6" width="2" height="1" fill="#333" />
              <rect x="11" y="6" width="2" height="1" fill="#333" />
            </>
          ) : (
            <>
              <rect x="5" y="5" width="2" height="2" fill="#333" />
              <rect x="11" y="5" width="2" height="2" fill="#333" />
              {/* Eye shine */}
              <rect x="6" y="5" width="1" height="1" fill="#FFF" />
              <rect x="12" y="5" width="1" height="1" fill="#FFF" />
            </>
          )}
          {/* Nose */}
          <rect x="8" y="7" width="2" height="1" fill={colors.ears} />
          {/* Mouth */}
          <rect x="7" y="8" width="1" height="1" fill={colors.ears} opacity="0.6" />
          <rect x="10" y="8" width="1" height="1" fill={colors.ears} opacity="0.6" />
        </svg>

        {/* Idle animation indicator */}
        {isIdle && !isJumping && (
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 font-pixel text-[6px] text-muted-foreground animate-float">
            {mood === 'tired' ? '💤' : mood === 'happy' ? '♪' : '...'}
          </div>
        )}
      </div>

      {/* Face text below cat */}
      <div className="font-pixel text-[10px] -mt-3 text-foreground select-none pointer-events-none" style={{ transform: `translateX(${pos.x}px)` }}>
        {blinkFrame ? '− −' : face.eyes}
      </div>
      <div className="font-pixel text-[8px] -mt-0.5 text-primary select-none pointer-events-none" style={{ transform: `translateX(${pos.x}px)` }}>
        {face.mouth}
      </div>

      {/* Skin customizer */}
      {showCustomizer && (
        <div className="flex gap-2 mt-4">
          {(Object.keys(skinColors) as CatSkin[]).map(s => (
            <button
              key={s}
              onClick={(e) => { e.stopPropagation(); onSkinChange?.(s); }}
              className={`w-7 h-7 pixel-border-sm transition-all active:scale-90 ${skin === s ? 'scale-110 ring-2 ring-primary shadow-lg' : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
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
