import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiVolume2, FiWifi, FiFlag
} from 'react-icons/fi';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AeroSprite from './components/AeroSprite';
import profileImg from './assets/profile.webp';

export default function App() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const contentRef = useRef(null);

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

  // Section observer to update breadcrumb address
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const names = {
              hero: 'Home',
              about: 'About Me',
              skills: 'Technical Skills',
              projects: 'Projects',
              experience: 'Experience',
              education: 'Education',
              certifications: 'Certifications',
              contact: 'Contact'
            };
            if (names[id]) setActiveSection(names[id]);
          }
        });
      },
      { root: contentRef.current, threshold: 0.2 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, [isMinimized, isClosed]);

  const scrollToSection = (id) => {
    if (isMinimized) setIsMinimized(false);
    if (isClosed) setIsClosed(false);
    setShowStartMenu(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navMenuItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="win7-desktop">
      {/* Desktop Background Wallpaper overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* Frutiger Aero nature layer — floating water / life elements on the desktop */}
      <div className="aero-nature-layer" aria-hidden="true">
        <div className="aero-drift" style={{ top: '14%', right: '7%', animationDelay: '0s' }}>
          <AeroSprite id="bubbles" size={44} />
        </div>
        <div className="aero-drift" style={{ top: '30%', right: '14%', animationDelay: '1.2s' }}>
          <AeroSprite id="fish" size={52} />
        </div>
        <div className="aero-drift" style={{ top: '52%', right: '9%', animationDelay: '2.1s' }}>
          <AeroSprite id="drop" size={34} />
        </div>
        <div className="aero-drift" style={{ top: '66%', left: '4%', animationDelay: '0.6s' }}>
          <AeroSprite id="leaf" size={40} />
        </div>
        <div className="aero-drift" style={{ top: '80%', right: '24%', animationDelay: '1.8s' }}>
          <AeroSprite id="butterfly" size={44} />
        </div>
        <div className="aero-drift" style={{ top: '40%', left: '6%', animationDelay: '2.6s' }}>
          <AeroSprite id="shell" size={38} />
        </div>
      </div>

      {/* Desktop Icons on wallpaper (Windows 7 style) */}
      <div style={{
        position: 'fixed',
        top: 16,
        left: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        zIndex: 5,
      }} className="hidden md:flex">
        <div className="win7-desktop-icon" onClick={() => scrollToSection('hero')}>
          <AeroSprite id="monitor" size={34} title="My Computer" />
          <span className="win7-desktop-icon-label">Computer</span>
        </div>
        <div className="win7-desktop-icon" onClick={() => scrollToSection('about')}>
          <AeroSprite id="globe" size={34} title="Elyuzar" />
          <span className="win7-desktop-icon-label">Elyuzar</span>
        </div>
        <div className="win7-desktop-icon" onClick={() => scrollToSection('projects')}>
          <AeroSprite id="folder" size={34} title="Projects" />
          <span className="win7-desktop-icon-label">Projects</span>
        </div>
        <a href="./assets/Elyuzar_CV.pdf" download className="win7-desktop-icon" style={{ textDecoration: 'none' }}>
          <AeroSprite id="document" size={34} title="Elyuzar_CV" />
          <span className="win7-desktop-icon-label">Elyuzar_CV</span>
        </a>
        <a href="https://github.com/prettycoolflacko" target="_blank" rel="noopener noreferrer" className="win7-desktop-icon" style={{ textDecoration: 'none' }}>
          <AeroSprite id="web" size={34} title="GitHub" />
          <span className="win7-desktop-icon-label">GitHub</span>
        </a>
        <div className="win7-desktop-icon" onClick={() => alert('Recycle Bin is currently empty.')}>
          <AeroSprite id="recycle" size={34} title="Recycle Bin" />
          <span className="win7-desktop-icon-label">Recycle Bin</span>
        </div>
      </div>

      {/* Main Windows 7 Aero Window */}
      <AnimatePresence>
        {!isMinimized && !isClosed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'relative',
              zIndex: 20,
              width: isMaximized ? '100vw' : 'min(1150px, 96vw)',
              margin: isMaximized ? '0' : '20px auto',
              borderRadius: isMaximized ? '0' : '6px 6px 3px 3px',
              transition: 'width 0.25s ease, margin 0.25s ease, border-radius 0.25s ease',
            }}
            className="win7-window"
          >
            {/* ── Windows 7 Aero Title Bar ── */}
            <div className="win7-titlebar">
              <div className="win7-title-content">
                {/* Aero glossy monitor sprite */}
                <AeroSprite id="monitor" size={20} title="Portfolio window" />
                <span>Elyuzar Fazlurrahman — Portfolio</span>
              </div>

              {/* Window Controls: Min, Max, Close */}
              <div className="win7-controls">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="win7-btn-ctrl"
                  title="Minimize"
                >
                  ─
                </button>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="win7-btn-ctrl"
                  title={isMaximized ? "Restore Down" : "Maximize"}
                >
                  {isMaximized ? '❐' : '□'}
                </button>
                <button
                  onClick={() => setShowCloseDialog(true)}
                  className="win7-btn-ctrl win7-btn-close"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── Windows 7 Menu Bar (File, Edit, View, Navigation...) ── */}
            <div className="win7-menubar">
              <span className="win7-menu-item" onClick={() => scrollToSection('hero')}>File</span>
              {navMenuItems.map(item => (
                <span
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`win7-menu-item${activeSection === item.label ? ' active' : ''}`}
                >
                  {item.label}
                </span>
              ))}
              <a
                href="./assets/Elyuzar_CV.pdf"
                download
                className="win7-menu-item"
                style={{ marginLeft: 'auto', textDecoration: 'none', color: '#0288d1', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <AeroSprite id="document" size={14} />
                Download CV
              </a>
            </div>

            {/* ── Explorer Toolbar / Address Bar ── */}
            <div className="win7-toolbar">
              <button
                className="win7-nav-btn"
                title="Back"
                onClick={() => window.history.back()}
              >
                ◀
              </button>
              <button
                className="win7-nav-btn"
                title="Forward"
                onClick={() => window.history.forward()}
              >
                ▶
              </button>

              {/* Breadcrumb address bar */}
              <div className="win7-address-bar">
                <AeroSprite id="monitor" size={14} />
                <span className="win7-address-segment" onClick={() => scrollToSection('hero')}>Computer</span>
                <span>›</span>
                <span className="win7-address-segment" onClick={() => scrollToSection('hero')}>Local Disk (C:)</span>
                <span>›</span>
                <span className="win7-address-segment" onClick={() => scrollToSection('about')}>Users</span>
                <span>›</span>
                <span className="win7-address-segment" onClick={() => scrollToSection('about')}>Elyuzar</span>
                <span>›</span>
                <span className="win7-address-segment" style={{ fontWeight: 700, color: '#0d47a1' }}>
                  {activeSection}
                </span>
                <button
                  onClick={() => window.location.reload()}
                  style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#4a7190', padding: '0 4px' }}
                  title="Refresh"
                >
                  ⟳
                </button>
              </div>

              {/* Search Box */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #9bb7d4',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                padding: '2px 8px',
                gap: 6,
                width: 170,
              }} className="hidden sm:flex">
                <FiSearch style={{ color: '#4a7190', fontSize: '12px' }} />
                <input
                  type="text"
                  placeholder="Search portfolio..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '11px',
                    width: '100%',
                    fontFamily: 'var(--font-body)',
                    color: '#1e395b',
                  }}
                />
              </div>
            </div>

            {/* ── Header Banner (Exact replica of user's uploaded screenshot!) ── */}
            <div className="win7-header-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* Frutiger Aero glossy globe + LCD monitor composite */}
                <div style={{
                  position: 'relative',
                  width: 58,
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {/* Glossy globe behind the monitor */}
                  <AeroSprite id="globe" size={46} style={{ position: 'absolute', left: 0, top: 0 }} />
                  {/* Glossy LCD screen in front */}
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    width: 42,
                    height: 34,
                    background: 'linear-gradient(135deg, #e0f2fe 0%, #38bdf8 50%, #0369a1 100%)',
                    border: '3px solid #f1f5f9',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.35), inset 0 0 4px rgba(255,255,255,0.8)',
                    marginLeft: 12,
                    marginTop: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '11px',
                  }}>
                    Aero
                  </div>
                </div>

                <div>
                  <h1 className="win7-banner-title">
                    Elyuzar Fazlurrahman
                  </h1>
                  <p style={{
                    color: 'rgba(255,255,255,0.88)',
                    fontSize: '12px',
                    margin: '2px 0 0',
                    fontWeight: 500,
                    letterSpacing: '0.2px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  }}>
                    Frutiger Aero Edition · Windows 7 Architecture
                  </p>
                </div>
              </div>

              {/* Right side badges */}
              <div style={{ display: 'flex', gap: 6 }} className="hidden sm:flex">
                <span className="skill-orb skill-orb-sky" style={{ fontSize: '11px', padding: '3px 8px' }}>
                  Backend Engineer
                </span>
                <span className="skill-orb skill-orb-aqua" style={{ fontSize: '11px', padding: '3px 8px' }}>
                  Mobile Developer
                </span>
              </div>
            </div>

            {/* ── Info Sub-Bar (Exact replica from user's uploaded screenshot!) ── */}
            <div className="win7-infobar">
              <span className="win7-info-sphere" title="Information">
                i
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#0d3a5c',
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}>
                  CS Student at UPN Veteran Yogyakarta · Building high-performance backends, mobile apps, and tools that solve real problems.
                </p>
              </div>
              <a
                href="#contact"
                className="aero-btn aero-btn-sky"
                style={{ fontSize: '11px', padding: '3px 10px', flexShrink: 0 }}
              >
                Contact Info
              </a>
            </div>

            {/* ── Main Content Area (Crisp White Inset Pane with Square Edges) ── */}
            <div
              ref={contentRef}
              className="win7-content-body"
              style={{
                maxHeight: isMaximized ? 'calc(100vh - 190px)' : '72vh',
              }}
            >
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Certifications />
              <Contact />
            </div>

            {/* ── Window Footer / Status Bar ── */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop reopen widget if window closed or minimized */}
      {(isMinimized || isClosed) && (
        <div style={{
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
        }}>
          <div style={{ display: 'flex', gap: 10, opacity: 0.9 }}>
            <AeroSprite id="bubbles" size={34} />
            <AeroSprite id="fish" size={38} />
            <AeroSprite id="drop" size={32} />
          </div>
          <button
            onClick={() => { setIsMinimized(false); setIsClosed(false); }}
            className="aero-btn aero-btn-sky"
            style={{ padding: '12px 28px', fontSize: '15px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            <AeroSprite id="monitor" size={20} />
            Restore Elyuzar's Portfolio Window
          </button>
        </div>
      )}

      {/* ── Windows 7 Start Menu (when Start Orb is clicked) ── */}
      <AnimatePresence>
        {showStartMenu && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="win7-startmenu"
          >
            {/* Start Menu Header */}
            <div className="win7-startmenu-header">
              <div className="win7-avatar-frame" style={{ width: 44, height: 44, padding: 2 }}>
                <img src={profileImg} alt="Elyuzar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
                  Elyuzar Fazlurrahman
                </div>
                <div style={{ fontSize: '11px', color: '#b3e5fc' }}>
                  Computer Science Student & Developer
                </div>
              </div>
            </div>

            {/* Start Menu Content Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', background: '#ffffff', minHeight: 280 }}>
              {/* Left Column: Programs / Sections */}
              <div style={{ padding: '8px 4px', borderRight: '1px solid #d8e5f2', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {navMenuItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 10px',
                      borderRadius: 2,
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: '#1e395b',
                      fontWeight: 600,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e3f2fd'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span>▸</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Right Column: User Folders & Links */}
              <div style={{ padding: '8px 10px', background: 'linear-gradient(180deg, #f2f7fc 0%, #e6eff8 100%)', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '12px' }}>
                <div style={{ fontWeight: 700, color: '#0d3a5c', borderBottom: '1px solid #c2d7eb', paddingBottom: 4 }}>
                  System Places
                </div>
                <a href="./assets/Elyuzar_CV.pdf" download style={{ textDecoration: 'none', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AeroSprite id="document" size={18} />
                  Resume / CV
                </a>
                <a href="https://github.com/prettycoolflacko" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AeroSprite id="web" size={18} />
                  GitHub Profile
                </a>
                <a href="https://www.linkedin.com/in/elyuzar-f" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AeroSprite id="linkedin" size={18} />
                  LinkedIn
                </a>
                <a href="mailto:elyuzarf@gmail.com" style={{ textDecoration: 'none', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AeroSprite id="mail" size={18} />
                  Send Email
                </a>
              </div>
            </div>

            {/* Start Menu Bottom Bar */}
            <div style={{
              background: 'linear-gradient(180deg, #e4eff9 0%, #d0e2f4 100%)',
              borderTop: '1px solid #b8c9d9',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <button
                onClick={() => { setShowStartMenu(false); scrollToSection('hero'); }}
                className="aero-btn"
                style={{ fontSize: '11px', padding: '3px 10px' }}
              >
                All Programs
              </button>
              <button
                onClick={() => setShowCloseDialog(true)}
                className="aero-btn"
                style={{ fontSize: '11px', padding: '3px 10px', color: '#c62828' }}
              >
                Shut Down...
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Windows 7 Close Confirmation Dialog ── */}
      <AnimatePresence>
        {showCloseDialog && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 11000,
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="win7-window"
              style={{ width: 420, padding: 0 }}
            >
              <div className="win7-titlebar">
                <span className="win7-title-content">
                  <AeroSprite id="warn" size={18} />
                  Windows Security Dialog
                </span>
                <button
                  onClick={() => setShowCloseDialog(false)}
                  className="win7-btn-ctrl win7-btn-close"
                >
                  ✕
                </button>
              </div>
              <div style={{ background: '#ffffff', padding: '20px 24px', display: 'flex', gap: 16 }}>
                <AeroSprite id="monitor" size={38} />
                <div>
                  <h4 style={{ margin: '0 0 6px', color: '#0d3a5c', fontSize: '14px', fontWeight: 700 }}>
                    Close Elyuzar's Portfolio?
                  </h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#4a7190', lineHeight: 1.5 }}>
                    Closing this window will hide the portfolio view. You can restore it anytime from the desktop or taskbar.
                  </p>
                </div>
              </div>
              <div style={{
                background: 'linear-gradient(180deg, #f2f5f9 0%, #e2e8f0 100%)',
                borderTop: '1px solid #b8c9d9',
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 8,
              }}>
                <button
                  onClick={() => { setShowCloseDialog(false); setIsClosed(true); setShowStartMenu(false); }}
                  className="aero-btn aero-btn-sky"
                  style={{ fontSize: '12px' }}
                >
                  Close Window
                </button>
                <button
                  onClick={() => setShowCloseDialog(false)}
                  className="aero-btn"
                  style={{ fontSize: '12px' }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Windows 7 Aero Taskbar (Superbar) ── */}
      <div className="win7-taskbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Windows 7 Start Orb */}
          <div
            className="win7-start-orb"
            title="Start"
            onClick={() => setShowStartMenu(!showStartMenu)}
          >
            {/* Windows 4-color flag SVG */}
            <svg width="22" height="22" viewBox="0 0 88 88" fill="none">
              <path d="M0 12.5L35.8 7.6V41.7H0V12.5Z" fill="#F25022"/>
              <path d="M42.4 6.7L88 0V41.7H42.4V6.7Z" fill="#7FBA00"/>
              <path d="M0 46.3H35.8V80.4L0 75.5V46.3Z" fill="#00A4EF"/>
              <path d="M42.4 46.3H88V88L42.4 81.3V46.3Z" fill="#FFB900"/>
            </svg>
          </div>

          {/* Active Window Taskbar Button */}
          {!isClosed && (
            <div
              className={`win7-task-tab${!isMinimized ? ' active' : ''}`}
              onClick={() => setIsMinimized(!isMinimized)}
              title="Elyuzar Fazlurrahman - Portfolio"
            >
              <AeroSprite id="monitor" size={18} />
              <span className="hidden sm:inline">Elyuzar Fazlurrahman — Portfolio</span>
            </div>
          )}
        </div>

        {/* System Tray (Right Side) */}
        <div className="win7-systray">
          <FiFlag style={{ cursor: 'pointer', fontSize: '13px' }} title="Action Center" />
          <FiWifi style={{ cursor: 'pointer', fontSize: '13px' }} title="Internet access" />
          <FiVolume2 style={{ cursor: 'pointer', fontSize: '13px' }} title="Speakers: 100%" />

          {/* Date & Time */}
          <div className="win7-systray-clock" title={new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
            <span>{currentTime}</span>
            <span style={{ fontSize: '10px', opacity: 0.9 }}>{currentDate}</span>
          </div>

          {/* Show Desktop Peek Button */}
          <div
            className="win7-peek-desktop"
            title="Show Desktop"
            onClick={() => setIsMinimized(!isMinimized)}
          />
        </div>
      </div>
    </div>
  );
}
