import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import VistaIcon from '../components/VistaIcon';
import { certificates } from '../data/certifications';

export default function Certifications() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase().trim();

  const [selectedCertId, setSelectedCertId] = useState(certificates[0].id);
  const [viewDialogCert, setViewDialogCert] = useState(null);

  const filteredCerts = useMemo(() => {
    if (!query) return certificates;
    return certificates.filter(
      (c) =>
        c.friendlyName.toLowerCase().includes(query) ||
        c.issuedBy.toLowerCase().includes(query) ||
        c.purposes.toLowerCase().includes(query)
    );
  }, [query]);

  const selectedCert = useMemo(() => {
    return filteredCerts.find((c) => c.id === selectedCertId) || filteredCerts[0] || null;
  }, [filteredCerts, selectedCertId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
      {/* ── Certificates Manager Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #c2d7eb', paddingBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <VistaIcon id="certificate" size={28} />
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0d3a5c' }}>
              Professional Certifications & Honors
            </h1>
            <span style={{ fontSize: '11px', color: '#546e7a' }}>
              Certificates Manager (certmgr) · {filteredCerts.length} verified credentials on file
            </span>
          </div>
        </div>

        <button
          type="button"
          className="aero-btn aero-btn-sky"
          onClick={() => selectedCert && setViewDialogCert(selectedCert)}
          style={{ fontSize: '11px', padding: '3px 12px' }}
          disabled={!selectedCert}
        >
          View Selected Certificate...
        </button>
      </div>

      {query && (
        <div style={{ background: '#e1f5fe', border: '1px solid #81d4fa', padding: '5px 12px', fontSize: '11.5px', color: '#0277bd', borderRadius: 2 }}>
          Filtering credentials by: <strong>"{query}"</strong> ({filteredCerts.length} results)
        </div>
      )}

      {/* ── Certificates Table View: Credential Name FIRST ── */}
      <div style={{ background: '#ffffff', border: '1px solid #b8c9d9', borderRadius: 2, flex: 1, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(180deg, #f7f9fb 0%, #e9eff5 100%)', borderBottom: '1px solid #b8c9d9', userSelect: 'none' }}>
              <th style={{ padding: '7px 10px', textAlign: 'left', color: '#1e395b' }}>Certification Name</th>
              <th style={{ padding: '7px 10px', textAlign: 'left', color: '#1e395b', width: 220 }}>Issuing Authority</th>
              <th style={{ padding: '7px 10px', textAlign: 'left', color: '#1e395b', width: 140 }}>Issued / Valid</th>
              <th style={{ padding: '7px 10px', textAlign: 'left', color: '#1e395b' }}>Scope / Domain</th>
              <th style={{ padding: '7px 10px', textAlign: 'right', color: '#1e395b', width: 90 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCerts.map((c, idx) => {
              const isSelected = selectedCert?.id === c.id;
              return (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCertId(c.id)}
                  className="win7-table-row"
                  style={{
                    borderBottom: '1px solid #f0f4f8',
                    background: isSelected ? '#cce5f8' : idx % 2 === 0 ? '#ffffff' : '#fcfdfe',
                    cursor: 'pointer',
                  }}
                >
                  <td style={{ padding: '7px 10px', fontWeight: 700, color: '#0d47a1', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <VistaIcon id="certificate" size={16} />
                    {c.friendlyName}
                  </td>
                  <td style={{ padding: '7px 10px', color: '#1e395b', fontWeight: 600 }}>
                    {c.issuedBy}
                  </td>
                  <td style={{ padding: '7px 10px', color: '#546e7a' }}>
                    {c.issueDate}
                  </td>
                  <td style={{ padding: '7px 10px', color: '#37474f' }}>
                    {c.purposes}
                  </td>
                  <td style={{ padding: '7px 10px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewDialogCert(c);
                      }}
                      className="aero-btn"
                      style={{ fontSize: '10px', padding: '2px 6px' }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Certificate Summary Banner */}
      {selectedCert && (
        <div style={{ background: '#f5f9fd', border: '1px solid #c2d7eb', padding: '10px 14px', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 700, color: '#0d3a5c', fontSize: '12.5px' }}>
              {selectedCert.friendlyName}
            </div>
            <div style={{ fontSize: '11px', color: '#546e7a', marginTop: 2 }}>
              {selectedCert.description}
            </div>
          </div>
          <button
            type="button"
            className="aero-btn aero-btn-sky"
            onClick={() => setViewDialogCert(selectedCert)}
            style={{ fontSize: '11px', padding: '4px 12px' }}
          >
            Inspect Certificate Properties...
          </button>
        </div>
      )}

      {/* ── Windows Authentic Certificate Dialog (Modal) ── */}
      {viewDialogCert && (
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
          <div className="win7-window" style={{ width: 460, padding: 0 }}>
            <div className="win7-titlebar">
              <span className="win7-title-content">
                <VistaIcon id="certificate" size={16} />
                Certificate: {viewDialogCert.friendlyName}
              </span>
              <button
                type="button"
                className="win7-btn-ctrl win7-btn-close"
                onClick={() => setViewDialogCert(null)}
              >
                ✕
              </button>
            </div>

            <div style={{ background: '#ffffff', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '12px', color: '#1e395b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #e0e0e0', paddingBottom: 10 }}>
                <VistaIcon id="certificate" size={42} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0d3a5c' }}>
                    {viewDialogCert.friendlyName}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#2e7d32', fontWeight: 600 }}>
                    Status: {viewDialogCert.status}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 6 }}>
                <span style={{ color: '#546e7a' }}>Recipient:</span>
                <span style={{ fontWeight: 700 }}>{viewDialogCert.issuedTo}</span>

                <span style={{ color: '#546e7a' }}>Issuing Authority:</span>
                <span style={{ fontWeight: 600 }}>{viewDialogCert.issuedBy}</span>

                <span style={{ color: '#546e7a' }}>Issue Date:</span>
                <span>{viewDialogCert.issueDate}</span>

                <span style={{ color: '#546e7a' }}>Expiration Date:</span>
                <span>{viewDialogCert.expirationDate}</span>

                <span style={{ color: '#546e7a' }}>Serial Number:</span>
                <span style={{ fontFamily: 'Consolas, monospace', fontSize: '11px' }}>{viewDialogCert.serialNumber}</span>

                <span style={{ color: '#546e7a' }}>SHA1 Thumbprint:</span>
                <span style={{ fontFamily: 'Consolas, monospace', fontSize: '10px', wordBreak: 'break-all' }}>{viewDialogCert.thumbprint}</span>
              </div>

              <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 8 }}>
                <div style={{ fontWeight: 700, color: '#0d3a5c', marginBottom: 3 }}>Description & Coverage:</div>
                <p style={{ margin: 0, color: '#37474f', lineHeight: 1.5 }}>
                  {viewDialogCert.description}
                </p>
              </div>
            </div>

            <div style={{ background: '#f2f5f9', borderTop: '1px solid #b8c9d9', padding: '8px 14px', display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
              <button
                type="button"
                className="aero-btn aero-btn-sky"
                onClick={() => setViewDialogCert(null)}
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
