import { useState, useEffect } from 'react';
import {
  FiGithub,
  FiLayers,
  FiActivity,
  FiShield,
  FiSliders,
  FiWifi,
  FiWifiOff,
  FiCheckCircle,
  FiRefreshCw,
} from 'react-icons/fi';
import AeroDeviceFrame from './AeroDeviceFrame';
import { playBubblePop } from '../../utils/audio';

/**
 * Interactive Engineering Lab for Elyuzar Fazlurrahman's Real Projects
 * Follows interactive-portfolio guidelines:
 * - 30-Second scan: Problem, Elyuzar's Role, Tech Stack, Verifiable Impact
 * - Interactive simulators for offline sync, AHP-TOPSIS weighting, PLTS telemetry, and AES streaming
 * - Real verified device mockups for EventSync (/eventsync.png) and FinApp (/finapp.png)
 */
export default function AeroProjectLab({ projects }) {
  const [activeTabMap, setActiveTabMap] = useState({
    eventsync: 'interactive',
    finapp: 'interactive',
    plts: 'interactive',
    cipherdrop: 'interactive',
  });

  // EventSync Simulator State
  const [isEventSyncOffline, setIsEventSyncOffline] = useState(false);
  const [syncQueue, setSyncQueue] = useState([
    { id: 'EVT-101', title: 'Speaker Session Checked In', status: 'synced', time: '14:22' },
  ]);

  // FinApp AHP Simulator State
  const [ahpWeights, setAhpWeights] = useState({
    momentum: 40,
    valuation: 35,
    solvency: 25,
  });

  // PLTS Scraper Simulator State
  const [pltsKw, setPltsKw] = useState(48.6);
  const [pltsTtl, setPltsTtl] = useState(58);
  const [isScraping, setIsScraping] = useState(false);
  const [scraperLogs, setScraperLogs] = useState([
    '07:30:00 [Bun.Playwright] Headless chromium instance active',
    '07:30:02 [iSolarCloud] Session token refreshed automatically',
    '07:30:04 [Redis] Telemetry cache written with 60s TTL (48.6 kW)',
  ]);

  // CipherDrop Simulator State
  const [cipherInput, setCipherInput] = useState('Elyuzar confidential telemetry payload');
  const [cipherOutput, setCipherOutput] = useState('7f4a9b2c8e110d93a4bc88210fe5d63a');
  const [cipherAuthTag, setCipherAuthTag] = useState('e4a291bc7d80f12a');
  const [isEncrypting, setIsEncrypting] = useState(false);

  // Redis countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setPltsTtl((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const setProjectTab = (projectId, tab) => {
    setActiveTabMap((prev) => ({ ...prev, [projectId]: tab }));
    playBubblePop(500);
  };

  // EventSync Simulator handlers
  const handleToggleEventSyncNetwork = () => {
    const nextOffline = !isEventSyncOffline;
    setIsEventSyncOffline(nextOffline);
    playBubblePop(nextOffline ? 360 : 640);
    if (!nextOffline) {
      // Auto flush queue
      setTimeout(() => {
        setSyncQueue((prev) =>
          prev.map((item) => ({ ...item, status: 'synced' }))
        );
      }, 400);
    }
  };

  const handleAddEvent = () => {
    playBubblePop(540);
    const newId = `EVT-${Math.floor(100 + Math.random() * 900)}`;
    const newItem = {
      id: newId,
      title: `Attendee Gate #${Math.floor(1 + Math.random() * 8)} Verified`,
      status: isEventSyncOffline ? 'queued_hive' : 'synced',
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    };
    setSyncQueue((prev) => [newItem, ...prev.slice(0, 3)]);
  };

  // FinApp calculation simulation
  const calculateStockScores = () => {
    const total = ahpWeights.momentum + ahpWeights.valuation + ahpWeights.solvency || 100;
    const m = ahpWeights.momentum / total;
    const v = ahpWeights.valuation / total;
    const s = ahpWeights.solvency / total;

    return [
      { ticker: 'BBCA', name: 'Bank Central Asia', score: Math.round((m * 82 + v * 70 + s * 95) * 10) / 10 },
      { ticker: 'BBRI', name: 'Bank Rakyat Indonesia', score: Math.round((m * 74 + v * 85 + s * 88) * 10) / 10 },
      { ticker: 'ASII', name: 'Astra International', score: Math.round((m * 68 + v * 92 + s * 78) * 10) / 10 },
      { ticker: 'TLKM', name: 'Telkom Indonesia', score: Math.round((m * 62 + v * 88 + s * 82) * 10) / 10 },
    ].sort((a, b) => b.score - a.score);
  };

  // PLTS Scraper handler
  const handleTriggerScraper = () => {
    setIsScraping(true);
    playBubblePop(600);
    setTimeout(() => {
      const nextKw = (45 + Math.random() * 8).toFixed(1);
      setPltsKw(nextKw);
      setPltsTtl(60);
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      setScraperLogs((prev) => [
        `${time} [iSolarCloud] Extracted inverter array bus: ${nextKw} kW output`,
        `${time} [Redis] Re-cached telemetry with 60s TTL (0 manual logins)`,
        ...prev.slice(0, 2),
      ]);
      setIsScraping(false);
    }, 800);
  };

  // CipherDrop encrypt handler
  const handleEncryptText = () => {
    setIsEncrypting(true);
    playBubblePop(520);
    setTimeout(() => {
      const hexChars = '0123456789abcdef';
      let hex = '';
      for (let i = 0; i < 32; i++) hex += hexChars[Math.floor(Math.random() * 16)];
      let tag = '';
      for (let i = 0; i < 16; i++) tag += hexChars[Math.floor(Math.random() * 16)];
      setCipherOutput(hex);
      setCipherAuthTag(tag);
      setIsEncrypting(false);
    }, 350);
  };

  const stockRankings = calculateStockScores();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* ══════════════════════════════════════════════════════════
          1. EVENT SYNC MOBILE (FLAGSHIP)
      ══════════════════════════════════════════════════════════ */}
      <article
        id="project-eventsync"
        className="aero-panel aero-panel-sheen"
        style={{ padding: 'var(--space-xl)' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'center',
          }}
        >
          {/* Left: Device Frame with real capture */}
          <div>
            <AeroDeviceFrame project={projects[0]} mode="compact" />
          </div>

          {/* Right: Interactive Case Study */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <span className="aero-pill aero-pill-accent">Mobile & Distributed Client</span>
              <a
                href={projects[0].github}
                target="_blank"
                rel="noopener noreferrer"
                className="aero-btn"
                style={{ padding: 'var(--space-2xs) var(--space-xs)', fontSize: '12px' }}
              >
                <FiGithub size={13} />
                <span>GitHub code</span>
              </a>
            </div>

            <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, margin: '0 0 var(--space-xs)', color: 'var(--color-ink)' }}>
              {projects[0].title}
            </h3>

            <p style={{ fontSize: 'var(--text-lead)', color: 'var(--color-ink-2)', margin: '0 0 var(--space-md)', lineHeight: 1.45 }}>
              Cross-platform mobile client engineered for campus event staff with local-first write queues and resilient offline synchronization.
            </p>

            {/* Interactive Tab Switcher */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-2xs)',
                marginBottom: 'var(--space-md)',
                background: 'var(--glass-surface-deep)',
                padding: '4px',
                borderRadius: 'var(--radius-pill)',
                width: 'fit-content',
              }}
            >
              <button
                type="button"
                onClick={() => setProjectTab('eventsync', 'interactive')}
                className={`aero-btn${activeTabMap.eventsync === 'interactive' ? ' aero-btn-primary' : ''}`}
                style={{ fontSize: '12px', padding: '4px 12px' }}
              >
                <FiActivity size={12} />
                <span>Offline Simulator</span>
              </button>
              <button
                type="button"
                onClick={() => setProjectTab('eventsync', 'architecture')}
                className={`aero-btn${activeTabMap.eventsync === 'architecture' ? ' aero-btn-primary' : ''}`}
                style={{ fontSize: '12px', padding: '4px 12px' }}
              >
                <FiLayers size={12} />
                <span>Architecture</span>
              </button>
              <button
                type="button"
                onClick={() => setProjectTab('eventsync', 'impact')}
                className={`aero-btn${activeTabMap.eventsync === 'impact' ? ' aero-btn-primary' : ''}`}
                style={{ fontSize: '12px', padding: '4px 12px' }}
              >
                <FiCheckCircle size={12} />
                <span>Key Decisions</span>
              </button>
            </div>

            {/* Tab 1: Offline Simulator */}
            {activeTabMap.eventsync === 'interactive' && (
              <div
                style={{
                  background: 'var(--glass-surface-deep)',
                  borderRadius: 'calc(var(--radius-card) - 4px)',
                  padding: 'var(--space-md)',
                  border: 'var(--rule-hair) solid var(--color-rule)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isEventSyncOffline ? (
                      <span style={{ color: 'var(--color-error)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '12px' }}>
                        <FiWifiOff size={14} /> Offline Mode (Stadium Drop)
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '12px' }}>
                        <FiWifi size={14} /> Wi-Fi Connected
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={handleToggleEventSyncNetwork}
                      className="aero-btn"
                      style={{ fontSize: '11px', padding: '2px 8px' }}
                    >
                      {isEventSyncOffline ? 'Restore Wi-Fi' : 'Simulate Dropout'}
                    </button>
                    <button
                      type="button"
                      onClick={handleAddEvent}
                      className="aero-btn aero-btn-primary"
                      style={{ fontSize: '11px', padding: '2px 8px' }}
                    >
                      + Log Event
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--color-ink-2)', marginBottom: '8px' }}>
                  Write Queue Activity:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {syncQueue.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        background: 'var(--color-paper)',
                        borderRadius: '6px',
                        fontSize: '11px',
                        border: 'var(--rule-hair) solid var(--color-rule)',
                      }}
                    >
                      <span>{item.title}</span>
                      <span
                        style={{
                          fontWeight: 700,
                          color: item.status === 'synced' ? 'var(--color-success)' : 'var(--color-sun)',
                        }}
                      >
                        {item.status === 'synced' ? '✓ Synced to Cloud' : '⏳ Queued in Hive DB'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Architecture */}
            {activeTabMap.eventsync === 'architecture' && (
              <div
                style={{
                  background: 'var(--glass-surface-deep)',
                  borderRadius: 'calc(var(--radius-card) - 4px)',
                  padding: 'var(--space-md)',
                  border: 'var(--rule-hair) solid var(--color-rule)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.5,
                  color: 'var(--color-ink-2)',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
                  Client-First Reactive State Flow:
                </div>
                Flutter Widgets → Riverpod Providers → Hive Local Write Queue → Background Synchronization Worker → FastAPI Backend with JWT.
                <div style={{ marginTop: '8px', fontSize: '12px' }}>
                  Features optimistic UI updates: schedule updates reflect immediately for the volunteer, while the sync daemon batches mutations and guarantees eventual consistency once network connectivity recovers.
                </div>
              </div>
            )}

            {/* Tab 3: Key Decisions */}
            {activeTabMap.eventsync === 'impact' && (
              <div
                style={{
                  background: 'var(--glass-surface-deep)',
                  borderRadius: 'calc(var(--radius-card) - 4px)',
                  padding: 'var(--space-md)',
                  border: 'var(--rule-hair) solid var(--color-rule)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.5,
                  color: 'var(--color-ink-2)',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
                  Verifiable Engineering Wins:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  <li>Zero data loss achieved during simulated 30-second network dropouts.</li>
                  <li>Eliminated UI lockups by moving Hive serialization off the Flutter UI thread.</li>
                  <li>Implemented monotonic UUID version vectors to eliminate state divergence.</li>
                </ul>
              </div>
            )}

            {/* Tech badges */}
            <div style={{ display: 'flex', gap: 'var(--space-2xs)', flexWrap: 'wrap', marginTop: 'var(--space-md)' }}>
              {projects[0].tags.map((t) => (
                <span key={t} className="aero-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════
          2. FINAPP MOBILE (DECISION SUPPORT & LLM PIPELINE)
      ══════════════════════════════════════════════════════════ */}
      <article
        id="project-finapp"
        className="aero-panel aero-panel-sheen"
        style={{ padding: 'var(--space-xl)' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'center',
          }}
        >
          {/* Left: Interactive Case Study */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <span className="aero-pill aero-pill-accent">Financial AI & Mathematical Decision Support</span>
              <a
                href={projects[1].github}
                target="_blank"
                rel="noopener noreferrer"
                className="aero-btn"
                style={{ padding: 'var(--space-2xs) var(--space-xs)', fontSize: '12px' }}
              >
                <FiGithub size={13} />
                <span>GitHub code</span>
              </a>
            </div>

            <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, margin: '0 0 var(--space-xs)', color: 'var(--color-ink)' }}>
              {projects[1].title}
            </h3>

            <p style={{ fontSize: 'var(--text-lead)', color: 'var(--color-ink-2)', margin: '0 0 var(--space-md)', lineHeight: 1.45 }}>
              Decision support system combining Analytic Hierarchy Process (AHP) and TOPSIS algorithms to convert subjective multi-criteria weights into objective numerical stock rankings.
            </p>

            {/* Interactive Tab Switcher */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-2xs)',
                marginBottom: 'var(--space-md)',
                background: 'var(--glass-surface-deep)',
                padding: '4px',
                borderRadius: 'var(--radius-pill)',
                width: 'fit-content',
              }}
            >
              <button
                type="button"
                onClick={() => setProjectTab('finapp', 'interactive')}
                className={`aero-btn${activeTabMap.finapp === 'interactive' ? ' aero-btn-primary' : ''}`}
                style={{ fontSize: '12px', padding: '4px 12px' }}
              >
                <FiSliders size={12} />
                <span>AHP Simulator</span>
              </button>
              <button
                type="button"
                onClick={() => setProjectTab('finapp', 'performance')}
                className={`aero-btn${activeTabMap.finapp === 'performance' ? ' aero-btn-primary' : ''}`}
                style={{ fontSize: '12px', padding: '4px 12px' }}
              >
                <FiActivity size={12} />
                <span>4x Latency Reduction</span>
              </button>
            </div>

            {/* Tab 1: AHP Interactive Slider Matrix */}
            {activeTabMap.finapp === 'interactive' && (
              <div
                style={{
                  background: 'var(--glass-surface-deep)',
                  borderRadius: 'calc(var(--radius-card) - 4px)',
                  padding: 'var(--space-md)',
                  border: 'var(--rule-hair) solid var(--color-rule)',
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '8px' }}>
                  Adjust Multi-Criteria Decision Weights:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-ink-2)' }}>
                      <span>Momentum & Growth</span>
                      <span style={{ fontWeight: 700 }}>{ahpWeights.momentum}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      value={ahpWeights.momentum}
                      onChange={(e) => setAhpWeights((prev) => ({ ...prev, momentum: Number(e.target.value) }))}
                      style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-ink-2)' }}>
                      <span>Valuation & Margin of Safety</span>
                      <span style={{ fontWeight: 700 }}>{ahpWeights.valuation}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      value={ahpWeights.valuation}
                      onChange={(e) => setAhpWeights((prev) => ({ ...prev, valuation: Number(e.target.value) }))}
                      style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-ink-2)' }}>
                      <span>Balance Sheet Solvency</span>
                      <span style={{ fontWeight: 700 }}>{ahpWeights.solvency}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      value={ahpWeights.solvency}
                      onChange={(e) => setAhpWeights((prev) => ({ ...prev, solvency: Number(e.target.value) }))}
                      style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                    />
                  </div>
                </div>

                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
                  TOPSIS Relative Closeness Rankings:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {stockRankings.map((st, i) => (
                    <div
                      key={st.ticker}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '4px 8px',
                        background: 'var(--color-paper)',
                        borderRadius: '4px',
                        fontSize: '11px',
                        border: 'var(--rule-hair) solid var(--color-rule)',
                      }}
                    >
                      <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
                        #{i + 1} {st.ticker} ({st.name})
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: 60,
                            height: 6,
                            background: 'var(--color-rule)',
                            borderRadius: 3,
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${st.score}%`,
                              height: '100%',
                              background: 'var(--color-accent)',
                            }}
                          />
                        </div>
                        <span style={{ fontWeight: 700, width: '28px', textAlign: 'right' }}>{st.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Performance */}
            {activeTabMap.finapp === 'performance' && (
              <div
                style={{
                  background: 'var(--glass-surface-deep)',
                  borderRadius: 'calc(var(--radius-card) - 4px)',
                  padding: 'var(--space-md)',
                  border: 'var(--rule-hair) solid var(--color-rule)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.5,
                  color: 'var(--color-ink-2)',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
                  Architectural Optimization:
                </div>
                Originally, candidate ticker evaluation took 4.2 seconds due to multi-step roundtrip prompts through remote LLMs.
                <div style={{ marginTop: '8px' }}>
                  <strong>Solution:</strong> Elyuzar re-engineered the pipeline to compute pairwise AHP weightings and TOPSIS ideal separation measures locally on-device in Dart, passing only distilled top-5 ranked candidates to OpenRouter.
                </div>
                <div style={{ marginTop: '8px', fontWeight: 700, color: 'var(--color-success)' }}>
                  Result: Latency dropped from 4.2s to 0.9s (4x speedup) with predictable determinism.
                </div>
              </div>
            )}

            {/* Tech badges */}
            <div style={{ display: 'flex', gap: 'var(--space-2xs)', flexWrap: 'wrap', marginTop: 'var(--space-md)' }}>
              {projects[1].tags.map((t) => (
                <span key={t} className="aero-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Device Frame with real capture */}
          <div>
            <AeroDeviceFrame project={projects[1]} mode="compact" />
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════
          3. REAL-TIME PLTS TELEMETRY (PLN INTERNSHIP)
      ══════════════════════════════════════════════════════════ */}
      <article
        id="project-plts"
        className="aero-panel aero-panel-sheen"
        style={{ padding: 'var(--space-xl)' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'center',
          }}
        >
          {/* Left: Live Inverter Telemetry Console */}
          <div
            style={{
              background: 'linear-gradient(180deg, var(--color-deep-sky) 0%, oklch(24% 0.08 220) 100%)',
              borderRadius: 'var(--radius-card)',
              padding: 'var(--space-lg)',
              color: 'var(--color-paper)',
              boxShadow: 'var(--glass-shadow)',
              border: 'var(--rule-hair) solid color-mix(in oklab, var(--color-paper) 20%, transparent)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-lagoon-light)' }}>
                PLN Indonesia Power Inverter Telemetry
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  background: 'var(--color-success)',
                  color: 'var(--color-paper)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                LIVE FEED
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
              <div style={{ background: 'color-mix(in oklab, var(--color-paper) 8%, transparent)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Current Generation</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-accent)' }}>
                  {pltsKw} <span style={{ fontSize: '14px', fontWeight: 600 }}>kW</span>
                </div>
                <div style={{ fontSize: '10px', opacity: 0.7 }}>Inverter Bus Array 01-18</div>
              </div>

              <div style={{ background: 'color-mix(in oklab, var(--color-paper) 8%, transparent)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Redis Cache TTL</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-success)' }}>
                  {pltsTtl} <span style={{ fontSize: '14px', fontWeight: 600 }}>s</span>
                </div>
                <div style={{ fontSize: '10px', opacity: 0.7 }}>Auto-refresh cycle</div>
              </div>
            </div>

            {/* Terminal Log Console */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                background: 'color-mix(in oklab, var(--color-ink) 70%, transparent)',
                padding: '10px',
                borderRadius: '6px',
                lineHeight: 1.5,
                color: 'var(--color-paper-2)',
                marginBottom: 'var(--space-md)',
              }}
            >
              {scraperLogs.map((log, i) => (
                <div key={i} style={{ opacity: i === 0 ? 1 : 0.7 }}>
                  {log}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleTriggerScraper}
              disabled={isScraping}
              className="aero-btn"
              style={{
                width: '100%',
                background: 'linear-gradient(180deg, var(--color-sky-top) 0%, var(--color-deep-sky) 100%)',
                color: 'var(--color-paper)',
                border: 'var(--rule-hair) solid var(--color-accent)',
              }}
            >
              <FiRefreshCw size={13} className={isScraping ? 'spin-icon' : ''} />
              <span>{isScraping ? 'Executing Playwright Headless Scraper...' : 'Simulate Automated Scrape Cycle'}</span>
            </button>
          </div>

          {/* Right: Context & Verification */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <span className="aero-pill aero-pill-accent">Head Office Engineering Internship</span>
              <a
                href={projects[2].github}
                target="_blank"
                rel="noopener noreferrer"
                className="aero-btn"
                style={{ padding: 'var(--space-2xs) var(--space-xs)', fontSize: '12px' }}
              >
                <FiGithub size={13} />
                <span>GitHub code</span>
              </a>
            </div>

            <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, margin: '0 0 var(--space-xs)', color: 'var(--color-ink)' }}>
              {projects[2].title}
            </h3>

            <p style={{ fontSize: 'var(--text-lead)', color: 'var(--color-ink-2)', margin: '0 0 var(--space-md)', lineHeight: 1.45 }}>
              Automated solar power plant telemetry pipeline built during software engineering internship at PLN Indonesia Power Head Office.
            </p>

            <div
              style={{
                background: 'var(--glass-surface-deep)',
                borderRadius: 'calc(var(--radius-card) - 4px)',
                padding: 'var(--space-md)',
                border: 'var(--rule-hair) solid var(--color-rule)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.5,
                color: 'var(--color-ink-2)',
                marginBottom: 'var(--space-md)',
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
                The Operational Bottleneck Solved:
              </div>
              Plant operators previously logged in manually every hour across distributed Sungrow SolarCloud accounts.
              <div style={{ marginTop: '8px' }}>
                Elyuzar built a headless Chromium daemon in Bun.js and Playwright with automated re-authentication and session recovery, caching telemetry snapshots into Redis with 60s TTL and streaming data to internal REST endpoints.
              </div>
              <div style={{ marginTop: '8px', fontWeight: 700, color: 'var(--color-success)' }}>
                Result: 100% elimination of manual hourly logins with zero operator overhead.
              </div>
            </div>

            {/* Tech badges */}
            <div style={{ display: 'flex', gap: 'var(--space-2xs)', flexWrap: 'wrap' }}>
              {projects[2].tags.map((t) => (
                <span key={t} className="aero-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════
          4. CIPHER DROP ENCRYPTION VAULT
      ══════════════════════════════════════════════════════════ */}
      <article
        id="project-cipherdrop"
        className="aero-panel aero-panel-sheen"
        style={{ padding: 'var(--space-xl)' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'center',
          }}
        >
          {/* Left: Context */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <span className="aero-pill aero-pill-accent">Cryptography & Steganography</span>
              <a
                href={projects[3].github}
                target="_blank"
                rel="noopener noreferrer"
                className="aero-btn"
                style={{ padding: 'var(--space-2xs) var(--space-xs)', fontSize: '12px' }}
              >
                <FiGithub size={13} />
                <span>GitHub code</span>
              </a>
            </div>

            <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, margin: '0 0 var(--space-xs)', color: 'var(--color-ink)' }}>
              {projects[3].title}
            </h3>

            <p style={{ fontSize: 'var(--text-lead)', color: 'var(--color-ink-2)', margin: '0 0 var(--space-md)', lineHeight: 1.45 }}>
              Encrypted messaging and secure file transfer application featuring AES-256-GCM authenticated streaming and image steganography.
            </p>

            <div
              style={{
                background: 'var(--glass-surface-deep)',
                borderRadius: 'calc(var(--radius-card) - 4px)',
                padding: 'var(--space-md)',
                border: 'var(--rule-hair) solid var(--color-rule)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.5,
                color: 'var(--color-ink-2)',
                marginBottom: 'var(--space-md)',
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
                Technical Challenge & Solution:
              </div>
              Encrypting multi-megabyte payloads in memory caused memory spikes and process drops on resource-constrained Linux VPS instances.
              <div style={{ marginTop: '8px' }}>
                Elyuzar engineered a chunked streaming cipher in Python/FastAPI that streams data through 64 KB buffers, keeping server RAM flat at under 25 MB regardless of transfer size.
              </div>
            </div>

            {/* Tech badges */}
            <div style={{ display: 'flex', gap: 'var(--space-2xs)', flexWrap: 'wrap' }}>
              {projects[3].tags.map((t) => (
                <span key={t} className="aero-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Interactive Cryptography Sandbox */}
          <div
            style={{
              background: 'linear-gradient(180deg, var(--color-deep-sky) 0%, oklch(24% 0.08 220) 100%)',
              borderRadius: 'var(--radius-card)',
              padding: 'var(--space-lg)',
              color: 'var(--color-paper)',
              boxShadow: 'var(--glass-shadow)',
              border: 'var(--rule-hair) solid color-mix(in oklab, var(--color-paper) 20%, transparent)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-lagoon-light)' }}>
                AES-256-GCM Streaming Vault
              </span>
              <span style={{ fontSize: '11px', background: 'color-mix(in oklab, var(--color-paper) 15%, transparent)', padding: '2px 8px', borderRadius: '4px' }}>
                Chunk Size: 64 KB
              </span>
            </div>

            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <label style={{ fontSize: '11px', opacity: 0.8, display: 'block', marginBottom: '4px' }}>
                Confidential Plaintext Input:
              </label>
              <input
                type="text"
                value={cipherInput}
                onChange={(e) => setCipherInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: 'var(--rule-hair) solid color-mix(in oklab, var(--color-paper) 30%, transparent)',
                  background: 'color-mix(in oklab, var(--color-ink) 70%, transparent)',
                  color: 'var(--color-paper)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: 'var(--space-md)' }}>
              <div style={{ background: 'color-mix(in oklab, var(--color-ink) 70%, transparent)', padding: '8px', borderRadius: '6px' }}>
                <div style={{ fontSize: '10px', opacity: 0.7 }}>Ciphertext (Hex Stream):</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-success)', wordBreak: 'break-all' }}>
                  {cipherOutput}
                </div>
              </div>

              <div style={{ background: 'color-mix(in oklab, var(--color-ink) 70%, transparent)', padding: '8px', borderRadius: '6px' }}>
                <div style={{ fontSize: '10px', opacity: 0.7 }}>GCM Authentication Tag:</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-sun)' }}>
                  {cipherAuthTag}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleEncryptText}
              disabled={isEncrypting}
              className="aero-btn"
              style={{
                width: '100%',
                background: 'linear-gradient(180deg, var(--color-accent) 0%, var(--color-deep-sky) 100%)',
                color: 'var(--color-accent-ink)',
                fontWeight: 700,
                border: 'var(--rule-hair) solid var(--color-accent)',
              }}
            >
              <FiShield size={14} />
              <span>{isEncrypting ? 'Streaming 64 KB Chunks...' : 'Run AES-256-GCM Encryption'}</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
