import { useState } from 'react';
import VistaIcon from '../components/VistaIcon';
import AeroSprite from '../components/AeroSprite';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('elyuzarf@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      const sub = encodeURIComponent(form.subject || `Portfolio Contact from ${form.name}`);
      const bod = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.location.href = `mailto:elyuzarf@gmail.com?subject=${sub}&body=${bod}`;
    }, 1000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="md:grid-cols-[1.4fr_1fr]">
      {/* ── Windows Live Mail Compose Window (Left) ── */}
      <div style={{ background: '#ffffff', border: '1px solid #94b2d1', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
        {/* Ribbon toolbar */}
        <div style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #ebf1f7 100%)', borderBottom: '1px solid #c2d7eb', padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={handleSubmit}
              className="aero-btn aero-btn-sky"
              style={{ fontSize: '12px', padding: '4px 14px', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <VistaIcon id="mailsend" size={16} />
              <strong>Send Message</strong>
            </button>

            <span style={{ height: 16, width: 1, background: '#c2d7eb' }} />

            <span style={{ fontSize: '11.5px', color: '#546e7a' }}>
              Windows Live Mail · New Message
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="aero-btn"
            style={{ fontSize: '11px', padding: '3px 10px' }}
          >
            {copiedEmail ? 'Copied elyuzarf@gmail.com!' : 'Copy Email Address'}
          </button>
        </div>

        {/* Sending progress bar animation */}
        {isSending && (
          <div style={{ height: 4, width: '100%', background: '#e0e0e0', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #4fc3f7, #00e676, #4fc3f7)',
                animation: 'win7-progress-glow 1s linear infinite',
              }}
            />
          </div>
        )}

        {sentSuccess && (
          <div style={{ background: '#e8f5e9', borderBottom: '1px solid #c8e6c9', padding: '8px 14px', fontSize: '12px', color: '#2e7d32' }}>
            Message prepared. Opening your default mail client with pre-filled fields...
          </div>
        )}

        {/* Message Header Fields */}
        <form onSubmit={handleSubmit} style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', alignItems: 'center', gap: 8 }}>
            <label htmlFor="c-to" style={{ fontWeight: 600, color: '#455a64' }}>To:</label>
            <input
              id="c-to"
              type="text"
              readOnly
              value="Elyuzar Fazlurrahman <elyuzarf@gmail.com>"
              className="aero-input"
              style={{ background: '#f5f5f5', color: '#1e395b', fontWeight: 600 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', alignItems: 'center', gap: 8 }}>
            <label htmlFor="c-name" style={{ fontWeight: 600, color: '#455a64' }}>From:</label>
            <input
              id="c-name"
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="aero-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', alignItems: 'center', gap: 8 }}>
            <label htmlFor="c-email" style={{ fontWeight: 600, color: '#455a64' }}>Reply-To:</label>
            <input
              id="c-email"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="aero-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', alignItems: 'center', gap: 8 }}>
            <label htmlFor="c-subject" style={{ fontWeight: 600, color: '#455a64' }}>Subject:</label>
            <input
              id="c-subject"
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Project inquiry or internship discussion"
              className="aero-input"
            />
          </div>

          {/* Message Body */}
          <div style={{ marginTop: 4 }}>
            <label htmlFor="c-message" style={{ display: 'block', fontWeight: 600, color: '#455a64', marginBottom: 4 }}>
              Message Body:
            </label>
            <textarea
              id="c-message"
              name="message"
              required
              rows={8}
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message here. Pressing 'Send Message' will open your email app with these fields pre-filled."
              className="aero-input"
              style={{ resize: 'vertical', lineHeight: 1.55 }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="submit" className="aero-btn aero-btn-sky" style={{ fontSize: '12px', padding: '6px 18px' }}>
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* ── Contact Card Sidebar (Right) ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Address Book Card */}
        <div className="win7-groupbox" style={{ margin: 0 }}>
          <span className="win7-groupbox-legend">Contact Information</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <VistaIcon id="userfolder" size={38} />
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0d3a5c' }}>
                Elyuzar Fazlurrahman
              </div>
              <div style={{ fontSize: '11px', color: '#546e7a' }}>
                Informatics Student & Developer
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <VistaIcon id="envelope" size={18} />
              <div>
                <div style={{ fontSize: '10.5px', color: '#78909c' }}>Email:</div>
                <a href="mailto:elyuzarf@gmail.com" style={{ color: '#0288d1', textDecoration: 'none', fontWeight: 700 }}>
                  elyuzarf@gmail.com
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <VistaIcon id="phone" size={18} />
              <div>
                <div style={{ fontSize: '10.5px', color: '#78909c' }}>Phone / WhatsApp:</div>
                <a href="tel:+6281227948664" style={{ color: '#1e395b', textDecoration: 'none', fontWeight: 600 }}>
                  +62 812-2794-8664
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <VistaIcon id="earth" size={18} />
              <div>
                <div style={{ fontSize: '10.5px', color: '#78909c' }}>Location:</div>
                <span style={{ color: '#1e395b', fontWeight: 600 }}>Yogyakarta, Indonesia</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 8, marginTop: 4 }}>
              <a
                href="./assets/Elyuzar_CV.pdf"
                download
                className="aero-btn aero-btn-sky"
                style={{ width: '100%', fontSize: '11.5px', padding: '6px 12px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <VistaIcon id="document" size={16} />
                Download Resume (CV.pdf)
              </a>
            </div>
          </div>
        </div>

        {/* Online Profiles */}
        <div className="win7-groupbox" style={{ margin: 0 }}>
          <span className="win7-groupbox-legend">Online Profiles</span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '12px' }}>
            <a
              href="https://github.com/prettycoolflacko"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#1e395b', padding: '6px 8px', borderRadius: 2 }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e3f2fd')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <VistaIcon id="earth" size={16} />
              <span>GitHub: @prettycoolflacko ↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/elyuzar-f"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#1e395b', padding: '6px 8px', borderRadius: 2 }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e3f2fd')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <AeroSprite id="linkedin" size={16} />
              <span>LinkedIn: Elyuzar Fazlurrahman ↗</span>
            </a>

            <a
              href="https://instagram.com/elyuzar_f"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#1e395b', padding: '6px 8px', borderRadius: 2 }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e3f2fd')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <AeroSprite id="instagram" size={16} />
              <span>Instagram: @elyuzar_f ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
