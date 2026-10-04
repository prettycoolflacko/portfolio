import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowDown } from 'react-icons/fi';
import AeroSprite from './AeroSprite';
import VistaIcon from './VistaIcon';
import profileImg from '../assets/profile.webp';

const roles = ['Backend Engineer', 'Mobile Developer', 'Data Enthusiast', 'Full-Stack Developer'];

/* ── Typing effect (ref-based, no re-render cascade) ── */
function useTypingEffect(strings, typeSpeed = 80, deleteSpeed = 45, pause = 2200) {
  const [text, setText] = useState('');
  const state = useRef({ text: '', idx: 0, deleting: false, paused: false });

  useEffect(() => {
    let timer;
    const tick = () => {
      const s = state.current;
      const cur = strings[s.idx];
      if (s.paused) return;
      if (!s.deleting) {
        s.text = cur.slice(0, s.text.length + 1);
        setText(s.text);
        if (s.text.length === cur.length) {
          s.paused = true;
          timer = setTimeout(() => { s.paused = false; s.deleting = true; tick(); }, pause);
          return;
        }
      } else {
        s.text = cur.slice(0, s.text.length - 1);
        setText(s.text);
        if (s.text.length === 0) { s.deleting = false; s.idx = (s.idx + 1) % strings.length; }
      }
      timer = setTimeout(tick, s.deleting ? deleteSpeed : typeSpeed);
    };
    timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [strings, typeSpeed, deleteSpeed, pause]);

  return text;
}

const socials = [
  { sprite: 'github',    href: 'https://github.com/prettycoolflacko',   label: 'GitHub' },
  { sprite: 'linkedin',  href: 'https://www.linkedin.com/in/elyuzar-f', label: 'LinkedIn' },
  { sprite: 'instagram', href: 'https://instagram.com/elyuzar_f',       label: 'Instagram' },
];

export default function Hero() {
  const typed = useTypingEffect(roles);

  return (
    <section id="hero" style={{ position:'relative', padding:'2.5rem 0 3rem' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        {/* Windows 7 Welcome Panel (Square edges) */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5 }}
          className="glass-panel"
          style={{ padding:'2.25rem 2rem', textAlign:'center', borderRadius: 3 }}
        >
          {/* Windows 7 User Account Tile Frame (Square!) */}
          <motion.div
            initial={{ opacity:0, scale:0.9 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.5, delay:0.1 }}
            style={{ display:'flex', justifyContent:'center', marginBottom:'1.25rem' }}
          >
            <div className="win7-avatar-frame">
              <div className="win7-avatar-inner" style={{ width:120, height:120, position:'relative' }}>
                <div style={{
                  position:'absolute', top:0, left:0, right:0, height:'45%',
                  background:'linear-gradient(180deg,rgba(255,255,255,0.45) 0%,transparent 100%)',
                  zIndex:2, pointerEvents:'none',
                }} />
                <img src={profileImg} alt="Elyuzar Fazlurrahman"
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.2, duration:0.4 }}
            style={{ color:'#0288d1', fontWeight:700, fontSize:'0.9rem', marginBottom:'0.25rem', letterSpacing:'0.04em' }}
          >
            Computer Science Student · UPN Veteran Yogyakarta
          </motion.p>

          <motion.h1
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.3, duration:0.5 }}
            style={{
              fontFamily:'var(--font-display)',
              fontWeight:800,
              fontSize:'clamp(1.8rem, 4.5vw, 2.8rem)',
              color:'#0d3a5c',
              textShadow:'0 1px 2px rgba(255,255,255,0.80)',
              margin:0,
            }}
          >
            Elyuzar Fazlurrahman
          </motion.h1>

          {/* Typing effect */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4, duration:0.4 }}
            style={{ height:'2.2rem', display:'flex', alignItems:'center', justifyContent:'center', margin:'0.5rem 0 1rem' }}
          >
            <span style={{
              fontFamily:'var(--font-body)',
              fontWeight:700,
              fontSize:'1.15rem',
              color:'#1a5276',
              background: 'linear-gradient(180deg, #f0f7ff, #e3effa)',
              border: '1px solid #adcbe8',
              padding: '2px 14px',
              borderRadius: 2,
              boxShadow: 'inset 0 1px 0 #ffffff',
            }}>
              {typed}
            </span>
            <span style={{
              display:'inline-block', width:2, height:'1.1em', background:'#0288d1',
              marginLeft:4, verticalAlign:'text-bottom',
              animation:'blink 1s step-end infinite',
            }} />
          </motion.div>

          <motion.p
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.4 }}
            style={{ color:'#4a7190', fontSize:'0.98rem', maxWidth:540, margin:'0 auto 1.75rem', lineHeight:1.6 }}
          >
            Building high-performance backends, responsive mobile applications, and intelligent systems that solve real problems.
          </motion.p>

          {/* Windows 7 Aero Push Buttons (Square!) */}
          <motion.div
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6, duration:0.4 }}
            style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap', marginBottom:'1.5rem' }}
          >
            <a href="#projects" className="aero-btn aero-btn-sky">
              <FiArrowDown style={{ position:'relative', zIndex:1 }} />
              <span style={{ position:'relative', zIndex:1 }}>View My Work</span>
            </a>
            <a href="./assets/Elyuzar_CV.pdf" download className="aero-btn">
              <FiDownload style={{ position:'relative', zIndex:1 }} />
              <span style={{ position:'relative', zIndex:1 }}>Download CV</span>
            </a>
            <a href="#contact" className="aero-btn aero-btn-green">
              <VistaIcon id="envelope" size={17} />
              <span style={{ position:'relative', zIndex:1 }}>Get in Touch</span>
            </a>
          </motion.div>

          {/* Social icons (Square Windows 7 buttons) */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7, duration:0.4 }}
            style={{ display:'flex', gap:'0.6rem', justifyContent:'center' }}
          >
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label} style={{ display:'inline-block' }}>
                <AeroSprite id={s.sprite} size={40} title={s.label} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Inline blink keyframe */}
      <style>{`@keyframes blink{50%{opacity:0}}`}</style>
    </section>
  );
}
