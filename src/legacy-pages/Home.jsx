import { useState } from 'react';
import { Link } from 'react-router-dom';
import VistaIcon from '../components/VistaIcon';
const profileImg = '/assets/elyuzar_profile.jpeg';
import { projects } from '../data/projects';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Take the first 3 featured projects
  const featuredProjects = projects.slice(0, 3);

  const navigationShortcuts = [
    { title: 'About Me', desc: 'Background, GPA 3.67, and biography', path: '/about', icon: 'userfolder' },
    { title: 'Technical Skills', desc: 'Programming languages, frameworks, and tools', path: '/skills', icon: 'tool' },
    { title: 'Work Experience', desc: 'Internship at PLN Indonesia Power and campus roles', path: '/experience', icon: 'briefcase' },
    { title: 'Education Records', desc: 'Informatics at UPN Veteran Yogyakarta', path: '/education', icon: 'book' },
    { title: 'Certifications', desc: 'BNSP Web, GEMASTIK, TOEFL 557, IELTS', path: '/certifications', icon: 'certificate' },
    { title: 'Contact & Hire', desc: 'Direct email, phone, and online profiles', path: '/contact', icon: 'mailsend' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* ── Windows 7 "Getting Started" Welcome Banner ── */}
      <div
        style={{
          background: 'linear-gradient(180deg, #186cb4 0%, #1f82d2 45%, #0d5aa0 50%, #1168b5 100%)',
          border: '1px solid #0a3d6d',
          borderRadius: 2,
          padding: '16px 20px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 2px 4px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="win7-avatar-frame" style={{ width: 62, height: 62, flexShrink: 0 }}>
            <div className="win7-avatar-inner" style={{ width: '100%', height: '100%' }}>
              <img src={profileImg} alt="Elyuzar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 3px', color: '#ffffff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)' }}>
              Elyuzar Fazlurrahman
            </h1>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#e1f5fe', lineHeight: 1.4 }}>
              Computer Science Student · Backend Engineer · Mobile Developer (Flutter & FastAPI)
            </p>
            <div style={{ fontSize: '11px', color: '#b3e5fc', marginTop: 3 }}>
              UPN Veteran Yogyakarta · Informatics Class of 2023 · GPA 3.67
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link to="/projects" className="aero-btn aero-btn-sky" style={{ fontSize: '11.5px', padding: '5px 14px' }}>
            Browse Projects
          </Link>
          <a
            href="./assets/Elyuzar_CV.pdf"
            download
            className="aero-btn"
            style={{ fontSize: '11.5px', padding: '5px 14px' }}
          >
            <VistaIcon id="document" size={14} />
            Download CV (PDF)
          </a>
          <Link to="/contact" className="aero-btn" style={{ fontSize: '11.5px', padding: '5px 14px' }}>
            Contact Info
          </Link>
        </div>
      </div>

      {/* ── Friendly Orientation Notice for Visitors ── */}
      <div
        style={{
          background: '#f2f8fd',
          border: '1px solid #b2d5ed',
          borderRadius: 2,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: '12px',
          color: '#154360',
        }}
      >
        <VistaIcon id="info" size={24} />
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.45 }}>
          <strong>Welcome to my portfolio!</strong> Built inside an interactive Windows 7 Aero workspace. Every section is a real page. You can click any featured project below, use the top menu bar, or navigate via the left Explorer pane.
        </div>
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="lg:grid-cols-[1.55fr_1fr]">
        {/* Left Column: Featured Projects & Tech Stack Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Featured Projects Box */}
          <div className="win7-groupbox" style={{ margin: 0 }}>
            <span className="win7-groupbox-legend">Featured Projects</span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {featuredProjects.map((p) => (
                <div
                  key={p.slug}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #c2d7eb',
                    borderRadius: 3,
                    padding: '12px',
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    boxShadow: '0 2px 6px rgba(10, 40, 70, 0.05)',
                  }}
                >
                  {p.image ? (
                    <div
                      style={{
                        width: 58,
                        height: 82,
                        borderRadius: 10,
                        overflow: 'hidden',
                        border: '1.5px solid #89b3d9',
                        boxShadow: '0 4px 12px rgba(10, 40, 70, 0.2)',
                        flexShrink: 0,
                        backgroundColor: '#0a1017',
                        position: 'relative',
                      }}
                      title="Real project screenshot"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 60%)',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>
                  ) : (
                    <VistaIcon id={p.sprite} size={40} />
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                      <Link
                        to={`/projects/${p.slug}`}
                        style={{ fontSize: '13.5px', fontWeight: 700, color: '#0d47a1', textDecoration: 'none' }}
                        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                      >
                        {p.title}
                      </Link>
                      <span style={{ fontSize: '10.5px', color: '#78909c' }}>
                        {p.year} · {p.type}
                      </span>
                    </div>

                    <div style={{ fontSize: '11.5px', color: '#0288d1', fontWeight: 600, marginTop: 1, marginBottom: 3 }}>
                      {p.subtitle} · <span style={{ color: '#37474f' }}>{p.role}</span>
                    </div>

                    {p.highlightMetric && (
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#01579b',
                          background: '#f0f9ff',
                          border: '1px solid #b3e5fc',
                          borderRadius: 3,
                          padding: '2px 7px',
                          marginBottom: 5,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c853' }} />
                        {p.highlightMetric}
                      </div>
                    )}

                    <p style={{ margin: '0 0 8px', fontSize: '11.5px', color: '#37474f', lineHeight: 1.45 }}>
                      {p.summary}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {p.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="skill-orb"
                            style={{ fontSize: '10px', padding: '1px 6px', background: '#f5f5f5', color: '#455a64' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 6 }}>
                        <Link
                          to={`/projects/${p.slug}`}
                          className="aero-btn aero-btn-sky"
                          style={{ fontSize: '11px', padding: '3px 10px' }}
                        >
                          Interactive View
                        </Link>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aero-btn"
                          style={{ fontSize: '11px', padding: '3px 10px', textDecoration: 'none' }}
                        >
                          GitHub ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ textAlign: 'center', paddingTop: 4 }}>
                <Link to="/projects" className="aero-btn" style={{ fontSize: '11.5px', padding: '4px 16px' }}>
                  View All Projects in Windows Explorer ›
                </Link>
              </div>
            </div>
          </div>

          {/* Primary Technical Stack Badge Strip */}
          <div className="win7-groupbox" style={{ margin: 0 }}>
            <span className="win7-groupbox-legend">Primary Technology Stack</span>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { name: 'Python', role: 'FastAPI & Data' },
                { name: 'FastAPI', role: 'Async REST APIs' },
                { name: 'Flutter', role: 'Cross-Platform Mobile' },
                { name: 'Redis', role: 'Caching & Queues' },
                { name: 'JavaScript', role: 'Bun.js & React' },
                { name: 'PostgreSQL / SQL', role: 'Relational Schemas' },
                { name: 'Linux & VPS', role: 'Server Hosting' },
                { name: 'Git & GitHub', role: 'Version Control' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    background: 'linear-gradient(180deg, #f7fafd 0%, #e6eff8 100%)',
                    border: '1px solid #b8d2ea',
                    borderRadius: 2,
                    padding: '4px 8px',
                    fontSize: '11px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span style={{ fontWeight: 700, color: '#0d47a1' }}>{tech.name}</span>
                  <span style={{ fontSize: '9.5px', color: '#546e7a' }}>{tech.role}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 8, fontSize: '11px', color: '#546e7a' }}>
              Want to see full proficiency levels and tools? Open the <Link to="/skills" style={{ color: '#0288d1', fontWeight: 600 }}>Control Panel (Skills)</Link>.
            </div>
          </div>
        </div>

        {/* Right Column: Quick Navigation Tasks + Sticky Note + Player */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Quick Page Directory */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #a6bfd5',
              borderRadius: 2,
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(180deg, #f7fafd 0%, #ebf2f8 100%)',
                borderBottom: '1px solid #d2e0ed',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#0d3a5c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Portfolio Sections Directory</span>
              <span style={{ fontWeight: 400, color: '#607d8b' }}>Direct links</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {navigationShortcuts.map((task, i) => (
                <Link
                  key={task.path}
                  to={task.path}
                  className="win7-task-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px',
                    textDecoration: 'none',
                    borderBottom: i < navigationShortcuts.length - 1 ? '1px solid #f0f4f8' : 'none',
                    transition: 'background 0.12s ease',
                  }}
                >
                  <VistaIcon id={task.icon} size={24} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#0d47a1', marginBottom: 1 }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#546e7a', lineHeight: 1.3 }}>
                      {task.desc}
                    </div>
                  </div>
                  <span style={{ color: '#0288d1', fontSize: '13px', fontWeight: 700 }}>›</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Windows 7 Sticky Note Gadget ── */}
          <div
            style={{
              background: 'linear-gradient(180deg, #fff9a6 0%, #fff275 100%)',
              border: '1px solid #e6d944',
              borderRadius: 2,
              padding: '12px 14px',
              boxShadow: '2px 3px 8px rgba(0, 0, 0, 0.18)',
              color: '#3e2723',
            }}
          >
            <div
              style={{
                height: 14,
                background: 'rgba(0, 0, 0, 0.05)',
                margin: '-12px -14px 10px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px',
                fontSize: '9.5px',
                color: '#8d6e63',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              <span>Developer Sticky Note</span>
              <span>March 2026</span>
            </div>

            <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: 6, color: '#1b5e20' }}>
              Academic & Engineering Status:
            </div>

            <p style={{ margin: '0 0 8px', fontSize: '11.5px', lineHeight: 1.5 }}>
              Currently in the 6th semester of Informatics at UPN Veteran Yogyakarta. GPA: <strong>3.67 / 4.00</strong>.
            </p>

            <p style={{ margin: '0 0 8px', fontSize: '11.5px', lineHeight: 1.5 }}>
              Recent internship: Built an automated solar plant telemetry scraper in Bun.js + Playwright for PLN Indonesia Power. The Redis buffer eliminated manual portal logins completely.
            </p>

            <div style={{ borderTop: '1px dashed #d4c538', paddingTop: 6, fontSize: '10.5px', color: '#5d4037' }}>
              Available for software engineering internships and freelance work.
            </div>
          </div>

          {/* ── Windows Media Player Mini Strip ── */}
          <div
            style={{
              background: 'linear-gradient(180deg, #2b3942 0%, #182228 100%)',
              border: '1px solid #10171b',
              borderRadius: 2,
              padding: '10px 12px',
              color: '#ffffff',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 2px 6px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <VistaIcon id="film" size={16} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#e0f2fe' }}>
                  Windows Media Player
                </span>
              </div>
              <span style={{ fontSize: '10px', color: '#90a4ae' }}>
                {isPlaying ? 'Playing' : 'Stopped'}
              </span>
            </div>

            {/* Simulated spectrum visualizer */}
            <div
              style={{
                height: 24,
                background: '#090d0f',
                border: '1px solid #1e282f',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 3,
                padding: '2px 6px',
                marginBottom: 8,
              }}
            >
              {[18, 24, 12, 28, 16, 22, 10, 26, 14, 20, 8, 25, 17, 23].map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 5,
                    height: isPlaying ? `${Math.max(4, h * (idx % 2 === 0 ? 1.1 : 0.8))}px` : '4px',
                    background: 'linear-gradient(180deg, #00e5ff 0%, #00b0ff 50%, #2979ff 100%)',
                    borderRadius: 1,
                    transition: 'height 0.18s ease',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="aero-btn"
                  style={{ padding: '2px 10px', fontSize: '10px' }}
                >
                  {isPlaying ? '❚❚ Pause' : '▶ Play'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="aero-btn"
                  style={{ padding: '2px 8px', fontSize: '10px' }}
                >
                  {isMuted ? 'Muted' : 'Sound On'}
                </button>
              </div>

              <span style={{ fontSize: '10px', color: '#78909c' }}>Frutiger Aero Ambient</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
