import { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Shell & Aero imports
import WindowFrame from './components/shell/WindowFrame';
import Taskbar from './components/shell/Taskbar';
import StartMenu from './components/shell/StartMenu';
import CloseDialog from './components/shell/CloseDialog';
import ContextMenu from './components/shell/ContextMenu';
import AeroAtmosphere from './components/aero/AeroAtmosphere';
import DesktopRipple from './components/aero/DesktopRipple';
import InteractiveBubbleField from './components/aero/InteractiveBubbleField';
import AeroGadgetSidebar from './components/aero/AeroGadgetSidebar';
import VistaIcon from './components/VistaIcon';

// Lazy-loaded pages (Part 1 Architecture)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Experience = lazy(() => import('./pages/Experience'));
const Education = lazy(() => import('./pages/Education'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Authentic Windows 7 route loading indicator
function RouteSuspenseFallback() {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        minHeight: 240,
      }}
    >
      <VistaIcon id="refresh" size={32} />
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e395b' }}>
        Loading Windows Explorer View...
      </div>
      <div
        style={{
          width: 220,
          height: 12,
          background: '#e0e0e0',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #9bb7d4',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(180deg, #b9f6ca 0%, #00e676 50%, #00c853 100%)',
            animation: 'win7-progress-glow 1.2s linear infinite',
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Desktop OS Shell States
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  // Global right-click handler for Windows 7 context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopIconClick = (path) => {
    if (isMinimized) setIsMinimized(false);
    if (isClosed) setIsClosed(false);
    setShowStartMenu(false);
    navigate(path);
  };

  return (
    <div
      className="win7-desktop"
      onContextMenu={handleContextMenu}
      onClick={() => {
        if (showStartMenu) setShowStartMenu(false);
        if (contextMenu) setContextMenu(null);
      }}
    >
      {/* ── Desktop Ambient Frutiger Aero Atmosphere Layer ── */}
      <AeroAtmosphere isMaximized={isMaximized} />

      {/* ── Desktop Interactive Rising Frutiger Aero Bubbles ── */}
      <InteractiveBubbleField />

      {/* ── Desktop Click Water Ripples ── */}
      <DesktopRipple />

      {/* ── Windows Vista / 7 Desktop Gadget Bar ── */}
      <AeroGadgetSidebar />

      {/* ── Windows 7 Desktop Shortcut Icons ── */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          zIndex: 5,
        }}
        className="hidden md:flex"
      >
        <div
          className="win7-desktop-icon"
          onClick={() => handleDesktopIconClick('/')}
          tabIndex={0}
          role="button"
          aria-label="Computer Desktop Shortcut"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleDesktopIconClick('/');
          }}
        >
          <VistaIcon id="computer" size={34} title="Computer" />
          <span className="win7-desktop-icon-label">Computer</span>
        </div>

        <div
          className="win7-desktop-icon"
          onClick={() => handleDesktopIconClick('/about')}
          tabIndex={0}
          role="button"
          aria-label="Elyuzar User Profile Shortcut"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleDesktopIconClick('/about');
          }}
        >
          <VistaIcon id="userfolder" size={34} title="Elyuzar" />
          <span className="win7-desktop-icon-label">Elyuzar</span>
        </div>

        <div
          className="win7-desktop-icon"
          onClick={() => handleDesktopIconClick('/projects')}
          tabIndex={0}
          role="button"
          aria-label="Projects Folder Shortcut"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleDesktopIconClick('/projects');
          }}
        >
          <VistaIcon id="folder" size={34} title="Projects" />
          <span className="win7-desktop-icon-label">Projects</span>
        </div>

        <a
          href="./assets/Elyuzar_CV.pdf"
          download
          className="win7-desktop-icon"
          style={{ textDecoration: 'none' }}
          title="Download Elyuzar_CV.pdf"
        >
          <VistaIcon id="document" size={34} title="Elyuzar_CV.pdf" />
          <span className="win7-desktop-icon-label">Elyuzar_CV</span>
        </a>

        <a
          href="https://github.com/prettycoolflacko"
          target="_blank"
          rel="noopener noreferrer"
          className="win7-desktop-icon"
          style={{ textDecoration: 'none' }}
          title="GitHub Profile"
        >
          <VistaIcon id="earth" size={34} title="GitHub" />
          <span className="win7-desktop-icon-label">GitHub</span>
        </a>

        <div
          className="win7-desktop-icon"
          onClick={() => alert('Recycle Bin is empty.')}
          tabIndex={0}
          role="button"
          aria-label="Recycle Bin"
        >
          <VistaIcon id="recycle" size={34} title="Recycle Bin" />
          <span className="win7-desktop-icon-label">Recycle Bin</span>
        </div>
      </div>

      {/* ── Main Windows 7 Window Shell (Permanent Mount, swapping internal routes) ── */}
      {!isClosed && (
        <WindowFrame
          isMaximized={isMaximized}
          isMinimized={isMinimized}
          onToggleMaximize={() => setIsMaximized(!isMaximized)}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
          onRequestClose={() => setShowCloseDialog(true)}
        >
          {/* Framer Motion page transition: 220ms fade & scale (0.98 to 1) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100%' }}
            >
              <Suspense fallback={<RouteSuspenseFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/certifications" element={<Certifications />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </WindowFrame>
      )}

      {/* ── Restore Widget if window is closed or minimized ── */}
      {(isMinimized || isClosed) && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <button
            onClick={() => {
              setIsMinimized(false);
              setIsClosed(false);
            }}
            className="aero-btn aero-btn-sky"
            style={{
              padding: '12px 28px',
              fontSize: '14px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}
            type="button"
          >
            <VistaIcon id="computer" size={22} />
            Restore Elyuzar's Portfolio Window
          </button>
        </div>
      )}

      {/* ── Windows 7 Start Menu ── */}
      <AnimatePresence>
        {showStartMenu && (
          <StartMenu
            onClose={() => setShowStartMenu(false)}
            onShutDown={() => setShowCloseDialog(true)}
          />
        )}
      </AnimatePresence>

      {/* ── Close Confirmation Dialog ── */}
      <AnimatePresence>
        {showCloseDialog && (
          <CloseDialog
            onConfirmClose={() => {
              setShowCloseDialog(false);
              setIsClosed(true);
              setShowStartMenu(false);
            }}
            onCancel={() => setShowCloseDialog(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Windows 7 Right-Click Context Menu ── */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          currentPath={location.pathname}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* ── Windows 7 Superbar (Taskbar) ── */}
      <Taskbar
        isMinimized={isMinimized}
        isClosed={isClosed}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
        onToggleStartMenu={() => setShowStartMenu(!showStartMenu)}
        showStartMenu={showStartMenu}
        onPeekDesktop={() => setIsMinimized(!isMinimized)}
      />
    </div>
  );
}
