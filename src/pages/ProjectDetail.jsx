import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VistaIcon from '../components/VistaIcon';
import AeroDeviceFrame from '../components/aero/AeroDeviceFrame';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'tech' | 'links' | 'details'
  const [copied, setCopied] = useState(false);

  const project = projects.find((p) => p.slug === slug) || projects[0];

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone ${project.github}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ── Dialog Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #c2d7eb', paddingBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <VistaIcon id={project.sprite} size={28} />
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0d3a5c' }}>
              {project.title} · Interactive Properties
            </h1>
            <span style={{ fontSize: '11px', color: '#546e7a' }}>
              {project.subtitle} · {project.role}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="aero-btn"
          onClick={() => navigate('/projects')}
          style={{ fontSize: '11px', padding: '3px 10px' }}
        >
          ← Back to Projects Folder
        </button>
      </div>

      {/* ── Highlight Metric Banner ── */}
      {project.highlightMetric && (
        <div
          style={{
            background: 'linear-gradient(180deg, #e1f5fe 0%, #b3e5fc 100%)',
            border: '1px solid #81d4fa',
            borderRadius: 3,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#01579b',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e676' }} />
            <strong>Key Architecture Result:</strong> {project.highlightMetric}
          </div>
          <span style={{ fontSize: '10.5px', color: '#0277bd', fontWeight: 600 }}>
            {project.year} · {project.type}
          </span>
        </div>
      )}

      {/* ── Main Two-Column Showcase Area ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: project.hasRealScreenshot ? 'minmax(260px, 300px) 1fr' : '1fr',
          gap: 16,
          alignItems: 'start',
        }}
      >
        {/* Left Column: Device Frame with Real Screenshot (or embedded simulator) */}
        {project.hasRealScreenshot ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AeroDeviceFrame project={project} mode="detail" />
          </div>
        ) : (
          <div style={{ marginBottom: 4 }}>
            <AeroDeviceFrame project={project} mode="detail" />
          </div>
        )}

        {/* Right Column: Tabbed Information */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Tab Control Bar */}
          <div className="win7-tab-strip" style={{ display: 'flex', gap: 2, borderBottom: '1px solid #94b2d1', userSelect: 'none' }}>
            {[
              { id: 'overview', label: 'Overview & Summary' },
              { id: 'tech', label: 'Technical Stack' },
              { id: 'links', label: 'Code & GitHub Repository' },
              { id: 'details', label: 'Engineering Narrative' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? '#0d47a1' : '#37474f',
                  background: activeTab === tab.id ? '#ffffff' : 'linear-gradient(180deg, #f2f7fc 0%, #e1eefa 100%)',
                  border: '1px solid #94b2d1',
                  borderBottom: activeTab === tab.id ? '1px solid #ffffff' : '1px solid #94b2d1',
                  borderRadius: '3px 3px 0 0',
                  marginBottom: -1,
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Pane */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #94b2d1',
              borderTop: 'none',
              padding: '16px',
              minHeight: 320,
              fontSize: '12px',
              color: '#1e395b',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
            }}
          >
            {/* TAB 1: Overview & Summary */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #eef3f8', paddingBottom: 10 }}>
                  <VistaIcon id={project.sprite} size={36} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#0d3a5c' }}>{project.title}</div>
                    <div style={{ color: '#0288d1', fontSize: '12px', fontWeight: 600 }}>{project.subtitle}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 6, fontSize: '11.5px' }}>
                  <span style={{ color: '#546e7a', fontWeight: 600 }}>Project Type:</span>
                  <span style={{ fontWeight: 600 }}>{project.type} ({project.year})</span>

                  <span style={{ color: '#546e7a', fontWeight: 600 }}>Role in Project:</span>
                  <span style={{ color: '#0d47a1', fontWeight: 700 }}>{project.role}</span>

                  <span style={{ color: '#546e7a', fontWeight: 600 }}>System Location:</span>
                  <span style={{ wordBreak: 'break-all', fontFamily: 'Consolas, monospace', fontSize: '10.5px' }}>{project.generalInfo.location}</span>
                </div>

                <div style={{ borderTop: '1px solid #eef3f8', paddingTop: 10 }}>
                  <div style={{ fontWeight: 700, color: '#0d3a5c', marginBottom: 4 }}>What this project does:</div>
                  <p style={{ margin: 0, lineHeight: 1.6, color: '#37474f' }}>
                    {project.summary}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="skill-orb"
                      style={{ fontSize: '10.5px', padding: '2px 8px', background: '#e3f2fd', color: '#0d47a1', border: '1px solid #90caf9' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Technical Stack */}
            {activeTab === 'tech' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontWeight: 700, color: '#0d3a5c' }}>
                  Architecture & Component Specifications:
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                  <tbody>
                    {project.techDetails.map((t, idx) => (
                      <tr key={t.key} style={{ borderBottom: '1px solid #f0f4f8', background: idx % 2 === 0 ? '#ffffff' : '#fcfdfe' }}>
                        <td style={{ padding: '7px 8px', fontWeight: 700, color: '#0d47a1', width: 140 }}>
                          {t.key}
                        </td>
                        <td style={{ padding: '7px 8px', color: '#37474f' }}>
                          {t.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: Code & GitHub Repository */}
            {activeTab === 'links' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0d3a5c', marginBottom: 4 }}>
                    GitHub Repository:
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0288d1', wordBreak: 'break-all', fontWeight: 600, fontSize: '12.5px' }}
                  >
                    {project.github} ↗
                  </a>
                </div>

                <div>
                  <div style={{ fontWeight: 700, color: '#0d3a5c', marginBottom: 4 }}>
                    Clone Repository with Git CLI:
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input
                      type="text"
                      readOnly
                      value={`git clone ${project.github}`}
                      className="aero-input"
                      style={{ fontFamily: 'Consolas, monospace', fontSize: '11px', background: '#f5f5f5' }}
                    />
                    <button
                      type="button"
                      onClick={handleCopyClone}
                      className="aero-btn"
                      style={{ padding: '4px 12px', fontSize: '11px', flexShrink: 0 }}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aero-btn aero-btn-sky"
                    style={{ padding: '6px 14px', fontSize: '11.5px', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
                  >
                    <VistaIcon id="earth" size={16} />
                    Open Source Code on GitHub ↗
                  </a>
                </div>
              </div>
            )}

            {/* TAB 4: Engineering Narrative */}
            {activeTab === 'details' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontWeight: 700, color: '#0d3a5c' }}>
                  Engineering Narrative & Problem-Solving Case Study:
                </div>
                <div style={{ whiteSpace: 'pre-line', lineHeight: 1.65, color: '#37474f', fontSize: '11.5px' }}>
                  {project.detailsText}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Dialog Action Buttons (OK / Cancel) ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
        <button
          type="button"
          className="aero-btn aero-btn-sky"
          onClick={() => navigate('/projects')}
          style={{ minWidth: 80, fontSize: '11.5px' }}
        >
          OK
        </button>
        <button
          type="button"
          className="aero-btn"
          onClick={() => navigate('/projects')}
          style={{ minWidth: 80, fontSize: '11.5px' }}
        >
          Back to Folder
        </button>
      </div>
    </div>
  );
}
