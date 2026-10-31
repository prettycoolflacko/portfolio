import { useState, useEffect, useRef, memo } from 'react';
import AeroSprite from '../AeroSprite';

// Bubble definition generator
const generateBubbles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `bub-${i}`,
    size: 14 + ((i * 19) % 42),
    left: `${(i * 9.2 + 4) % 94}%`,
    duration: 18 + (i % 5) * 5,
    delay: (i * 2.3) % 15,
    wobbleDuration: 3 + (i % 3) * 1.5,
    opacity: 0.45 + ((i % 4) * 0.12),
  }));
};

// Tropical fish definitions
const FISH_DATA = [
  { id: 'fish-1', top: '22%', speed: 28, delay: 0, depth: 0.85, size: 48, direction: 'ltr' },
  { id: 'fish-2', top: '65%', speed: 38, delay: 8, depth: 0.65, size: 36, direction: 'rtl' },
  { id: 'fish-3', top: '44%', speed: 32, delay: 16, depth: 0.95, size: 52, direction: 'ltr' },
];

// Drifting leaves & butterflies
const FLORA_DATA = [
  { id: 'leaf-1', type: 'leaf', startX: '8%', startY: '12%', duration: 22, delay: 1, size: 38 },
  { id: 'leaf-2', type: 'leaf', startX: '78%', startY: '8%', duration: 26, delay: 7, size: 32 },
  { id: 'leaf-3', type: 'leaf', startX: '45%', startY: '18%', duration: 29, delay: 12, size: 34 },
  { id: 'leaf-4', type: 'leaf', startX: '88%', startY: '42%', duration: 24, delay: 4, size: 30 },
  { id: 'bf-1', type: 'butterfly', startX: '20%', startY: '40%', duration: 19, delay: 3, size: 42 },
  { id: 'bf-2', type: 'butterfly', startX: '68%', startY: '60%', duration: 23, delay: 9, size: 38 },
];

function AeroAtmosphere({ isMaximized = false }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 640 : false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);
  const [ripples, setRipples] = useState([]);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Responsive and visibility detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onMotionChange = (e) => setReducedMotion(e.matches);
    mql.addEventListener('change', onMotionChange);
    window.addEventListener('resize', checkMobile);

    const handleVisibility = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mql.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Parallax tracking with RAF smoothing
  useEffect(() => {
    if (reducedMotion) return;

    let rafId;
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / innerHeight - 0.5) * 2;
      mouseOffset.current = {
        x: Math.round(xPercent * 8),
        y: Math.round(yPercent * 8),
      };
    };

    const updateParallax = () => {
      setParallax((prev) => {
        const dx = (mouseOffset.current.x - prev.x) * 0.08;
        const dy = (mouseOffset.current.y - prev.y) * 0.08;
        if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) return prev;
        return { x: prev.x + dx, y: prev.y + dy };
      });
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  // Occasional water drop & expanding ripple (every 8-12 seconds)
  useEffect(() => {
    if (reducedMotion || isTabHidden) return;

    const spawnRipple = () => {
      const id = Date.now();
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 70 + 15;
      setRipples((prev) => [...prev.slice(-3), { id, x, y }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    };

    const interval = setInterval(spawnRipple, 9500);
    return () => clearInterval(interval);
  }, [reducedMotion, isTabHidden]);

  // Sprite count capping
  const bubbleCount = isMobile ? 5 : isMaximized ? 6 : 12;
  const bubbles = generateBubbles(bubbleCount);
  const floraList = isMobile ? FLORA_DATA.slice(0, 2) : isMaximized ? FLORA_DATA.slice(0, 3) : FLORA_DATA;
  const fishList = isMobile ? FISH_DATA.slice(0, 1) : FISH_DATA;

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      className="aero-atmosphere-root"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: isMaximized ? 0.35 : 1,
        transition: 'opacity 0.4s ease',
        transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* ── Aurora & Light Rays Drift Layer ── */}
      <div
        className="aero-aurora-ray aero-aurora-ray-1"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-20%',
          width: '140%',
          height: '80%',
          background: 'radial-gradient(ellipse at 40% 50%, rgba(79, 195, 247, 0.12) 0%, rgba(38, 198, 218, 0.06) 45%, transparent 70%)',
          filter: 'blur(45px)',
          animation: isTabHidden ? 'none' : 'aero-aurora-drift-1 70s linear infinite alternate',
          transform: 'rotate(-8deg)',
        }}
      />
      <div
        className="aero-aurora-ray aero-aurora-ray-2"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-15%',
          width: '120%',
          height: '70%',
          background: 'radial-gradient(ellipse at 60% 50%, rgba(102, 187, 106, 0.08) 0%, rgba(38, 198, 218, 0.05) 50%, transparent 75%)',
          filter: 'blur(55px)',
          animation: isTabHidden ? 'none' : 'aero-aurora-drift-2 85s linear infinite alternate',
          transform: 'rotate(5deg)',
        }}
      />

      {/* ── Rising Frutiger Aero Bubbles ── */}
      {bubbles.map((bub) => (
        <div
          key={bub.id}
          className="aero-bubble-carrier"
          style={{
            position: 'absolute',
            bottom: '-70px',
            left: bub.left,
            animation: isTabHidden ? 'none' : `aero-rise ${bub.duration}s linear ${bub.delay}s infinite`,
            opacity: bub.opacity,
          }}
        >
          <div
            className="aero-bubble-wobble"
            style={{
              animation: isTabHidden ? 'none' : `aero-wobble ${bub.wobbleDuration}s ease-in-out infinite alternate`,
            }}
          >
            <svg
              width={bub.size}
              height={bub.size}
              viewBox="0 0 40 40"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 30, 60, 0.35))' }}
            >
              <defs>
                <radialGradient id={`bub-rad-${bub.id}`} cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#80deea" stopOpacity="0.35" />
                  <stop offset="85%" stopColor="#0288d1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#01579b" stopOpacity="0.65" />
                </radialGradient>
              </defs>
              <circle
                cx="20"
                cy="20"
                r="18"
                fill={`url(#bub-rad-${bub.id})`}
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.2"
              />
              {/* Specular highlight */}
              <ellipse
                cx="14"
                cy="12"
                rx="4.5"
                ry="3"
                fill="rgba(255, 255, 255, 0.9)"
                transform="rotate(-25 14 12)"
              />
              <circle cx="26" cy="27" r="1.5" fill="rgba(255, 255, 255, 0.6)" />
            </svg>
          </div>
        </div>
      ))}

      {/* ── Swimming Tropical Fish ── */}
      {fishList.map((fish) => (
        <div
          key={fish.id}
          className="aero-fish-lane"
          style={{
            position: 'absolute',
            top: fish.top,
            width: '100%',
            height: fish.size,
            animation: isTabHidden
              ? 'none'
              : fish.direction === 'ltr'
              ? `aero-swim-ltr ${fish.speed}s linear ${fish.delay}s infinite`
              : `aero-swim-rtl ${fish.speed}s linear ${fish.delay}s infinite`,
            opacity: fish.depth,
          }}
        >
          <div
            className="aero-fish-tail"
            style={{
              animation: isTabHidden ? 'none' : 'aero-tail-wiggle 1.2s ease-in-out infinite alternate',
              transformOrigin: '75% 50%',
            }}
          >
            <AeroSprite id="fish" size={fish.size} />
          </div>
        </div>
      ))}

      {/* ── Drifting Leaves & Butterflies ── */}
      {floraList.map((item) => (
        <div
          key={item.id}
          className="aero-flora-carrier"
          style={{
            position: 'absolute',
            left: item.startX,
            top: item.startY,
            animation: isTabHidden
              ? 'none'
              : `aero-flora-drift ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
          }}
        >
          <div
            style={{
              animation: isTabHidden
                ? 'none'
                : item.type === 'butterfly'
                ? 'aero-butterfly-flutter 1.4s ease-in-out infinite alternate'
                : 'aero-leaf-tumble 6s ease-in-out infinite alternate',
            }}
          >
            <AeroSprite id={item.type} size={item.size} />
          </div>
        </div>
      ))}

      {/* ── Occasional Water Drop Expanding Ripples ── */}
      {ripples.map((rip) => (
        <div
          key={rip.id}
          className="aero-water-ripple"
          style={{
            position: 'absolute',
            left: `${rip.x}%`,
            top: `${rip.y}%`,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
            borderRadius: '50%',
            border: '2px solid rgba(129, 212, 250, 0.85)',
            boxShadow: '0 0 10px rgba(79, 195, 247, 0.6), inset 0 0 6px rgba(255, 255, 255, 0.7)',
            animation: 'aero-ripple-expand 650ms ease-out forwards',
          }}
        />
      ))}
    </div>
  );
}

export default memo(AeroAtmosphere);
