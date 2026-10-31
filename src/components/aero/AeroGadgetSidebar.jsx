import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiVolume2, FiVolumeX, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

/**
 * Frutiger Aero Desktop Gadgets Sidebar
 * Authentic Windows Vista / 7 Desktop Gadget Bar:
 * - Analog Glass Clock with sweeping second hand & Indonesian Western Time (WIB)
 * - Windows Experience Index gadget (Base score 7.9) showcasing Elyuzar's core engineering stats
 * - Weather Gadget: 29°C Yogyakarta Sky
 * - Ambient Aero Audio Visualizer gadget
 */
export default function AeroGadgetSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [equalizerBars, setEqualizerBars] = useState([45, 80, 60, 95, 30, 75, 50, 90]);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Equalizer animation
  useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = setInterval(() => {
      setEqualizerBars(Array.from({ length: 8 }, () => Math.floor(Math.random() * 85 + 15)));
    }, 180);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hrDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        right: 16,
        zIndex: 15,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        pointerEvents: 'auto',
      }}
      className="hidden xl:flex"
    >
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="aero-btn"
        style={{
          padding: '6px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 30, 60, 0.25)',
        }}
        title={isOpen ? 'Hide Desktop Gadgets' : 'Show Aero Gadgets'}
      >
        {isOpen ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
      </button>

      {/* Gadgets Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              width: 175,
            }}
          >
            {/* ── 1. Aero Glass Analog Clock Gadget ── */}
            <div
              style={{
                position: 'relative',
                width: 170,
                height: 170,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.95) 0%, rgba(200, 230, 255, 0.6) 45%, rgba(130, 185, 230, 0.4) 100%)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.9)',
                boxShadow: `
                  0 12px 28px rgba(5, 30, 60, 0.35),
                  inset 0 2px 4px rgba(255, 255, 255, 0.9),
                  inset 0 -4px 8px rgba(10, 40, 70, 0.25)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
              }}
            >
              {/* Dial tick marks */}
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: i % 3 === 0 ? 3 : 1.5,
                    height: i % 3 === 0 ? 9 : 5,
                    backgroundColor: i % 3 === 0 ? '#0b3d66' : '#5784a8',
                    borderRadius: 1,
                    transform: `rotate(${i * 30}deg) translateY(-68px)`,
                  }}
                />
              ))}

              {/* Hour hand */}
              <div
                style={{
                  position: 'absolute',
                  width: 4,
                  height: 42,
                  backgroundColor: '#0a3254',
                  borderRadius: 2,
                  transformOrigin: 'bottom center',
                  transform: `translateY(-21px) rotate(${hrDeg}deg)`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                }}
              />

              {/* Minute hand */}
              <div
                style={{
                  position: 'absolute',
                  width: 3,
                  height: 56,
                  backgroundColor: '#0288d1',
                  borderRadius: 2,
                  transformOrigin: 'bottom center',
                  transform: `translateY(-28px) rotate(${minDeg}deg)`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                }}
              />

              {/* Second hand */}
              <div
                style={{
                  position: 'absolute',
                  width: 1.5,
                  height: 66,
                  backgroundColor: '#ff5722',
                  borderRadius: 1,
                  transformOrigin: 'bottom center',
                  transform: `translateY(-33px) rotate(${secDeg}deg)`,
                }}
              />

              {/* Center chrome pivot */}
              <div
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #ffffff 0%, #b0bec5 60%, #546e7a 100%)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  border: '1px solid #37474f',
                }}
              />

              {/* Glass glare arc */}
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 20,
                  width: 125,
                  height: 60,
                  borderRadius: '125px 125px 0 0',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.05) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Digital Time subtitle */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 28,
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#0d3a5c',
                  letterSpacing: '0.5px',
                }}
              >
                {currentTime.toLocaleTimeString('en-US', { hour12: false })} WIB
              </div>
            </div>

            {/* ── 2. Windows Experience Index / Engineering Power Gadget ── */}
            <div
              style={{
                position: 'relative',
                width: 170,
                borderRadius: 8,
                background: 'linear-gradient(180deg, rgba(240, 248, 255, 0.75) 0%, rgba(210, 235, 252, 0.65) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                boxShadow: '0 8px 22px rgba(5, 30, 60, 0.2), inset 0 1px 0 #ffffff',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                userSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0d3a5c' }}>
                  Experience Index
                </span>
                {/* 7.9 Max Win7 score badge */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 4,
                    background: 'linear-gradient(180deg, #42a5f5 0%, #1565c0 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 800,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)',
                  }}
                  title="Highest Windows 7 Experience Index Tier"
                >
                  7.9
                </div>
              </div>

              {/* Sub-scores */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: '10.5px', color: '#1a4e70' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>FastAPI & Python:</span>
                  <strong>7.9</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Flutter Mobile:</span>
                  <strong>7.9</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Redis & Backend:</span>
                  <strong>7.8</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Linux VPS / E2EE:</span>
                  <strong>7.9</strong>
                </div>
              </div>

              <div style={{ fontSize: '9.5px', color: '#455a64', borderTop: '1px solid #b8d4ec', paddingTop: 5 }}>
                Determined by verified project implementations
              </div>
            </div>

            {/* ── 3. Yogyakarta Weather Atmosphere Gadget ── */}
            <div
              style={{
                position: 'relative',
                width: 170,
                borderRadius: 8,
                background: 'linear-gradient(180deg, rgba(235, 248, 255, 0.75) 0%, rgba(200, 235, 255, 0.65) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                boxShadow: '0 8px 22px rgba(5, 30, 60, 0.2), inset 0 1px 0 #ffffff',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                userSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#546e7a' }}>Yogyakarta, ID</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#0d3a5c' }}>29°C</div>
                </div>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff176 0%, #fbc02d 60%, #f57f17 100%)',
                    boxShadow: '0 0 16px rgba(255, 213, 79, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FiSun size={20} color="#ffffff" />
                </div>
              </div>
              <div style={{ fontSize: '10px', color: '#1565c0', fontWeight: 600 }}>
                Aero Clear Sky · 68% Humidity
              </div>
            </div>

            {/* ── 4. Frutiger Aero Ambient Equalizer Gadget ── */}
            <div
              style={{
                position: 'relative',
                width: 170,
                borderRadius: 8,
                background: 'linear-gradient(180deg, rgba(240, 248, 255, 0.75) 0%, rgba(210, 235, 252, 0.65) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                boxShadow: '0 8px 22px rgba(5, 30, 60, 0.2), inset 0 1px 0 #ffffff',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                userSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0d3a5c' }}>
                  Aero Atmosphere
                </span>
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  style={{
                    border: 'none',
                    background: isPlayingAudio ? '#00e676' : '#90a4ae',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title={isPlayingAudio ? 'Pause Visualizer' : 'Start Audio Waves'}
                >
                  {isPlayingAudio ? <FiVolume2 size={11} /> : <FiVolumeX size={11} />}
                </button>
              </div>

              {/* Animated Equalizer Visualizer */}
              <div
                style={{
                  height: 32,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 3,
                  padding: '2px 4px',
                  background: 'rgba(10, 30, 50, 0.75)',
                  borderRadius: 4,
                  border: '1px solid #1e3852',
                }}
              >
                {equalizerBars.map((height, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: `${isPlayingAudio ? height : 15}%`,
                      background: 'linear-gradient(180deg, #69f0ae 0%, #00e676 50%, #00b0ff 100%)',
                      borderRadius: '1px 1px 0 0',
                      transition: 'height 0.18s ease',
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: '9.5px', color: '#546e7a' }}>
                {isPlayingAudio ? 'Synthesizing 2007 optimistic vibes' : 'Visualizer standby'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
