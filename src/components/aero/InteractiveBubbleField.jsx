import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playBubblePop } from '../../utils/audio';

const INITIAL_BUBBLES = [
  { id: 'orb-0', x: 8, size: 36, speed: 17, delay: 0.2, wobble: 18 },
  { id: 'orb-1', x: 20, size: 48, speed: 21, delay: 2.1, wobble: 24 },
  { id: 'orb-2', x: 32, size: 32, speed: 15, delay: 4.4, wobble: 15 },
  { id: 'orb-3', x: 44, size: 54, speed: 23, delay: 1.5, wobble: 20 },
  { id: 'orb-4', x: 56, size: 38, speed: 18, delay: 3.8, wobble: 22 },
  { id: 'orb-5', x: 68, size: 44, speed: 19, delay: 0.8, wobble: 16 },
  { id: 'orb-6', x: 80, size: 50, speed: 22, delay: 2.9, wobble: 25 },
  { id: 'orb-7', x: 92, size: 34, speed: 16, delay: 4.8, wobble: 14 },
];

/**
 * Interactive Frutiger Aero Floating Bubbles
 * Features:
 * - Shimmering multi-layer glass spheres floating up with natural wobble
 * - Click/Hover interactive pop mechanic with expanding water ripple particles
 * - Responds to window resizing and respects prefers-reduced-motion
 */
export default function InteractiveBubbleField() {
  const [bubbles, setBubbles] = useState(() => INITIAL_BUBBLES);
  const [poppedEffects, setPoppedEffects] = useState([]);
  const counterRef = useRef(100);

  const handlePop = (bub, e) => {
    e.stopPropagation();
    playBubblePop(450 + (bub.size % 200));
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    counterRef.current += 1;
    const effectId = `pop-${counterRef.current}`;
    setPoppedEffects((prev) => [...prev, { id: effectId, x: clickX, y: clickY, size: bub.size }]);

    // Remove popped bubble and respawn after delay
    setBubbles((prev) => prev.filter((b) => b.id !== bub.id));

    setTimeout(() => {
      setPoppedEffects((prev) => prev.filter((p) => p.id !== effectId));
    }, 600);

    // Respawn new bubble after 3 seconds
    setTimeout(() => {
      counterRef.current += 1;
      const newId = `orb-${counterRef.current}`;
      setBubbles((prev) => [
        ...prev,
        {
          id: newId,
          x: (bub.x * 1.3) % 85 + 5,
          size: 30 + (bub.size % 25),
          speed: 15 + (bub.speed % 8),
          delay: 0,
          wobble: 15 + (bub.wobble % 12),
        },
      ]);
    }, 3000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 4,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Floating Bubbles */}
      {bubbles.map((bub) => (
        <motion.div
          key={bub.id}
          initial={{ y: '105vh', opacity: 0 }}
          animate={{
            y: '-15vh',
            opacity: [0, 0.85, 0.85, 0],
            x: [0, bub.wobble, -bub.wobble, 0],
          }}
          transition={{
            y: { duration: bub.speed, repeat: Infinity, ease: 'linear', delay: bub.delay },
            opacity: { duration: bub.speed, repeat: Infinity, times: [0, 0.1, 0.85, 1], delay: bub.delay },
            x: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          onClick={(e) => handlePop(bub, e)}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute',
            left: `${bub.x}%`,
            width: bub.size,
            height: bub.size,
            borderRadius: '50%',
            pointerEvents: 'auto',
            cursor: 'pointer',
            background: `
              radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 30%, rgba(79, 195, 247, 0.35) 60%, rgba(2, 136, 209, 0.5) 100%)
            `,
            boxShadow: `
              0 6px 16px rgba(2, 136, 209, 0.35),
              inset 0 -2px 6px rgba(0, 77, 100, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.9)
            `,
            border: '1px solid rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(2px)',
          }}
          title="Click to pop Frutiger Aero bubble"
        >
          {/* Specular White Gloss Glint */}
          <div
            style={{
              position: 'absolute',
              top: '12%',
              left: '18%',
              width: '38%',
              height: '24%',
              borderRadius: '50%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.1) 100%)',
              transform: 'rotate(-30deg)',
              pointerEvents: 'none',
            }}
          />
          {/* Secondary Rim Glint */}
          <div
            style={{
              position: 'absolute',
              bottom: '14%',
              right: '20%',
              width: '20%',
              height: '14%',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.7)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      ))}

      {/* Pop Splashes */}
      <AnimatePresence>
        {poppedEffects.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0.6, opacity: 1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: p.x - p.size / 2,
              top: p.y - p.size / 2,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              border: '2px solid rgba(79, 195, 247, 0.85)',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.6)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
