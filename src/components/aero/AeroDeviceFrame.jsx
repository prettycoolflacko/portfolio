import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize2, FiSun, FiShield, FiRefreshCw } from 'react-icons/fi';

/**
 * Frutiger Aero Device Frame & Interactive Project Simulator
 * Features:
 * - Skeuomorphic curved glossy smartphone bezel with specular gloss highlight
 * - Real phone screenshots for EventSync and FinApp with interactive reflection & zoom
 * - Stand-in interactive telemetry monitor for PLTS Monitoring (solar power plant)
 * - Stand-in interactive crypto terminal simulator for CipherDrop (AES-256-GCM + Steganography)
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
          style={{
            position: 'relative',
            width: mode === 'compact' ? '220px' : '280px',
            borderRadius: '36px',
            padding: '10px',
            background: 'linear-gradient(145deg, #e4ecf3 0%, #b8cadb 40%, #7d9cb8 100%)',
            boxShadow: `
              0 18px 38px rgba(10, 45, 80, 0.28),
              0 4px 12px rgba(0, 0, 0, 0.12),
              inset 0 1px 2px rgba(255, 255, 255, 0.9),
              inset 0 -2px 4px rgba(20, 50, 80, 0.35)
            `,
            border: '2px solid rgba(255, 255, 255, 0.85)',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Bezel inner ring */}
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              backgroundColor: '#0a1017',
              boxShadow: 'inset 0 0 0 2px #1e2d3d, inset 0 2px 6px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Dynamic Glass Refraction Glare */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 10,
                background: `radial-gradient(ellipse 260px 180px at ${reflectionPos.x}% ${reflectionPos.y}%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 80%)`,
                mixBlendMode: 'screen',
                transition: 'background 0.05s linear',
              }}
            />

            {/* Top Phone Camera Pill Notch */}
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 72,
                height: 14,
                backgroundColor: '#05070a',
                borderRadius: 10,
                zIndex: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#132130', border: '1px solid #1e3852' }} />
              <div style={{ width: 22, height: 3, borderRadius: 2, background: '#1c2834' }} />
            </div>

            {/* Actual Screenshot */}
            <img
              src={project.image}
              alt={`${project.title} live interface capture`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: mode === 'compact' ? '420px' : '560px',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />

            {/* Bottom Aero Glass Home Indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: 6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 68,
                height: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                borderRadius: 3,
                zIndex: 12,
                boxShadow: '0 0 6px rgba(255,255,255,0.8)',
              }}
            />
          </div>

          {/* Interactive Inspection Bar */}
          <div
            style={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2px 4px',
              fontSize: '11px',
              color: '#1a4e70',
            }}
          >
            <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00c853', display: 'inline-block' }} />
              Real App Capture
            </span>
            <button
              type="button"
              onClick={() => setIsZoomed(true)}
              className="aero-btn"
              style={{ padding: '2px 8px', fontSize: '10.5px', display: 'flex', alignItems: 'center', gap: 4 }}
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
                zIndex: 9999,
                backgroundColor: 'rgba(5, 22, 40, 0.72)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxHeight: '92vh',
                  maxWidth: '92vw',
                  background: '#ffffff',
                  borderRadius: 12,
                  padding: 16,
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0d3a5c' }}>
                    {project.title} — Verified Screenshot
                  </div>
                  <button
                    type="button"
                    className="aero-btn"
                    onClick={() => setIsZoomed(false)}
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                  >
                    Close Preview (ESC)
                  </button>
                </div>
                <div style={{ overflow: 'auto', maxHeight: '80vh', borderRadius: 8 }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', maxWidth: '380px', display: 'block', margin: '0 auto', borderRadius: 8 }}
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
        style={{
          width: '100%',
          maxWidth: mode === 'compact' ? '340px' : '100%',
          borderRadius: 8,
          background: 'linear-gradient(180deg, #f0f7fd 0%, #e1effa 100%)',
          border: '1px solid #8eb3d4',
          boxShadow: '0 8px 24px rgba(10, 50, 90, 0.16), inset 0 1px 0 #ffffff',
          overflow: 'hidden',
          fontFamily: 'Segoe UI, system-ui, sans-serif',
        }}
      >
        {/* Aero Console Header */}
        <div
          style={{
            background: 'linear-gradient(180deg, #1c72b8 0%, #105996 100%)',
            padding: '8px 12px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #093761',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11.5px', fontWeight: 700 }}>
            <FiSun style={{ color: '#ffd54f' }} />
            PLN Indonesia Power Telemetry Live Monitor
          </div>
          <span
            style={{
              fontSize: '10px',
              background: '#00c853',
              padding: '2px 6px',
              borderRadius: 3,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Live Daemon
          </span>
        </div>

        {/* Dashboard Content */}
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Live Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #b8d2eb',
                borderRadius: 4,
                padding: '8px',
                textAlign: 'center',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '10.5px', color: '#546e7a' }}>Current Solar Generation</div>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#0d47a1', margin: '2px 0' }}>
                {solarKw} <span style={{ fontSize: '11px', fontWeight: 600 }}>kW</span>
              </div>
              <div style={{ fontSize: '9.5px', color: '#2e7d32' }}>iSolarCloud Inverter Bus 01</div>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #b8d2eb',
                borderRadius: 4,
                padding: '8px',
                textAlign: 'center',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '10.5px', color: '#546e7a' }}>Redis Telemetry TTL</div>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#00838f', margin: '2px 0' }}>
                58 <span style={{ fontSize: '11px', fontWeight: 600 }}>sec</span>
              </div>
              <div style={{ fontSize: '9.5px', color: '#0277bd' }}>Auto-expiring cache buffer</div>
            </div>
          </div>

          {/* Telemetry Log Terminal */}
          <div
            style={{
              background: '#0a1622',
              color: '#81d4fa',
              fontFamily: 'Consolas, monospace',
              fontSize: '10px',
              padding: '8px',
              borderRadius: 4,
              border: '1px solid #1c3b57',
              minHeight: '75px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              overflow: 'hidden',
            }}
          >
            <div style={{ color: '#4fc3f7', borderBottom: '1px solid #1a3a54', paddingBottom: 3, fontWeight: 700 }}>
              &gt; bun run scraper/sungrow-daemon.ts --continuous
            </div>
            {scrapeLog.map((log, idx) => (
              <div key={idx} style={{ opacity: idx === 0 ? 1 : 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {log}
              </div>
            ))}
          </div>

          {/* Interactive Trigger Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10.5px', color: '#37474f' }}>
              Simulates automated hourly scraper execution
            </span>
            <button
              type="button"
              className="aero-btn aero-btn-sky"
              onClick={triggerSolarRefresh}
              disabled={isScraping}
              style={{ fontSize: '11px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <FiRefreshCw className={isScraping ? 'spin-icon' : ''} size={11} />
              {isScraping ? 'Scraping...' : 'Simulate Ingestion Cycle'}
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
        style={{
          width: '100%',
          maxWidth: mode === 'compact' ? '340px' : '100%',
          borderRadius: 8,
          background: 'linear-gradient(180deg, #f3f6fa 0%, #e2eaf2 100%)',
          border: '1px solid #92abc2',
          boxShadow: '0 8px 24px rgba(10, 40, 70, 0.16), inset 0 1px 0 #ffffff',
          overflow: 'hidden',
          fontFamily: 'Segoe UI, system-ui, sans-serif',
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            background: 'linear-gradient(180deg, #2b3947 0%, #18222c 100%)',
            padding: '8px 12px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #0d141b',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11.5px', fontWeight: 700 }}>
            <FiShield style={{ color: '#00e676' }} />
            CipherDrop AES-256-GCM Streaming Cipher Vault
          </div>
          <span
            style={{
              fontSize: '10px',
              background: '#00b0ff',
              padding: '2px 6px',
              borderRadius: 3,
              fontWeight: 700,
            }}
          >
            Zero-Knowledge
          </span>
        </div>

        {/* Content Body */}
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label style={{ fontSize: '11px', color: '#37474f', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              Input Payload (Will be chunked in 64 KB streams):
            </label>
            <input
              type="text"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '11.5px',
                borderRadius: 3,
                border: '1px solid #9bb7d4',
                background: '#ffffff',
                color: '#1a2b3c',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)',
              }}
            />
          </div>

          {/* Cipher output */}
          <div
            style={{
              background: '#0f171f',
              padding: '8px 10px',
              borderRadius: 4,
              border: '1px solid #233446',
              fontFamily: 'Consolas, monospace',
              fontSize: '10.5px',
              color: '#81c784',
            }}
          >
            <div style={{ color: '#90a4ae', fontSize: '9.5px', marginBottom: 3 }}>
              Ciphertext Output (AES-GCM Auth Tag + Vigenere Super-Key):
            </div>
            <div style={{ wordBreak: 'break-all', letterSpacing: '0.5px' }}>
              {isEncrypting ? 'Encrypting stream in 64 KB memory chunks...' : `0x${cipherHex}`}
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '10.5px', color: '#546e7a' }}>
              Chunk stream buffer: <strong>{chunkProgress}%</strong>
            </div>
            <button
              type="button"
              className="aero-btn aero-btn-sky"
              onClick={triggerEncrypt}
              disabled={isEncrypting}
              style={{ fontSize: '11px', padding: '3px 12px' }}
            >
              {isEncrypting ? 'Streaming...' : 'Run Encryption Stream'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
