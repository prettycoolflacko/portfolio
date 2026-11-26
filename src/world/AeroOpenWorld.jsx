import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiCheck,
  FiCopy,
} from 'react-icons/fi';

import AeroWorldBackground from './AeroWorldBackground';
import AeroWorldNav from './AeroWorldNav';
import RefractiveAeroOrb from './RefractiveAeroOrb';
import InteractiveBubbleField from '../components/aero/InteractiveBubbleField';
import AeroProjectLab from '../components/aero/AeroProjectLab';
import AeroSkillsStation from '../components/aero/AeroSkillsStation';
import VistaIcon from '../components/VistaIcon';

import profileImg from '../assets/profile.webp';
import { projects } from '../data/projects';
import { playBubblePop, playChime } from '../utils/audio';

/**
 * Frutiger Aero Open World Edition
 * Designed for conversion per interactive-portfolio:
 * - 30-Second test: Identity, capabilities, flagship case studies, and fast contact
 * - Interactive engineering simulators for offline sync, AHP-TOPSIS weighting, PLTS telemetry, and AES streaming
 * - Translucent acrylic glass panels with refractive specular highlights
 * - Zero AI slop: no middle-dot meta strings, no glued arrows, no fake forms, honest metrics
 */
export default function AeroOpenWorld() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('elyuzar.fazlurrahman@gmail.com');
    setCopiedEmail(true);
    playChime();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollTo = (id) => {
    playBubblePop(520);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        color: 'var(--color-ink)',
        overflowX: 'clip',
      }}
    >
      {/* Dynamic atmospheric horizon */}
      <AeroWorldBackground />

      {/* Living interactive floating bubbles with pop mechanics */}
      <InteractiveBubbleField />

      {/* Floating glass navigation bar */}
      <AeroWorldNav />

      <main style={{ position: 'relative', zIndex: 'var(--z-base)', paddingTop: 'var(--space-3xl)' }}>
        {/* ══════════════════════════════════════════════════════════
            HERO (STRATOSPHERE)
            Engineered for the 30-second test: headline, value prop,
            interactive orb, and direct CTAs all above the fold
        ══════════════════════════════════════════════════════════ */}
        <section
          id="hero"
          style={{
            minHeight: 'calc(100vh - var(--space-3xl))',
            display: 'flex',
            alignItems: 'center',
            padding: 'var(--space-xl) var(--gutter)',
            maxWidth: 'var(--container)',
            marginInline: 'auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-xl)',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Left Column: Identity & Proposition */}
            <div>
              <div style={{ marginBottom: 'var(--space-sm)' }}>
                <span className="aero-pill aero-pill-accent">
                  Informatics 2023 (GPA 3.67) at UPN Veteran Yogyakarta
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'var(--text-display)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: 'var(--tracking-display)',
                  margin: '0 0 var(--space-sm)',
                  color: 'var(--color-ink)',
                }}
              >
                Elyuzar Fazlurrahman
              </h1>

              <p
                style={{
                  fontSize: 'var(--text-lead)',
                  color: 'var(--color-ink-2)',
                  maxWidth: '50ch',
                  margin: '0 0 var(--space-md)',
                  lineHeight: 1.45,
                }}
              >
                Distributed Python backends with FastAPI and offline-first mobile clients in Flutter.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
                <span className="aero-pill">
                  Ex-Intern at PLN Indonesia Power
                </span>
                <span className="aero-pill">
                  Finalist GEMASTIK XVII Data Mining
                </span>
              </div>

              {/* Main Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  flexWrap: 'wrap',
                  marginBottom: 'var(--space-lg)',
                }}
              >
                <button
                  type="button"
                  onClick={() => scrollTo('projects')}
                  className="aero-btn aero-btn-primary"
                  style={{ padding: 'var(--space-xs) var(--space-md)' }}
                >
                  <span>Explore project lab</span>
                </button>

                <a
                  href="./assets/Elyuzar_CV.pdf"
                  download
                  className="aero-btn"
                  style={{ padding: 'var(--space-xs) var(--space-md)' }}
                >
                  <FiDownload size={15} />
                  <span>Download CV (PDF)</span>
                </a>

                <Link
                  to="/os"
                  className="aero-btn"
                  title="Launch Windows 7 desktop shell"
                  style={{ padding: 'var(--space-xs) var(--space-md)' }}
                >
                  <VistaIcon id="computer" size={15} />
                  <span>Desktop shell</span>
                </Link>
              </div>

              {/* Quick Jump Shortcuts */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', flexWrap: 'wrap', fontSize: 'var(--text-xs)' }}>
                <span style={{ color: 'var(--color-muted)', fontWeight: 600 }}>Quick jump:</span>
                <button
                  type="button"
                  onClick={() => scrollTo('project-eventsync')}
                  className="aero-pill"
                  style={{ cursor: 'pointer' }}
                >
                  EventSync Mobile
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('project-finapp')}
                  className="aero-pill"
                  style={{ cursor: 'pointer' }}
                >
                  FinApp Engine
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('project-plts')}
                  className="aero-pill"
                  style={{ cursor: 'pointer' }}
                >
                  PLTS Telemetry
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('project-cipherdrop')}
                  className="aero-pill"
                  style={{ cursor: 'pointer' }}
                >
                  CipherDrop Vault
                </button>
              </div>
            </div>

            {/* Right Column: Signature Refractive Aero Orb */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <RefractiveAeroOrb />

              <div
                className="aero-panel"
                style={{
                  marginTop: 'var(--space-md)',
                  padding: 'var(--space-xs) var(--space-md)',
                  borderRadius: 'var(--radius-pill)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-ink-2)',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--color-success)',
                    boxShadow: '0 0 6px var(--color-success)',
                    display: 'inline-block',
                  }}
                />
                <span>Available for engineering roles and internships</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            ABOUT (THE ENGINEER)
        ══════════════════════════════════════════════════════════ */}
        <section
          id="about"
          style={{
            padding: 'var(--section-gap) var(--gutter)',
            maxWidth: 'var(--container)',
            marginInline: 'auto',
          }}
        >
          <div className="aero-panel aero-panel-sheen">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 260px) minmax(0, 1fr)',
                gap: 'var(--gap-columns)',
                alignItems: 'center',
              }}
              className="about-card-grid"
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div
                  style={{
                    width: 170,
                    height: 170,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: 'var(--glass-shadow)',
                    border: '3px solid rgba(255,255,255,0.85)',
                  }}
                >
                  <img
                    src={profileImg}
                    alt="Elyuzar Fazlurrahman"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ marginTop: 'var(--space-xs)', fontSize: 'var(--text-sm)', color: 'var(--color-ink)', fontWeight: 600 }}>
                  Elyuzar Fazlurrahman
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
                  Yogyakarta, Indonesia
                </div>
              </div>

              <div>
                <h2
                  style={{
                    fontSize: 'var(--text-section)',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    margin: '0 0 var(--space-sm)',
                    color: 'var(--color-ink)',
                  }}
                >
                  Engineered for reliability under real constraints
                </h2>

                <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--color-ink-2)', margin: '0 0 var(--space-md)' }}>
                  Sixth-semester Informatics undergraduate at UPN Veteran Yogyakarta maintaining a 3.67 cumulative GPA. I focus on distributed systems architecture: designing asynchronous Python microservices with FastAPI and Redis, structuring normalized relational schemas, and developing cross-platform Flutter clients with offline-first synchronization.
                </p>

                <p style={{ fontSize: 'var(--text-md)', lineHeight: 1.6, color: 'var(--color-ink-2)', margin: '0 0 var(--space-md)' }}>
                  During my software engineering internship at PLN Indonesia Power Head Office, I engineered an automated telemetry extraction pipeline for solar power plants using Playwright and Redis, eliminating manual hourly staff logins across distributed inverter arrays.
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
                  <span className="aero-pill">FastAPI asynchronous services</span>
                  <span className="aero-pill">Flutter cross-platform clients</span>
                  <span className="aero-pill">Redis telemetry caching</span>
                  <span className="aero-pill">Automated data scrapers</span>
                  <span className="aero-pill">Linux server administration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PROJECTS (INTERACTIVE ENGINEERING LAB)
        ══════════════════════════════════════════════════════════ */}
        <section
          id="projects"
          style={{
            padding: 'var(--section-gap) var(--gutter)',
            maxWidth: 'var(--container)',
            marginInline: 'auto',
          }}
        >
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h2
              style={{
                fontSize: 'var(--text-section)',
                fontWeight: 800,
                lineHeight: 1.2,
                margin: '0 0 var(--space-xs)',
                color: 'var(--color-ink)',
              }}
            >
              Interactive Engineering Lab
            </h2>
            <p style={{ color: 'var(--color-ink-2)', fontSize: 'var(--text-lead)', margin: 0, maxWidth: '64ch' }}>
              Real production deliverables, research engines, and power systems automation. Test the interactive simulators on each case study below.
            </p>
          </div>

          <AeroProjectLab projects={projects} />
        </section>

        {/* ══════════════════════════════════════════════════════════
            SKILLS (INTERACTIVE TECHNICAL MATRIX)
        ══════════════════════════════════════════════════════════ */}
        <section
          id="skills"
          style={{
            padding: 'var(--section-gap) var(--gutter)',
            maxWidth: 'var(--container)',
            marginInline: 'auto',
          }}
        >
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h2
              style={{
                fontSize: 'var(--text-section)',
                fontWeight: 800,
                lineHeight: 1.2,
                margin: '0 0 var(--space-xs)',
                color: 'var(--color-ink)',
              }}
            >
              Technical Skills Matrix
            </h2>
            <p style={{ color: 'var(--color-ink-2)', fontSize: 'var(--text-lead)', margin: 0 }}>
              Grouped by domain with verified production context across FastAPI backends, Flutter mobile apps, and distributed cloud infrastructure.
            </p>
          </div>

          <AeroSkillsStation />
        </section>

        {/* ══════════════════════════════════════════════════════════
            JOURNEY (FLIGHT LOG)
        ══════════════════════════════════════════════════════════ */}
        <section
          id="journey"
          style={{
            padding: 'var(--section-gap) var(--gutter)',
            maxWidth: 'var(--container)',
            marginInline: 'auto',
          }}
        >
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h2
              style={{
                fontSize: 'var(--text-section)',
                fontWeight: 800,
                lineHeight: 1.2,
                margin: '0 0 var(--space-xs)',
                color: 'var(--color-ink)',
              }}
            >
              Engineering Journey & Credentials
            </h2>
            <p style={{ color: 'var(--color-ink-2)', fontSize: 'var(--text-lead)', margin: 0 }}>
              Verifiable experience across state-owned power generation, university academics, and national competitions.
            </p>
          </div>

          <div
            className="aero-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-lg)',
              padding: 'var(--space-xl)',
            }}
          >
            {/* Timeline item 1 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 160px) minmax(0, 1fr)',
                gap: 'var(--space-md)',
                alignItems: 'baseline',
                borderBottom: 'var(--rule-hair) solid var(--color-rule)',
                paddingBottom: 'var(--space-md)',
              }}
            >
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-accent-ink)' }}>
                Jan 2025 - Feb 2026
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--text-title)', fontWeight: 700, margin: '0 0 4px', color: 'var(--color-ink)' }}>
                  Software Engineering Intern · PLN Indonesia Power Head Office
                </h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)', lineHeight: 1.5 }}>
                  Engineered automated telemetry scraper using Bun.js and Playwright for solar power plants, caching data to Redis with 60-second TTL to eliminate manual staff portal logins.
                </p>
              </div>
            </div>

            {/* Timeline item 2 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 160px) minmax(0, 1fr)',
                gap: 'var(--space-md)',
                alignItems: 'baseline',
                borderBottom: 'var(--rule-hair) solid var(--color-rule)',
                paddingBottom: 'var(--space-md)',
              }}
            >
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-accent-ink)' }}>
                2023 - Present
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--text-title)', fontWeight: 700, margin: '0 0 4px', color: 'var(--color-ink)' }}>
                  Bachelor of Computer Science (Informatics) · UPN Veteran Yogyakarta
                </h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)', lineHeight: 1.5 }}>
                  Cumulative GPA 3.67 out of 4.00 in the sixth semester. Coursework in Distributed Systems, Data Mining, Database Management, Algorithms, and Network Security.
                </p>
              </div>
            </div>

            {/* Timeline item 3 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 160px) minmax(0, 1fr)',
                gap: 'var(--space-md)',
                alignItems: 'baseline',
                borderBottom: 'var(--rule-hair) solid var(--color-rule)',
                paddingBottom: 'var(--space-md)',
              }}
            >
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-accent-ink)' }}>
                2024
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--text-title)', fontWeight: 700, margin: '0 0 4px', color: 'var(--color-ink)' }}>
                  National Finalist · GEMASTIK XVII Data Mining (Puspresnas)
                </h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)', lineHeight: 1.5 }}>
                  Recognized at national level for predictive modeling, exploratory data analysis, and multi-criteria numerical evaluation.
                </p>
              </div>
            </div>

            {/* Timeline item 4 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 160px) minmax(0, 1fr)',
                gap: 'var(--space-md)',
                alignItems: 'baseline',
              }}
            >
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-accent-ink)' }}>
                2024
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--text-title)', fontWeight: 700, margin: '0 0 4px', color: 'var(--color-ink)' }}>
                  BNSP Certified Junior Web Developer
                </h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)', lineHeight: 1.5 }}>
                  National competency standard in web backend scripting, relational databases, and secure API design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CONTACT & CONVERSION (SIGNAL TERMINAL)
        ══════════════════════════════════════════════════════════ */}
        <section
          id="contact"
          style={{
            padding: 'var(--section-gap) var(--gutter)',
            maxWidth: 'var(--container)',
            marginInline: 'auto',
          }}
        >
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h2
              style={{
                fontSize: 'var(--text-section)',
                fontWeight: 800,
                lineHeight: 1.2,
                margin: '0 0 var(--space-xs)',
                color: 'var(--color-ink)',
              }}
            >
              Initiate Technical Communication
            </h2>
            <p style={{ color: 'var(--color-ink-2)', fontSize: 'var(--text-lead)', margin: 0 }}>
              Available for software engineering roles, internships, and technical collaboration.
            </p>
          </div>

          <div
            className="aero-panel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-md)',
              padding: 'var(--space-xl)',
            }}
          >
            {/* Copy Email Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="aero-btn"
              style={{ padding: 'var(--space-md)', justifyContent: 'flex-start' }}
            >
              {copiedEmail ? <FiCheck size={18} color="var(--color-success)" /> : <FiCopy size={18} />}
              <span style={{ fontWeight: 600 }}>
                {copiedEmail ? 'Email copied to clipboard!' : 'Copy email address'}
              </span>
            </button>

            {/* Direct Mailto */}
            <a
              href="mailto:elyuzar.fazlurrahman@gmail.com"
              className="aero-btn"
              style={{ padding: 'var(--space-md)', justifyContent: 'flex-start' }}
            >
              <FiMail size={18} />
              <span>Email Elyuzar</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/prettycoolflacko"
              target="_blank"
              rel="noopener noreferrer"
              className="aero-btn"
              style={{ padding: 'var(--space-md)', justifyContent: 'flex-start' }}
            >
              <FiGithub size={18} />
              <span>GitHub profile</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/elyuzar"
              target="_blank"
              rel="noopener noreferrer"
              className="aero-btn"
              style={{ padding: 'var(--space-md)', justifyContent: 'flex-start' }}
            >
              <FiLinkedin size={18} />
              <span>LinkedIn profile</span>
            </a>

            {/* PDF CV Download */}
            <a
              href="./assets/Elyuzar_CV.pdf"
              download
              className="aero-btn aero-btn-primary"
              style={{ padding: 'var(--space-md)', justifyContent: 'flex-start' }}
            >
              <FiDownload size={18} />
              <span>Download CV (PDF)</span>
            </a>

            {/* Windows 7 Shell Link */}
            <Link
              to="/os"
              className="aero-btn"
              style={{ padding: 'var(--space-md)', justifyContent: 'flex-start' }}
            >
              <VistaIcon id="computer" size={18} />
              <span>Windows 7 desktop shell</span>
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════ */}
        <footer
          style={{
            borderTop: 'var(--rule-hair) solid var(--color-rule)',
            background: 'var(--glass-surface)',
            backdropFilter: 'blur(16px)',
            padding: 'var(--space-lg) var(--gutter)',
            marginTop: 'var(--space-3xl)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--container)',
              marginInline: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-ink-2)',
            }}
          >
            <div>
              <strong style={{ color: 'var(--color-ink)' }}>Elyuzar Fazlurrahman</strong>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', marginTop: '2px' }}>
                Informatics student and software engineer in Yogyakarta, Indonesia.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <Link
                to="/os"
                className="aero-btn"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                <VistaIcon id="computer" size={14} />
                <span>Switch to desktop workspace</span>
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
