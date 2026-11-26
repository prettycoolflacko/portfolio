import { useState, useEffect } from 'react';

/**
 * Atmospheric background for the Frutiger Aero Open World
 * Transitions smoothly from Sky Zenith -> Clouds -> Lagoon Aquamarine -> Meadow Emerald
 */
export default function AeroWorldBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReducedMotion(e.matches);
    mql.addEventListener('change', onChange);

    const handleMouseMove = (e) => {
      if (mql.matches) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      mql.removeEventListener('change', onChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="aero-world-bg" aria-hidden="true">
      <div
        className="aero-sunflare"
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
          transition: reducedMotion ? 'none' : 'transform var(--dur-short) var(--ease-out)',
        }}
      />
      <div className="aero-sky-rays" />
      <div
        className="aero-cloud-bank"
        style={{
          transform: `translate3d(${mousePos.x * -0.6}px, 0, 0)`,
        }}
      />
      <div className="aero-lagoon-glow" />
    </div>
  );
}
