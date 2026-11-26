import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VistaIcon from '../VistaIcon';
import AeroSprite from '../AeroSprite';
const profileImg = '/assets/elyuzar_profile.jpeg';

const menuLinks = [
  { label: 'Getting Started (Home)', path: '/', icon: 'computer' },
  { label: 'System Properties (About)', path: '/about', icon: 'info' },
  { label: 'Control Panel (Skills)', path: '/skills', icon: 'tool' },
  { label: 'Projects Folder', path: '/projects', icon: 'folder' },
  { label: 'Event Viewer (Experience)', path: '/experience', icon: 'film' },
  { label: 'Documents (Education)', path: '/education', icon: 'book' },
  { label: 'Certificates Manager', path: '/certifications', icon: 'certificate' },
  { label: 'Windows Live Mail (Contact)', path: '/contact', icon: 'envelope' },
];

export default function StartMenu({ onClose, onShutDown }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.15 }}
      className="win7-startmenu"
      role="menu"
      aria-label="Windows 7 Start Menu"
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
            Informatics · UPN Veteran Yogyakarta
          </div>
        </div>
      </div>

      {/* Start Menu Content Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', background: '#ffffff', minHeight: 280 }}>
        {/* Left Column: Programs / Routes */}
        <div style={{ padding: '8px 4px', borderRight: '1px solid #d8e5f2', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {menuLinks.map((item) => (
            <div
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="win7-startmenu-item"
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleNavigate(item.path);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 8px',
                borderRadius: 2,
                cursor: 'pointer',
                fontSize: '11.5px',
                color: '#1e395b',
                fontWeight: 600,
              }}
            >
              <VistaIcon id={item.icon} size={20} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right Column: User Places & Links */}
        <div style={{ padding: '8px 10px', background: 'linear-gradient(180deg, #f2f7fc 0%, #e6eff8 100%)', display: 'flex', flexDirection: 'column', gap: 7, fontSize: '12px' }}>
          <div style={{ fontWeight: 700, color: '#0d3a5c', borderBottom: '1px solid #c2d7eb', paddingBottom: 4, fontSize: '11px' }}>
            User Places
          </div>

          <a
            href="./assets/Elyuzar_CV.pdf"
            download
            style={{ textDecoration: 'none', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}
          >
            <VistaIcon id="document" size={17} />
            Resume (CV.pdf)
          </a>

          <div
            onClick={() => handleNavigate('/projects')}
            style={{ cursor: 'pointer', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}
          >
            <VistaIcon id="folder" size={17} />
            Projects
          </div>

          <a
            href="https://github.com/prettycoolflacko"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}
          >
            <VistaIcon id="earth" size={17} />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/elyuzar-f"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}
          >
            <AeroSprite id="linkedin" size={17} />
            LinkedIn
          </a>

          <a
            href="mailto:elyuzarf@gmail.com"
            style={{ textDecoration: 'none', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}
          >
            <VistaIcon id="envelope" size={17} />
            Send Email
          </a>

          <div
            onClick={() => handleNavigate('/about')}
            style={{ cursor: 'pointer', color: '#1a4e70', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, marginTop: 'auto' }}
          >
            <VistaIcon id="computer" size={17} />
            Computer
          </div>
        </div>
      </div>

      {/* Start Menu Bottom Bar */}
      <div
        style={{
          background: 'linear-gradient(180deg, #e4eff9 0%, #d0e2f4 100%)',
          borderTop: '1px solid #b8c9d9',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => handleNavigate('/')}
          className="aero-btn"
          style={{ fontSize: '11px', padding: '3px 10px' }}
          type="button"
        >
          All Programs
        </button>

        <button
          onClick={onShutDown}
          className="aero-btn"
          style={{ fontSize: '11px', padding: '3px 10px', color: '#c62828' }}
          type="button"
        >
          Shut Down...
        </button>
      </div>
    </motion.div>
  );
}
