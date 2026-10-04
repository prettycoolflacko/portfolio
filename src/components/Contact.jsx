import { useState } from 'react';
import { motion } from 'framer-motion';
import AeroSprite from './AeroSprite';
import VistaIcon from './VistaIcon';

const contactInfo = [
  { sprite: 'envelope', label: 'Email',     value: 'elyuzarf@gmail.com',         href: 'mailto:elyuzarf@gmail.com' },
  { sprite: 'phone',    label: 'Phone',     value: '+62 812-2794-8664',          href: 'tel:+6281227948664' },
  { sprite: 'web',      label: 'Portfolio', value: 'portfolio.anirveda.rocks',   href: 'https://portfolio.anirveda.rocks' },
];

const socials = [
  { sprite: 'github',    href: 'https://github.com/prettycoolflacko',   label: 'GitHub' },
  { sprite: 'linkedin',  href: 'https://www.linkedin.com/in/elyuzar-f', label: 'LinkedIn' },
  { sprite: 'instagram', href: 'https://instagram.com/elyuzar_f',       label: 'Instagram' },
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const sub = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const bod = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:elyuzarf@gmail.com?subject=${sub}&body=${bod}`;
  };

  return (
    <section id="contact" style={{ padding:'2rem 0 5rem' }}>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.4 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #c2d7eb', paddingBottom:'6px' }}>
            <VistaIcon id="envelope" size={24} title="Get In Touch" />
            <h2 style={{ fontSize:'1.3rem', fontWeight:700, color:'#0d3a5c', margin:0 }}>
              Get In Touch
            </h2>
            <span style={{ color:'#4a7190', fontSize:'0.85rem', marginLeft:'auto' }}>
              Windows Mail / Direct Contact
            </span>
          </div>
        </motion.div>

        <div style={{ display:'grid', gap:'1.5rem', gridTemplateColumns:'1fr' }}
             className="md:grid-cols-2" >
          {/* Contact info */}
          <motion.div
            initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.4 }}
            style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}
          >
            {contactInfo.map(info => (
              <a
                key={info.label}
                href={info.href}
                className="glass-card"
                style={{ padding:'1rem 1.25rem', display:'flex', alignItems:'center', gap:'12px', textDecoration:'none', borderRadius: 3 }}
              >
                <VistaIcon id={info.sprite} size={32} />
              <div style={{ minWidth:0 }}>
                  <p style={{ color:'#4a7190', fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', margin:0 }}>
                    {info.label}
                  </p>
                  <p style={{ color:'#0d3a5c', fontWeight:700, fontSize:'0.88rem', margin:'1px 0 0', wordBreak:'break-all' }}>
                    {info.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social links (Glossy sprites) */}
            <div style={{ display:'flex', gap:'10px', marginTop:'0.5rem' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label} style={{ display:'inline-block' }}>
                  <AeroSprite id={s.sprite} size={40} title={s.label} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact form (Square Windows 7 Dialog Style) */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-panel"
            style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem', borderRadius: 3 }}
            initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.4 }}
          >
            {/* Name */}
            <div style={{ display:'flex', flexDirection:'column', gap:'3px' }}>
              <label htmlFor="c-name" style={{ fontSize:'0.75rem', fontWeight:700, color:'#1e395b' }}>
                Sender Name:
              </label>
              <input
                id="c-name" type="text" name="name"
                autoComplete="name" value={form.name} onChange={handleChange} required
                placeholder="Enter your name"
                className="aero-input"
              />
            </div>

            {/* Email */}
            <div style={{ display:'flex', flexDirection:'column', gap:'3px' }}>
              <label htmlFor="c-email" style={{ fontSize:'0.75rem', fontWeight:700, color:'#1e395b' }}>
                Sender Email:
              </label>
              <input
                id="c-email" type="email" name="email"
                autoComplete="email" value={form.email} onChange={handleChange} required
                placeholder="your.email@domain.com"
                className="aero-input"
              />
            </div>

            {/* Message */}
            <div style={{ display:'flex', flexDirection:'column', gap:'3px' }}>
              <label htmlFor="c-message" style={{ fontSize:'0.75rem', fontWeight:700, color:'#1e395b' }}>
                Message Body:
              </label>
              <textarea
                id="c-message" name="message"
                autoComplete="off" value={form.message} onChange={handleChange} required
                rows={4} placeholder="Type your message here..."
                className="aero-input"
                style={{ resize:'vertical', lineHeight:1.5 }}
              />
            </div>

            <button type="submit" className="aero-btn aero-btn-sky" style={{ width:'100%', fontSize:'13px', padding:'8px 14px' }}>
              <VistaIcon id="envelope" size={17} />
              <span style={{ position:'relative', zIndex:1 }}>Send Message</span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
