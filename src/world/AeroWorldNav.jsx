import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiVolume2, FiVolumeX } from 'react-icons/fi';
import VistaIcon from '../components/VistaIcon';
import { toggleAudio, isAudioEnabled, playBubblePop } from '../utils/audio';

/**
 * Frutiger Aero Floating Glass Navigation Bar
 * Hallmark compliant:
 * - Pure token-driven styling
 * - All eight states defined
 * - No middle dots or glued arrows
 * - Semantic sentence-case navigation
 */
export default function AeroWorldNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [wibTime, setWibTime] = useState('');
  const [soundOn, setSoundOn] = useState(() => isAudioEnabled());

  const handleSoundToggle = () => {
    const next = toggleAudio();
    setSoundOn(next);
    if (next) playBubblePop(580);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setWibTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Jakarta',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'journey', 'contact'];
      const scrollY = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Sky' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="aero-nav-header">
      <div className="aero-nav-bar">
        {/* Brand identity */}
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="aero-nav-brand"
          style={{ whiteSpace: 'nowrap' }}
        >
          <span className="aero-nav-logo">EF</span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Elyuzar
          </span>
        </button>

        {/* Navigation links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2xs)',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`aero-nav-link${isActive ? ' is-active' : ''}`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2xs)' }}>
          <button
            type="button"
            onClick={handleSoundToggle}
            className="aero-btn"
            style={{ padding: 'var(--space-2xs) var(--space-xs)' }}
            title={soundOn ? 'Sound effects active (click to mute)' : 'Sound effects muted (click to enable)'}
            aria-label="Toggle sound effects"
          >
            {soundOn ? <FiVolume2 size={14} color="var(--color-accent-ink)" /> : <FiVolumeX size={14} />}
          </button>

          <div className="aero-nav-time hidden md:block">
            {wibTime} WIB
          </div>

          <a
            href="./assets/Elyuzar_CV.pdf"
            download
            className="aero-btn"
            style={{ padding: 'var(--space-2xs) var(--space-sm)' }}
          >
            <FiDownload size={13} />
            <span style={{ whiteSpace: 'nowrap' }}>CV</span>
          </a>

          <Link
            to="/os"
            className="aero-btn aero-btn-primary"
            title="Launch Windows 7 desktop shell"
            style={{ padding: 'var(--space-2xs) var(--space-sm)' }}
          >
            <VistaIcon id="computer" size={14} />
            <span className="hidden sm:inline" style={{ whiteSpace: 'nowrap' }}>Desktop mode</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
