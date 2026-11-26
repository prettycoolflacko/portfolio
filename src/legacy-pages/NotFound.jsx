import { useNavigate, useLocation } from 'react-router-dom';
import VistaIcon from '../components/VistaIcon';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const attemptedPath = searchParams.get('path') || location.pathname;

  return (
    <div style={{ maxWidth: 440, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ── Classic Windows can't find ... Dialog ── */}
      <div
        className="win7-window"
        style={{
          padding: 0,
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div className="win7-titlebar">
          <span className="win7-title-content">
            <VistaIcon id="warn" size={16} />
            Address Not Found
          </span>
          <button
            type="button"
            className="win7-btn-ctrl win7-btn-close"
            onClick={() => navigate('/')}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <VistaIcon id="warn" size={38} />
          <div>
            <h4 style={{ margin: '0 0 6px', color: '#0d3a5c', fontSize: '13px', fontWeight: 700 }}>
              Windows cannot find '{attemptedPath}'.
            </h4>
            <p style={{ margin: 0, fontSize: '11.5px', color: '#546e7a', lineHeight: 1.45 }}>
              Check the spelling and try again. Make sure you typed the path correctly or select one of the valid items from the Navigation Pane on the left.
            </p>
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(180deg, #f2f5f9 0%, #e2e8f0 100%)',
            borderTop: '1px solid #b8c9d9',
            padding: '8px 14px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
          }}
        >
          <button
            type="button"
            className="aero-btn aero-btn-sky"
            onClick={() => navigate('/')}
            style={{ minWidth: 64, fontSize: '11.5px' }}
          >
            OK
          </button>
          <button
            type="button"
            className="aero-btn"
            onClick={() => navigate(-1)}
            style={{ minWidth: 64, fontSize: '11.5px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
