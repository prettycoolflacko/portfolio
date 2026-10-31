import { useState, useEffect } from 'react';

export default function DesktopRipple() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleDesktopClick = (e) => {
      // Only ripple if clicking directly on the desktop background (not on window, icons, or taskbar)
      const target = e.target;
      if (
        target.closest('.win7-window') ||
        target.closest('.win7-taskbar') ||
        target.closest('.win7-startmenu') ||
        target.closest('.win7-desktop-icon') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        return;
      }

      const id = Date.now() + Math.random();
      const x = e.clientX;
      const y = e.clientY;

      setRipples((prev) => [...prev.slice(-4), { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    window.addEventListener('click', handleDesktopClick, { passive: true });
    return () => window.removeEventListener('click', handleDesktopClick);
  }, []);

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
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: 16,
            height: 16,
            marginLeft: -8,
            marginTop: -8,
            borderRadius: '50%',
            border: '2px solid rgba(179, 229, 252, 0.85)',
            boxShadow: '0 0 12px rgba(79, 195, 247, 0.65), inset 0 0 6px rgba(255, 255, 255, 0.8)',
            animation: 'aero-ripple-expand 600ms ease-out forwards',
          }}
        />
      ))}
    </div>
  );
}
