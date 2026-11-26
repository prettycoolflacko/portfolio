import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import VistaIcon from '../components/VistaIcon';
import AeroDeviceFrame from '../components/aero/AeroDeviceFrame';
import { projects } from '../data/projects';

export default function Projects() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase().trim();

  const [selectedSlug, setSelectedSlug] = useState(projects[0].slug);
  const [showPreviewPane, setShowPreviewPane] = useState(true);
  const [viewMode, setViewMode] = useState('content'); // 'content' | 'details' | 'icons'

  // Alt+P shortcut to toggle preview pane
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setShowPreviewPane((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects = useMemo(() => {
    if (!query) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query)) ||
        p.summary?.toLowerCase().includes(query)
    );
  }, [query]);

  const selectedProject = useMemo(() => {
    return filteredProjects.find((p) => p.slug === selectedSlug) || filteredProjects[0] || null;
  }, [filteredProjects, selectedSlug]);

  const handleOpenDetail = (slug) => {
    navigate(`/projects/${slug}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10 }}>
      {/* ── Explorer Folder Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #c2d7eb', paddingBottom: 6, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <VistaIcon id="folder" size={26} />
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0d3a5c' }}>
              Software Engineering Projects
            </h1>
            <span style={{ fontSize: '11px', color: '#546e7a' }}>
              C:\Users\Elyuzar\Projects · {filteredProjects.length} engineering projects cataloged
            </span>
          </div>
        </div>

        {/* View mode buttons & Preview Pane toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11px' }}>
          <span style={{ color: '#546e7a' }}>Layout:</span>
          <button
            type="button"
            className={`aero-btn${viewMode === 'content' ? ' aero-btn-sky' : ''}`}
            onClick={() => setViewMode('content')}
            style={{ padding: '2px 8px', fontSize: '11px' }}
            title="Content View (Recommended)"
          >
            Cards View
          </button>
          <button
            type="button"
            className={`aero-btn${viewMode === 'details' ? ' aero-btn-sky' : ''}`}
            onClick={() => setViewMode('details')}
            style={{ padding: '2px 8px', fontSize: '11px' }}
            title="Details Table View"
          >
            Table View
          </button>
          <button
            type="button"
            className={`aero-btn${viewMode === 'icons' ? ' aero-btn-sky' : ''}`}
            onClick={() => setViewMode('icons')}
            style={{ padding: '2px 8px', fontSize: '11px' }}
            title="Large Icons View"
          >
            Icons
          </button>

          <span style={{ height: 14, width: 1, background: '#c2d7eb', margin: '0 2px' }} />

          <button
            type="button"
            className={`aero-btn${showPreviewPane ? ' aero-btn-sky' : ''}`}
            onClick={() => setShowPreviewPane(!showPreviewPane)}
            style={{ padding: '2px 8px', fontSize: '11px' }}
            title="Toggle Preview Pane (Alt+P)"
          >
            {showPreviewPane ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
      </div>

      {query && (
        <div style={{ background: '#e1f5fe', border: '1px solid #81d4fa', padding: '4px 10px', fontSize: '11.5px', color: '#0277bd', borderRadius: 2 }}>
          Filtering by keyword: <strong>"{query}"</strong> ({filteredProjects.length} matches)
        </div>
      )}

      {/* ── Main Explorer Workspace Split ── */}
      <div style={{ display: 'grid', gridTemplateColumns: showPreviewPane ? '1fr 300px' : '1fr', gap: 12, flex: 1, minHeight: 0 }}>
        {/* Left: Project Items List */}
        <div style={{ overflowY: 'auto', background: '#ffffff', border: '1px solid #b8c9d9', borderRadius: 2 }}>
          {/* VIEW 1: Content Cards View */}
          {viewMode === 'content' && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredProjects.map((p) => {
                const isSelected = selectedProject?.slug === p.slug;
                return (
                  <div
                    key={p.slug}
                    onClick={() => setSelectedSlug(p.slug)}
                    className={`win7-content-row${isSelected ? ' active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      padding: '14px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eef3f8',
                      background: isSelected ? 'linear-gradient(180deg, #e4effa 0%, #cce5f8 100%)' : 'transparent',
                      borderLeft: isSelected ? '3px solid #1976d2' : '3px solid transparent',
                      transition: 'background 0.12s ease',
                    }}
                  >
                    <VistaIcon id={p.sprite} size={42} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0d47a1', display: 'flex', alignItems: 'center', gap: 6 }}>
                          {p.title}
                          {p.hasRealScreenshot && (
                            <span
                              style={{
                                fontSize: '10px',
                                background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)',
                                color: '#1b5e20',
                                border: '1px solid #81c784',
                                borderRadius: 3,
                                padding: '1px 5px',
                                fontWeight: 700,
                              }}
                            >
                              Live App
                            </span>
                          )}
                        </span>
                        <span style={{ fontSize: '10.5px', color: '#78909c' }}>
                          {p.year} · {p.type}
                        </span>
                      </div>

                      <div style={{ fontSize: '12px', color: '#1e395b', fontWeight: 600, marginTop: 1, marginBottom: 4 }}>
                        {p.subtitle} · <span style={{ color: '#0288d1' }}>{p.role}</span>
                      </div>

                      {/* Highlight metric if present */}
                      {p.highlightMetric && (
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#01579b',
                            background: '#f0f9ff',
                            border: '1px solid #b3e5fc',
                            borderRadius: 3,
                            padding: '3px 8px',
                            marginBottom: 6,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c853' }} />
                          {p.highlightMetric}
                        </div>
                      )}

                      <div style={{ fontSize: '11.5px', color: '#37474f', lineHeight: 1.45, marginBottom: 8 }}>
                        {p.summary}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="skill-orb"
                              style={{ fontSize: '10px', padding: '1px 6px', background: '#f5f5f5', color: '#455a64' }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Direct action buttons */}
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDetail(p.slug);
                            }}
                            className="aero-btn aero-btn-sky"
                            style={{ fontSize: '11px', padding: '3px 10px' }}
                          >
                            Interactive Properties
                          </button>
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="aero-btn"
                            style={{ fontSize: '11px', padding: '3px 10px', textDecoration: 'none' }}
                          >
                            GitHub ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW 2: Details Table View */}
          {viewMode === 'details' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(180deg, #f7f9fb 0%, #e9eff5 100%)', borderBottom: '1px solid #b8c9d9' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', color: '#1e395b' }}>Project Name</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', color: '#1e395b' }}>Project Type</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', color: '#1e395b' }}>Role</th>
                  <th style={{ padding: '6px 10px', textAlign: 'right', color: '#1e395b' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p, idx) => {
                  const isSelected = selectedProject?.slug === p.slug;
                  return (
                    <tr
                      key={p.slug}
                      onClick={() => setSelectedSlug(p.slug)}
                      style={{
                        borderBottom: '1px solid #f0f4f8',
                        background: isSelected ? '#cce5f8' : idx % 2 === 0 ? '#ffffff' : '#fcfdfe',
                        cursor: 'pointer',
                      }}
                    >
                      <td style={{ padding: '6px 10px', fontWeight: 700, color: '#0d47a1', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <VistaIcon id={p.sprite} size={16} />
                        {p.title}
                      </td>
                      <td style={{ padding: '6px 10px', color: '#546e7a' }}>{p.type} ({p.year})</td>
                      <td style={{ padding: '6px 10px', color: '#37474f' }}>{p.role}</td>
                      <td style={{ padding: '6px 10px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(p.slug);
                          }}
                          className="aero-btn aero-btn-sky"
                          style={{ fontSize: '10.5px', padding: '2px 8px' }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* VIEW 3: Extra Large Icons View */}
          {viewMode === 'icons' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, padding: 14 }}>
              {filteredProjects.map((p) => {
                const isSelected = selectedProject?.slug === p.slug;
                return (
                  <div
                    key={p.slug}
                    onClick={() => setSelectedSlug(p.slug)}
                    onDoubleClick={() => handleOpenDetail(p.slug)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: 10,
                      borderRadius: 2,
                      cursor: 'pointer',
                      background: isSelected ? '#cce5f8' : 'transparent',
                      border: `1px solid ${isSelected ? '#99c9ef' : 'transparent'}`,
                    }}
                  >
                    <VistaIcon id={p.sprite} size={50} />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e395b', marginTop: 6 }}>
                      {p.title}
                    </span>
                    <span style={{ fontSize: '10.5px', color: '#78909c' }}>{p.year}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(p.slug);
                      }}
                      className="aero-btn aero-btn-sky"
                      style={{ fontSize: '10px', padding: '2px 6px', marginTop: 6 }}
                    >
                      Open
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Windows Explorer Preview Pane with Live Device Frame or Simulator */}
        {showPreviewPane && selectedProject && (
          <aside
            style={{
              background: 'linear-gradient(180deg, #fbfcfe 0%, #edf3f9 100%)',
              border: '1px solid #b8c9d9',
              borderRadius: 2,
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              fontSize: '11.5px',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #d2e0ed', paddingBottom: 6 }}>
              <span style={{ fontWeight: 700, color: '#0d3a5c', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Explorer Preview Pane
              </span>
              <button
                type="button"
                onClick={() => setShowPreviewPane(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', color: '#78909c' }}
                title="Hide Preview Pane (Alt+P)"
              >
                ✕
              </button>
            </div>

            {/* Embedded Live Screenshot Frame / Interactive Simulator */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
              <AeroDeviceFrame project={selectedProject} mode="compact" />
            </div>

            <div style={{ borderTop: '1px solid #e1ebf5', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontWeight: 700, color: '#0d3a5c', fontSize: '13px' }}>
                {selectedProject.title}
              </div>
              <div><strong>Role:</strong> {selectedProject.role}</div>
              <div><strong>Type:</strong> {selectedProject.type} ({selectedProject.year})</div>
            </div>

            <div style={{ borderTop: '1px solid #e1ebf5', paddingTop: 8 }}>
              <div style={{ fontWeight: 700, color: '#0d3a5c', marginBottom: 4 }}>Architecture Summary:</div>
              <p style={{ margin: 0, color: '#37474f', lineHeight: 1.45, fontSize: '11px' }}>
                {selectedProject.summary}
              </p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 10 }}>
              <button
                type="button"
                className="aero-btn aero-btn-sky"
                onClick={() => handleOpenDetail(selectedProject.slug)}
                style={{ width: '100%', fontSize: '11.5px', padding: '6px 10px' }}
              >
                Open Full Technical Properties
              </button>

              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="aero-btn"
                style={{ width: '100%', fontSize: '11px', padding: '5px 10px', textAlign: 'center', textDecoration: 'none' }}
              >
                Open GitHub Repository ↗
              </a>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
