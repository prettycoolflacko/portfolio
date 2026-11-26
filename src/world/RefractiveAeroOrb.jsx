import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * The Signature Refractive Glass Orb
 * Positioned in the Hero section:
 * - Multi-layered skeuomorphic glass sphere with specular glare tracking cursor
 * - Concentric chromatic aberration ring and translucent core
 * - Interactive: Hover expansion, click burst ripple, and quick-scroll to projects
 */
export default function RefractiveAeroOrb() {
  const orbRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glintPos, setGlintPos] = useState({ x: 32, y: 24 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    setTilt({
      x: normY * -16,
      y: normX * 16,
    });

    setGlintPos({
      x: 35 + normX * 18,
      y: 25 + normY * 18,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlintPos({ x: 32, y: 24 });
    setIsHovered(false);
  };

  const handleOrbClick = () => {
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 800,
        margin: '0 auto',
        width: 260,
        height: 260,
        userSelect: 'none',
      }}
    >
      {/* Outer ambient radiant aura */}
      <div
        style={{
          position: 'absolute',
          inset: -25,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129, 212, 250, 0.5) 0%, rgba(38, 198, 218, 0.25) 45%, transparent 70%)',
          filter: 'blur(25px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Glass Orb Body */}
      <motion.div
        ref={orbRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleOrbClick}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.06 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          position: 'relative',
          width: 220,
          height: 220,
          borderRadius: '50%',
          cursor: 'pointer',
          background: `
            radial-gradient(circle at ${glintPos.x}% ${glintPos.y}%, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(255, 255, 255, 0.5) 18%, 
              rgba(179, 229, 252, 0.4) 42%, 
              rgba(2, 136, 209, 0.45) 75%, 
              rgba(1, 87, 155, 0.7) 100%
            )
          `,
          boxShadow: `
            0 24px 50px rgba(1, 87, 155, 0.38),
            0 8px 18px rgba(0, 0, 0, 0.12),
            inset 0 3px 6px rgba(255, 255, 255, 0.95),
            inset 0 -8px 20px rgba(0, 40, 85, 0.5)
          `,
          border: '2px solid rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="Refractive Aero Orb · Click to explore projects"
      >
        {/* Specular curved primary crescent glare */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '14%',
            width: '52%',
            height: '32%',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.1) 100%)',
            transform: 'rotate(-25deg)',
            pointerEvents: 'none',
          }}
        />

        {/* Secondary bottom rim reflection */}
        <div
          style={{
            position: 'absolute',
            bottom: '12%',
            right: '18%',
            width: '28%',
            height: '18%',
            borderRadius: '50%',
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.1) 100%)',
            transform: 'rotate(-15deg)',
            pointerEvents: 'none',
          }}
        />

        {/* Core Monogram / Inner Emblem */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textShadow: '0 2px 6px rgba(0, 30, 70, 0.5)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '32px',
              fontWeight: 900,
              letterSpacing: '-1px',
              color: '#ffffff',
              lineHeight: 1,
            }}
          >
            EF
          </span>
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: '#e1f5fe',
              marginTop: '4px',
              textTransform: 'uppercase',
            }}
          >
            Aero Core
          </span>
        </div>
      </motion.div>
    </div>
  );
}

