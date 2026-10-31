import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import VistaIcon from '../VistaIcon';
import { routeMeta } from '../../data/navigation';

export default function Taskbar({
  isMinimized,
  isClosed,
  onToggleMinimize,
  onToggleStartMenu,
  showStartMenu,
  onPeekDesktop,
}) {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [cursorX, setCursorX] = useState(50);
  const taskBtnRef = useRef(null);

  const currentMeta = routeMeta[location.pathname] || {
    breadcrumbName: 'Portfolio',
  };

  // Clock in system tray
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position inside the taskbar button for authentic radial shine
  const handleTaskButtonMouseMove = (e) => {
    if (!taskBtnRef.current) return;
    const rect = taskBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setCursorX(x);
  };

  return (
    <nav className="win7-taskbar" role="navigation" aria-label="Windows Taskbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Windows 7 Start Orb */}
        <button
          className={`win7-start-orb${showStartMenu ? ' active' : ''}`}
          title="Start"
          aria-label="Start menu"
          onClick={onToggleStartMenu}
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3.4 7.6Q7.4 5.7 11.4 6.2L11.4 11.9Q7.4 11.4 3.4 13.3Z" fill="#f25022" />
            <path d="M12.6 6.3Q16.6 6.8 20.6 5.9L20.6 11.6Q16.6 12.5 12.6 12Z" fill="#7fba00" />
            <path d="M3.4 14.5Q7.4 12.6 11.4 13.1L11.4 18.8Q7.4 18.3 3.4 20.2Z" fill="#00a4ef" />
            <path d="M12.6 13.2Q16.6 13.7 20.6 12.8L20.6 18.5Q16.6 19.4 12.6 18.9Z" fill="#ffb900" />
          </svg>
        </button>

        {/* Active Window Superbar Tab */}
        {!isClosed && (
          <button
            key={location.pathname}
            ref={taskBtnRef}
            onMouseMove={handleTaskButtonMouseMove}
            onClick={onToggleMinimize}
            className={`win7-task-tab${!isMinimized ? ' active' : ''} flash-pulse`}
            title={`Elyuzar Fazlurrahman - ${currentMeta.breadcrumbName}`}
            aria-label={`Window: ${currentMeta.breadcrumbName}`}
            type="button"
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: !isMinimized
                ? `radial-gradient(circle at ${cursorX}px 50%, rgba(144, 202, 249, 0.6) 0%, rgba(33, 150, 243, 0.45) 45%, rgba(13, 71, 161, 0.55) 100%)`
                : undefined,
            }}
          >
            <VistaIcon id="computer" size={17} />
            <span className="hidden sm:inline" style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentMeta.breadcrumbName} - Elyuzar
            </span>
          </button>
        )}
      </div>

      {/* System Tray (Notification Area) */}
      <div className="win7-systray">
        <button
          type="button"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
          title="No new notifications (Action Center)"
          aria-label="Action Center"
        >
          <VistaIcon id="flag" size={15} />
        </button>

        <button
          type="button"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
          title="Internet Access: Connected to Local Intranet"
          aria-label="Internet status"
        >
          <VistaIcon id="wifi" size={15} />
        </button>

        <button
          type="button"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
          title="Speakers: 100%"
          aria-label="Audio Volume"
        >
          <VistaIcon id="volume" size={15} />
        </button>

        {/* Clock & Date */}
        <div
          className="win7-systray-clock"
          title={new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        >
          <span>{currentTime}</span>
          <span style={{ fontSize: '10px', opacity: 0.9 }}>{currentDate}</span>
        </div>

        {/* Peek Desktop Vertical Strip */}
        <div
          className="win7-peek-desktop"
          title="Show Desktop"
          aria-label="Show Desktop"
          role="button"
          tabIndex={0}
          onClick={onPeekDesktop}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onPeekDesktop();
          }}
        />
      </div>
    </nav>
  );
}
