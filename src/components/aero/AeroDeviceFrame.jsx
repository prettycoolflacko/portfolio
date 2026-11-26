import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize2, FiSun, FiShield, FiRefreshCw } from 'react-icons/fi';

/**
 * Frutiger Aero Device Frame and Interactive Project Simulator
 * Hallmark compliant:
 * - Real app captures (waived 47b)
 * - Pure token-driven styling
 * - No inline hex colors or uncalibrated neutrals
 */
export default function AeroDeviceFrame({ project, mode = 'compact' }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [reflectionPos, setReflectionPos] = useState({ x: 50, y: 30 });
  const [isHovered, setIsHovered] = useState(false);

  // Solar simulation state
  const [solarKw, setSolarKw] = useState(48.6);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeLog, setScrapeLog] = useState([
    '07:30:00 [Bun.Playwright] Daemon initialized with headless chromium',
    '07:30:04 [iSolarCloud] Auth token refreshed automatically (Bearer OK)',
    '07:30:05 [Redis] Telemetry cache written with 60s TTL (48.6 kW, 320.4 kWh)',
  ]);

  // CipherDrop simulation state
  const [plainText, setPlainText] = useState('Confidential telemetry payload');
  const [cipherHex, setCipherHex] = useState('7f4a9b2c8e110d93a4bc88210fe5');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [chunkProgress, setChunkProgress] = useState(100);

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setReflectionPos({ x, y });
  };

  const triggerSolarRefresh = () => {
    setIsScraping(true);
    setTimeout(() => {
      const nextKw = (45 + Math.random() * 8).toFixed(1);
      setSolarKw(nextKw);
      const timeStr = new Date().toTimeString().split(' ')[0];
      setScrapeLog((prev) => [
        `${timeStr} [iSolarCloud] Scraped inverter live bus: ${nextKw} kW output`,
        ...prev.slice(0, 3),
      ]);
      setIsScraping(false);
    }, 900);
  };

  const triggerEncrypt = () => {
    setIsEncrypting(true);
    setChunkProgress(20);
    setTimeout(() => setChunkProgress(65), 250);
    setTimeout(() => {
      setChunkProgress(100);
      const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setCipherHex(randomHex);
      setIsEncrypting(false);
    }, 600);
  };

  // If project has real screenshot (EventSync or FinApp)
  if (project.hasRealScreenshot && project.image) {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        {/* Smartphone Hardware Frame */}
        <div
          className="aero-phone-bezel"
          style={{
            width: mode === 'compact' ? '220px' : '280px',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform var(--dur-short) var(--ease-out)',
          }}
        >
          <div className="aero-phone-inner">
            {/* Dynamic Glass Refraction Glare */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 'var(--z-raised)',
                background: `radial-gradient(ellipse 260px 180px at ${reflectionPos.x}% ${reflectionPos.y}%, color-mix(in oklab, var(--color-paper) 32%, transparent) 0%, transparent 75%)`,
                mixBlendMode: 'screen',
              }}
            />

            {/* Top Phone Camera Pill Notch */}
            <div className="aero-phone-notch" />

            {/* Actual Screenshot */}
            <img
              src={project.image}
              alt={`${project.title} live interface capture`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: mode === 'compact' ? '420px' : '540px',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />

            {/* Bottom Home Indicator */}
            <div className="aero-phone-home" />
          </div>

          {/* Interactive Inspection Bar */}
          <div
            style={{
              marginTop: 'var(--space-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingInline: 'var(--space-2xs)',
              fontSize: 'var(--text-xs)',
            }}
          >
            <span style={{ fontWeight: 600, color: 'var(--color-ink-2)' }}>
              Verified capture
            </span>
            <button
              type="button"
              onClick={() => setIsZoomed(true)}
              className="aero-btn"
              style={{ padding: 'var(--space-3xs) var(--space-xs)', fontSize: 'var(--text-xs)' }}
              title="Expand screenshot preview"
            >
              <FiMaximize2 size={11} /> Expand
            </button>
          </div>
        </div>

        {/* Modal Expanded View */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 'var(--z-modal)',
                backgroundColor: 'color-mix(in oklab, var(--color-ink) 72%, transparent)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-lg)',
              }}
            >
              <motion.div
                initial={{ scale: 0.94, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 16 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxHeight: '90vh',
                  maxWidth: '92vw',
                  background: 'var(--color-paper)',
                  borderRadius: 'var(--radius-card)',
                  padding: 'var(--space-md)',
                  boxShadow: 'var(--glass-shadow-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-ink)' }}>
                    {project.title}: Verified capture
                  </div>
                  <button
                    type="button"
                    className="aero-btn"
                    onClick={() => setIsZoomed(false)}
                    style={{ padding: 'var(--space-3xs) var(--space-sm)', fontSize: 'var(--text-xs)' }}
                  >
                    Close
                  </button>
                </div>
                <div style={{ overflow: 'auto', maxHeight: '78vh', borderRadius: 'var(--space-xs)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', maxWidth: '380px', display: 'block', margin: '0 auto', borderRadius: 'var(--space-xs)' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Stand-in Interactive Simulator for PLTS Solar Telemetry
  if (project.demoType === 'mock-solar') {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="aero-sim-card"
        style={{ maxWidth: mode === 'compact' ? '340px' : '100%' }}
      >
        <div className="aero-sim-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
            <FiSun />
            PLN Indonesia Power Telemetry Live Monitor
          </div>
          <span className="aero-pill aero-pill-accent">
            Live
          </span>
        </div>

        <div style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-xs)' }}>
            <div className="aero-sim-stat">
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>Solar Generation</div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-ink)' }}>
                {solarKw} kW
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-grass)' }}>Inverter bus 01</div>
            </div>

            <div className="aero-sim-stat">
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>Cache TTL</div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-ink)' }}>
                58 s
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>Redis buffer</div>
            </div>
          </div>

          <div className="aero-sim-terminal">
            <div style={{ color: 'var(--color-accent)', borderBottom: '1px solid var(--color-ink-2)', paddingBottom: 'var(--space-3xs)', fontWeight: 700 }}>
              &gt; bun run scraper/sungrow-daemon.ts --continuous
            </div>
            {scrapeLog.map((log, idx) => (
              <div key={idx} style={{ opacity: idx === 0 ? 1 : 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {log}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
              Simulates automated hourly scraper execution
            </span>
            <button
              type="button"
              className="aero-btn aero-btn-primary"
              onClick={triggerSolarRefresh}
              disabled={isScraping}
              style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-3xs) var(--space-sm)' }}
            >
              <FiRefreshCw className={isScraping ? 'spin-icon' : ''} size={11} />
              {isScraping ? 'Scraping...' : 'Simulate cycle'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stand-in Interactive Simulator for CipherDrop Encrypted Terminal
  if (project.demoType === 'mock-cipher') {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="aero-sim-card"
        style={{ maxWidth: mode === 'compact' ? '340px' : '100%' }}
      >
        <div className="aero-sim-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
            <FiShield />
            CipherDrop AES-256-GCM Streaming Vault
          </div>
          <span className="aero-pill aero-pill-accent">
            Zero-knowledge
          </span>
        </div>

        <div style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <div>
            <label style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-2)', fontWeight: 600, display: 'block', marginBottom: 'var(--space-2xs)' }}>
              Input Payload (chunked in 64 KB streams):
            </label>
            <input
              type="text"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              className="aero-input"
            />
          </div>

          <div className="aero-sim-terminal">
            <div style={{ color: 'var(--color-muted)', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-3xs)' }}>
              Ciphertext stream:
            </div>
            <div style={{ wordBreak: 'break-all' }}>
              {isEncrypting ? 'Encrypting stream in 64 KB memory chunks...' : `0x${cipherHex}`}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
              Stream buffer: <strong>{chunkProgress}%</strong>
            </div>
            <button
              type="button"
              className="aero-btn aero-btn-primary"
              onClick={triggerEncrypt}
              disabled={isEncrypting}
              style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-3xs) var(--space-sm)' }}
            >
              {isEncrypting ? 'Streaming...' : 'Run encryption'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
