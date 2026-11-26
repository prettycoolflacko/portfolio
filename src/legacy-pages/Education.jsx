import { useState } from 'react';
import VistaIcon from '../components/VistaIcon';
import { educationItems } from '../data/education';

export default function Education() {
  const [selectedId, setSelectedId] = useState(educationItems[0].id);
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);

  const selectedItem = educationItems.find((e) => e.id === selectedId) || educationItems[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ── Library Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #c2d7eb', paddingBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <VistaIcon id="book" size={28} />
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0d3a5c' }}>
              Education & Academic Background · Documents Library
            </h1>
            <span style={{ fontSize: '11px', color: '#546e7a' }}>
              Libraries\Documents\Education · University and High School Records
            </span>
          </div>
        </div>

        <a
          href="./assets/Elyuzar_CV.pdf"
          download
          className="aero-btn"
          style={{ fontSize: '11px', padding: '3px 12px' }}
        >
          <VistaIcon id="document" size={14} />
          Download Transcript / CV
        </a>
      </div>

      {/* ── Library Content Layout: Documents Table + Details ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }} className="md:grid-cols-[1.4fr_1fr]">
        {/* Document files list */}
        <div style={{ background: '#ffffff', border: '1px solid #b8c9d9', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(180deg, #f7f9fb 0%, #e9eff5 100%)', borderBottom: '1px solid #b8c9d9', padding: '7px 12px', fontSize: '11.5px', fontWeight: 700, color: '#1e395b' }}>
            Academic Credentials (Click to inspect)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {educationItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '12px 14px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f4f8',
                    background: isSelected ? 'linear-gradient(180deg, #e4effa 0%, #cce5f8 100%)' : '#ffffff',
                    borderLeft: isSelected ? '3px solid #1976d2' : '3px solid transparent',
                  }}
                >
                  <VistaIcon id={item.icon || 'document'} size={38} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0d47a1' }}>
                        {item.degree}
                      </span>
                      <span style={{ fontSize: '11px', color: '#78909c' }}>
                        {item.period}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e395b', marginTop: 2 }}>
                      {item.institution}
                    </div>

                    <div style={{ fontSize: '11px', color: '#2e7d32', fontWeight: 700, marginTop: 3 }}>
                      {item.metricLabel}: {item.metricValue} ({item.status})
                    </div>

                    <div style={{ fontSize: '10.5px', color: '#546e7a', marginTop: 4 }}>
                      File: {item.fileName} ({item.fileSize})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Document Details Card */}
        {selectedItem && (
          <aside
            style={{
              background: 'linear-gradient(180deg, #fcfdff 0%, #f0f5fa 100%)',
              border: '1px solid #b8c9d9',
              borderRadius: 2,
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              fontSize: '11.5px',
            }}
          >
            <div style={{ borderBottom: '1px solid #d2e0ed', paddingBottom: 6 }}>
              <span style={{ fontWeight: 700, color: '#0d3a5c', fontSize: '11px', textTransform: 'uppercase' }}>
                Academic Summary
              </span>
            </div>

            <div style={{ textAlign: 'center', padding: '6px 0' }}>
              <VistaIcon id={selectedItem.icon || 'document'} size={48} />
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0d3a5c', marginTop: 4 }}>
                {selectedItem.degree}
              </div>
              <div style={{ fontSize: '11.5px', color: '#546e7a' }}>
                {selectedItem.shortName}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e1ebf5', paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div><strong>Standing:</strong> {selectedItem.metricLabel}: {selectedItem.metricValue}</div>
              <div><strong>Location:</strong> {selectedItem.location}</div>
              <div><strong>Status:</strong> {selectedItem.status}</div>
            </div>

            <div style={{ borderTop: '1px solid #e1ebf5', paddingTop: 6 }}>
              <div style={{ fontWeight: 700, color: '#0d3a5c', marginBottom: 4 }}>Activities & Achievements:</div>
              <ul style={{ margin: 0, paddingLeft: 16, lineHeight: 1.5, color: '#37474f' }}>
                {selectedItem.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 8 }}>
              <button
                type="button"
                className="aero-btn aero-btn-sky"
                onClick={() => setShowPropertiesModal(true)}
                style={{ width: '100%', fontSize: '11.5px', padding: '5px 10px' }}
              >
                View Full Institution Properties...
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* ── Institution Properties Modal ── */}
      {showPropertiesModal && selectedItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10500,
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="win7-window" style={{ width: 480, padding: 0 }}>
            <div className="win7-titlebar">
              <span className="win7-title-content">
                <VistaIcon id="book" size={16} />
                {selectedItem.shortName} Properties
              </span>
              <button
                type="button"
                className="win7-btn-ctrl win7-btn-close"
                onClick={() => setShowPropertiesModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={{ background: '#ffffff', padding: 16, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '12px', color: '#1e395b' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', borderBottom: '1px solid #e0e0e0', paddingBottom: 8 }}>
                <VistaIcon id={selectedItem.icon || 'document'} size={36} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13.5px' }}>{selectedItem.institution}</div>
                  <div style={{ color: '#0288d1' }}>{selectedItem.degree}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 6 }}>
                <span style={{ color: '#546e7a' }}>Status:</span>
                <span style={{ fontWeight: 600 }}>{selectedItem.status}</span>

                <span style={{ color: '#546e7a' }}>{selectedItem.metricLabel}:</span>
                <span style={{ fontWeight: 700, color: '#0d47a1' }}>{selectedItem.metricValue}</span>

                <span style={{ color: '#546e7a' }}>Timeline:</span>
                <span>{selectedItem.period}</span>

                <span style={{ color: '#546e7a' }}>Location:</span>
                <span>{selectedItem.location}</span>
              </div>

              <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 8 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Curriculum & Focus:</div>
                <p style={{ margin: 0, lineHeight: 1.5, color: '#37474f' }}>
                  {selectedItem.notes}
                </p>
              </div>
            </div>

            <div style={{ background: '#f2f5f9', borderTop: '1px solid #b8c9d9', padding: '8px 14px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="aero-btn aero-btn-sky"
                onClick={() => setShowPropertiesModal(false)}
                style={{ fontSize: '11px', minWidth: 64 }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
