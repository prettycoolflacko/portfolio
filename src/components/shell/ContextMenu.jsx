import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VistaIcon from '../VistaIcon';

export default function ContextMenu({ x, y, onClose, currentPath }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = () => onClose();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="win7-context-menu"
      style={{
        position: 'fixed',
        top: Math.min(y, window.innerHeight - 200),
        left: Math.min(x, window.innerWidth - 180),
        zIndex: 12000,
        width: 175,
        background: '#ffffff',
        border: '1px solid #979797',
        borderRadius: 2,
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.35)',
        padding: '2px 0',
        fontSize: '12px',
        color: '#1e395b',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="win7-context-item"
        onClick={() => {
          navigate(currentPath || '/');
          onClose();
        }}
        style={{ padding: '4px 24px 4px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
      >
        <VistaIcon id="folder" size={14} />
        <span>Open</span>
      </div>

      <div
        className="win7-context-item"
        onClick={() => {
          window.location.reload();
          onClose();
        }}
        style={{ padding: '4px 24px 4px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
      >
        <VistaIcon id="refresh" size={14} />
        <span>Refresh</span>
      </div>

      <div style={{ height: 1, background: '#e0e0e0', margin: '3px 0' }} />

      <div
        className="win7-context-item"
        onClick={() => {
          navigator.clipboard?.writeText(window.location.href);
          onClose();
        }}
        style={{ padding: '4px 24px 4px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
      >
        <VistaIcon id="document" size={14} />
        <span>Copy Address</span>
      </div>

      <div
        className="win7-context-item"
        onClick={() => {
          navigate('/about');
          onClose();
        }}
        style={{ padding: '4px 24px 4px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
      >
        <VistaIcon id="tool" size={14} />
        <span>Properties</span>
      </div>
    </div>
  );
}
