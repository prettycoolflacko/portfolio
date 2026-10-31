import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VistaIcon from '../VistaIcon';
import AddressBar from './AddressBar';
import NavPane from './NavPane';
import GlassSheen from '../aero/GlassSheen';
import { routeMeta } from '../../data/navigation';

export default function WindowFrame({
  isMaximized,
  isMinimized,
  onToggleMaximize,
  onToggleMinimize,
  onRequestClose,
  children,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const contentBodyRef = useRef(null);
  const [isNavPaneCollapsed, setIsNavPaneCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [titleCursorX, setTitleCursorX] = useState(50);
  const titleBarRef = useRef(null);

  const currentMeta = routeMeta[location.pathname] || {
    title: 'Windows Explorer',
    windowTitle: 'Windows Explorer',
    breadcrumbName: 'Explorer',
    explorerPath: `C:\\Users\\Elyuzar${location.pathname.replace('/', '\\')}`,
  };

  // Reset viewport scroll to top on every route change
  useEffect(() => {
    if (contentBodyRef.current) {
      contentBodyRef.current.scrollTop = 0;
    }
    // Update document title per route
    document.title = `${currentMeta.title || 'Portfolio'} - Elyuzar Fazlurrahman`;
  }, [location.pathname, currentMeta.title]);

  // Handle Alt key menu accelerators
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          setActiveMenu((prev) => (prev === 'file' ? null : 'file'));
        } else if (e.key === 'v' || e.key === 'V') {
          e.preventDefault();
          setActiveMenu((prev) => (prev === 'view' ? null : 'view'));
        } else if (e.key === 't' || e.key === 'T') {
          e.preventDefault();
          setActiveMenu((prev) => (prev === 'tools' ? null : 'tools'));
        } else if (e.key === 'h' || e.key === 'H') {
          e.preventDefault();
          setActiveMenu((prev) => (prev === 'help' ? null : 'help'));
        }
      } else if (e.key === 'Escape') {
        setActiveMenu(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Title bar cursor tracking for subtle authentic glass shine
  const handleTitleMouseMove = (e) => {
    if (!titleBarRef.current) return;
    const rect = titleBarRef.current.getBoundingClientRect();
    setTitleCursorX(e.clientX - rect.left);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Experience', path: '/experience' },
    { label: 'Education', path: '/education' },
    { label: 'Certifications', path: '/certifications' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 35 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="win7-window"
          style={{
            position: 'relative',
            zIndex: 20,
            width: isMaximized ? '100vw' : 'min(1180px, 96vw)',
            height: isMaximized ? 'calc(100vh - 42px)' : 'min(860px, calc(100vh - 75px))',
            margin: isMaximized ? '0' : '14px auto',
            borderRadius: isMaximized ? '0' : '6px 6px 3px 3px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.22s ease, height 0.22s ease, margin 0.22s ease, border-radius 0.22s ease',
          }}
        >
          {/* Glass specular sheen sweep on route changes */}
          <GlassSheen />

          {/* ── Windows 7 Aero Title Bar ── */}
          <div
            ref={titleBarRef}
            onMouseMove={handleTitleMouseMove}
            className="win7-titlebar"
            style={{
              background: `radial-gradient(circle at ${titleCursorX}px 40%, rgba(255, 255, 255, 0.35) 0%, transparent 65%)`,
            }}
          >
            <div className="win7-title-content">
              <VistaIcon id="computer" size={18} title="Window" />
              <span style={{ maxWidth: '65vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentMeta.windowTitle} - Elyuzar Fazlurrahman
              </span>
            </div>

            {/* Window Controls */}
            <div className="win7-controls">
              <button
                onClick={onToggleMinimize}
                className="win7-btn-ctrl"
                title="Minimize"
                aria-label="Minimize Window"
                type="button"
              >
                ─
              </button>
              <button
                onClick={onToggleMaximize}
                className="win7-btn-ctrl"
                title={isMaximized ? 'Restore Down' : 'Maximize'}
                aria-label={isMaximized ? 'Restore Down' : 'Maximize Window'}
                type="button"
              >
                {isMaximized ? '❐' : '□'}
              </button>
              <button
                onClick={onRequestClose}
                className="win7-btn-ctrl win7-btn-close"
                title="Close"
                aria-label="Close Window"
                type="button"
              >
                ✕
              </button>
            </div>
          </div>

          {/* ── Menu Bar (File, Edit, Navigation, Alt Accelerators) ── */}
          <div className="win7-menubar" role="menubar">
            {/* Alt+F File dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className={`win7-menu-item${activeMenu === 'file' ? ' active' : ''}`}
                onClick={() => setActiveMenu((prev) => (prev === 'file' ? null : 'file'))}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                <span style={{ textDecoration: 'underline' }}>F</span>ile
              </button>
              {activeMenu === 'file' && (
                <div
                  className="win7-context-menu"
                  style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, width: 170 }}
                >
                  <div
                    className="win7-context-item"
                    onClick={() => {
                      setActiveMenu(null);
                      navigate('/');
                    }}
                    style={{ padding: '4px 10px', cursor: 'pointer' }}
                  >
                    Open Home
                  </div>
                  <div
                    className="win7-context-item"
                    onClick={() => {
                      setActiveMenu(null);
                      window.location.reload();
                    }}
                    style={{ padding: '4px 10px', cursor: 'pointer' }}
                  >
                    Refresh (F5)
                  </div>
                  <div style={{ height: 1, background: '#e0e0e0', margin: '2px 0' }} />
                  <div
                    className="win7-context-item"
                    onClick={() => {
                      setActiveMenu(null);
                      onRequestClose();
                    }}
                    style={{ padding: '4px 10px', cursor: 'pointer', color: '#c62828' }}
                  >
                    Close Window
                  </div>
                </div>
              )}
            </div>

            {/* Standard Navigation tabs */}
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`win7-menu-item${isActive ? ' active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Quick CV Download button on the right */}
            <a
              href="./assets/Elyuzar_CV.pdf"
              download
              className="win7-menu-item"
              style={{
                marginLeft: 'auto',
                textDecoration: 'none',
                color: '#0288d1',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
              title="Download Elyuzar_CV.pdf"
            >
              <VistaIcon id="document" size={14} />
              Download CV
            </a>
          </div>

          {/* ── Explorer Toolbar & Address Bar ── */}
          <AddressBar />

          {/* ── Explorer Command Bar ── */}
          <div
            className="win7-commandbar"
            style={{
              background: 'linear-gradient(180deg, #fbfcfe 0%, #edf2f7 100%)',
              borderBottom: '1px solid #c2d7eb',
              padding: '3px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '11.5px',
              color: '#1a4e70',
              userSelect: 'none',
            }}
          >
            <button
              type="button"
              className="aero-btn"
              style={{ padding: '2px 8px', fontSize: '11px' }}
              onClick={() => setIsNavPaneCollapsed(!isNavPaneCollapsed)}
            >
              Organize ▾
            </button>
            <button
              type="button"
              className="aero-btn"
              style={{ padding: '2px 8px', fontSize: '11px' }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Elyuzar's Portfolio", url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              Share with ▾
            </button>
            <span style={{ height: 16, width: 1, background: '#c2d7eb', margin: '0 2px' }} />
            <span style={{ color: '#4a7190', fontSize: '11px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <VistaIcon id="info" size={13} />
              {currentMeta.explorerPath}
            </span>
          </div>

          {/* ── Explorer Workspace Split (Nav Pane + Content Viewport) ── */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              minHeight: 0,
              overflow: 'hidden',
              background: 'var(--content-bg)',
            }}
          >
            {/* Left Explorer Navigation Pane */}
            <NavPane
              isCollapsed={isNavPaneCollapsed}
              onToggleCollapse={() => setIsNavPaneCollapsed(!isNavPaneCollapsed)}
            />

            {/* Main Content Viewport */}
            <main
              ref={contentBodyRef}
              className="win7-content-body"
              role="region"
              aria-label="Explorer Content"
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: '16px 20px',
                background: '#ffffff',
                border: 'none',
                maxHeight: 'none',
              }}
            >
              {children}
            </main>
          </div>

          {/* ── Explorer Details Pane (Bottom bar above statusbar) ── */}
          <div
            className="win7-detailspane"
            style={{
              background: 'linear-gradient(180deg, #f4f8fc 0%, #e5effa 100%)',
              borderTop: '1px solid #c0d3e5',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: '#315273',
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <VistaIcon id="computer" size={20} />
              <div>
                <span style={{ fontWeight: 700, color: '#0d3a5c' }}>
                  {currentMeta.breadcrumbName}
                </span>
                <span style={{ marginLeft: 6, color: '#4a7190' }}>
                  Windows 7 Aero Workspace
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4a7190' }}>
              <span>Location: Local Disk (C:)</span>
              <span>·</span>
              <span>State: Ready</span>
            </div>
          </div>

          {/* ── Status Bar ── */}
          <footer className="win7-statusbar" style={{ padding: '3px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>● Local Intranet | 100%</span>
              <span>·</span>
              <span>Elyuzar Fazlurrahman</span>
            </div>
            <div>
              <span>© {new Date().getFullYear()} UPN Veteran Yogyakarta</span>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
