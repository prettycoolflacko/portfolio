import { motion } from 'framer-motion';
import VistaIcon from '../VistaIcon';

export default function CloseDialog({ onConfirmClose, onCancel }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 11000,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="win7-window"
        style={{ width: 430, padding: 0 }}
      >
        <div className="win7-titlebar">
          <span className="win7-title-content" id="dialog-title">
            <VistaIcon id="warn" size={17} />
            Windows Security Dialog
          </span>
          <button
            onClick={onCancel}
            className="win7-btn-ctrl win7-btn-close"
            aria-label="Close dialog"
            type="button"
          >
            ✕
          </button>
        </div>

        <div style={{ background: '#ffffff', padding: '20px 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <VistaIcon id="warn" size={38} />
          <div>
            <h4 style={{ margin: '0 0 6px', color: '#0d3a5c', fontSize: '13.5px', fontWeight: 700 }}>
              Close Elyuzar's Portfolio Window?
            </h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#4a7190', lineHeight: 1.5 }}>
              Closing this window minimizes the session view. You can restore it anytime from the desktop icon or taskbar.
            </p>
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(180deg, #f2f5f9 0%, #e2e8f0 100%)',
            borderTop: '1px solid #b8c9d9',
            padding: '10px 16px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
          }}
        >
          <button
            onClick={onConfirmClose}
            className="aero-btn aero-btn-sky"
            style={{ fontSize: '12px', minWidth: 84 }}
            type="button"
          >
            Close Window
          </button>
          <button
            onClick={onCancel}
            className="aero-btn"
            style={{ fontSize: '12px', minWidth: 70 }}
            type="button"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
