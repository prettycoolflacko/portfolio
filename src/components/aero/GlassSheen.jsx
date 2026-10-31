import { useLocation } from 'react-router-dom';

/**
 * Sweeps a diagonal specular glass sheen highlight across the Win7 window
 * upon initial mount and after every page navigation.
 */
export default function GlassSheen() {
  const location = useLocation();

  return (
    <div
      key={location.key || location.pathname}
      className="aero-glass-sheen-sweep"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 25,
        borderRadius: 'inherit',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-60%',
          width: '60%',
          height: '200%',
          background: 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.16) 45%, rgba(255, 255, 255, 0.28) 50%, rgba(255, 255, 255, 0.12) 55%, transparent 75%)',
          transform: 'rotate(25deg)',
          animation: 'aero-sheen-sweep 900ms cubic-bezier(0.25, 1, 0.5, 1) forwards',
        }}
      />
    </div>
  );
}
