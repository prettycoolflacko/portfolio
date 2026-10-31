import { useState } from 'react';
import { Link } from 'react-router-dom';
import VistaIcon from '../components/VistaIcon';
import { systemInfo } from '../data/systemInfo';
import profileImg from '../assets/profile.webp';

export default function About() {
  const [showSettingsNotice, setShowSettingsNotice] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* ── System Properties Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #c2d7eb', paddingBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <VistaIcon id="computer" size={32} />
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#0d3a5c' }}>
              About Me · Developer Profile & System Properties
            </h1>
            <span style={{ fontSize: '11px', color: '#546e7a' }}>
              System Properties · Elyuzar Fazlurrahman (UPN Veteran Yogyakarta)
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
          Download Resume (PDF)
        </a>
      </div>

      {/* ── Section 1: Developer Biography & Portrait ── */}
      <div className="win7-groupbox" style={{ margin: 0 }}>
        <span className="win7-groupbox-legend">Developer Biography</span>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }} className="flex-col sm:flex-row">
          <div className="win7-avatar-frame" style={{ flexShrink: 0, alignSelf: 'center' }}>
            <div className="win7-avatar-inner" style={{ width: 110, height: 110 }}>
              <img
                src={profileImg}
                alt="Elyuzar Fazlurrahman"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0, fontSize: '12px', color: '#1e395b', lineHeight: 1.6 }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0d3a5c', margin: '0 0 2px' }}>
              Elyuzar Fazlurrahman
            </h2>
            <div style={{ color: '#0288d1', fontWeight: 600, fontSize: '12px', marginBottom: 8 }}>
              Computer Science Student · Backend Engineer · Mobile Developer
            </div>

            <p style={{ margin: '0 0 8px' }}>
              I am a 3rd-year Informatics (Computer Science) student at <strong>UPN Veteran Yogyakarta</strong> with a <strong>3.67 cumulative GPA</strong>. My core technical focus is building high-throughput backend services, cross-platform mobile apps in Flutter, and automated data telemetry pipelines.
            </p>

            <p style={{ margin: '0 0 10px' }}>
              I have practical experience building production systems, including an automated solar power plant scraper for PLN Indonesia Power that removed manual hourly portal checks, an end-to-end encrypted messaging service on a Linux VPS, and a multi-criteria financial decision app integrating LLM inference.
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Link to="/projects" className="aero-btn aero-btn-sky" style={{ fontSize: '11px', padding: '3px 10px' }}>
                View Projects Portfolio
              </Link>
              <Link to="/contact" className="aero-btn" style={{ fontSize: '11px', padding: '3px 10px' }}>
                Contact & Hire Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Core Academic & Personal Facts (System Specifications) ── */}
      <div className="win7-groupbox" style={{ margin: 0 }}>
        <span className="win7-groupbox-legend">Basic Information & Academic Specs</span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, fontSize: '12px' }} className="sm:grid-cols-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 6 }}>
              <span style={{ color: '#546e7a', fontWeight: 600 }}>University:</span>
              <span style={{ fontWeight: 600, color: '#1e395b' }}>UPN Veteran Yogyakarta</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 6 }}>
              <span style={{ color: '#546e7a', fontWeight: 600 }}>Degree & Major:</span>
              <span style={{ color: '#1e395b' }}>B.CS in Informatics (Class of 2023)</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 6 }}>
              <span style={{ color: '#546e7a', fontWeight: 600 }}>Academic Standing:</span>
              <span style={{ fontWeight: 700, color: '#0d47a1' }}>6th Semester · GPA 3.67 / 4.00</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 6 }}>
              <span style={{ color: '#546e7a', fontWeight: 600 }}>Location:</span>
              <span style={{ color: '#1e395b' }}>Yogyakarta, Indonesia</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 6 }}>
              <span style={{ color: '#546e7a', fontWeight: 600 }}>English Proficiency:</span>
              <span style={{ color: '#1e395b' }}>TOEFL ITP 557 · IELTS Prep Band 7.0</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 6 }}>
              <span style={{ color: '#546e7a', fontWeight: 600 }}>Status & Availability:</span>
              <span style={{ fontWeight: 700, color: '#2e7d32' }}>Available for Internships & Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Technical Skills Assessment (Windows Experience Index Benchmark) ── */}
      <div className="win7-groupbox" style={{ margin: 0 }}>
        <span className="win7-groupbox-legend">Technical Competency Assessment (Windows 7 Benchmark Style)</span>

        {/* Friendly explanation so anyone understands what the WEI is */}
        <div style={{ background: '#eef6fc', border: '1px solid #b8d7ee', borderRadius: 2, padding: '8px 12px', fontSize: '11.5px', color: '#1a4e72', marginBottom: 12, lineHeight: 1.45 }}>
          <strong>What is the Windows Experience Index?</strong> In Windows 7, computers were graded on a benchmark scale from <strong>1.0 to 7.9</strong>. Below is my software engineering competency mapped to that classic benchmark, showing the practical stack behind each score:
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }} className="md:grid-cols-[1fr_190px]">
          {/* Table of subscores */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
            <thead>
              <tr style={{ background: '#f0f5fa', borderBottom: '1px solid #c2d7eb', textAlign: 'left', color: '#455a64' }}>
                <th style={{ padding: '5px 8px' }}>Technical Area</th>
                <th style={{ padding: '5px 8px' }}>Proficiency & Tech Stack</th>
                <th style={{ padding: '5px 8px', textAlign: 'right' }}>Win7 Rating</th>
              </tr>
            </thead>
            <tbody>
              {systemInfo.rating.components.map((c, idx) => (
                <tr
                  key={c.component}
                  style={{
                    borderBottom: '1px solid #f0f4f8',
                    background: idx % 2 === 0 ? '#ffffff' : '#fcfdfe',
                  }}
                >
                  <td style={{ padding: '6px 8px', fontWeight: 600, color: '#0d47a1' }}>
                    {c.component}
                  </td>
                  <td style={{ padding: '6px 8px', color: '#37474f' }}>
                    {c.detail}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'right' }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: '#0d47a1',
                        background: '#e3f2fd',
                        border: '1px solid #90caf9',
                        padding: '1px 6px',
                        borderRadius: 2,
                      }}
                    >
                      {c.subscore} / 7.9
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Overall WEI Badge */}
          <div
            style={{
              background: 'linear-gradient(180deg, #f7fafd 0%, #e8f2fa 100%)',
              border: '1px solid #b2c9de',
              borderRadius: 2,
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '10.5px', color: '#546e7a', fontWeight: 700, marginBottom: 6 }}>
              Overall Base Score
            </div>

            <div
              style={{
                width: 56,
                height: 56,
                background: 'linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)',
                color: '#ffffff',
                border: '2px solid #ffffff',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              {systemInfo.rating.baseScore}
            </div>

            <div style={{ fontSize: '10.5px', color: '#0d3a5c', fontWeight: 600 }}>
              Rated out of 7.9
            </div>
            <div style={{ fontSize: '10px', color: '#78909c', marginTop: 2 }}>
              High Proficiency
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: System Workstation & Contact Links ── */}
      <div className="win7-groupbox" style={{ margin: 0 }}>
        <span className="win7-groupbox-legend">Workstation & Online Links</span>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, fontSize: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div>
              <span style={{ color: '#546e7a', fontWeight: 600 }}>Computer / Host:</span>{' '}
              <span style={{ color: '#1e395b' }}>{systemInfo.workgroup.fullComputerName}</span>
            </div>
            <div>
              <span style={{ color: '#546e7a', fontWeight: 600 }}>Workgroup:</span>{' '}
              <span style={{ color: '#1e395b' }}>{systemInfo.workgroup.workgroup}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              className="aero-btn"
              onClick={() => setShowSettingsNotice(!showSettingsNotice)}
              style={{ fontSize: '11.5px', padding: '3px 10px' }}
            >
              System Notice...
            </button>
            <Link to="/contact" className="aero-btn aero-btn-sky" style={{ fontSize: '11.5px', padding: '3px 12px' }}>
              Get In Touch
            </Link>
          </div>
        </div>

        {showSettingsNotice && (
          <div
            style={{
              marginTop: 10,
              background: '#e8f5e9',
              border: '1px solid #a5d6a7',
              borderRadius: 2,
              padding: '8px 12px',
              fontSize: '11.5px',
              color: '#1b5e20',
            }}
          >
            Elyuzar is open for software engineering internships and freelance project collaborations. You can download his resume or email directly at <strong>elyuzarf@gmail.com</strong>.
          </div>
        )}
      </div>
    </div>
  );
}
