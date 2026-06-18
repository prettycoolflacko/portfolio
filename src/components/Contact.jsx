import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiInstagram, FiSend, FiGlobe } from 'react-icons/fi';

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'elyuzarf@gmail.com', href: 'mailto:elyuzarf@gmail.com' },
  { icon: FiPhone, label: 'Phone', value: '+62 812-2794-8664', href: 'tel:+6281227948664' },
  { icon: FiGlobe, label: 'Portfolio', value: 'portfolio.anirveda.rocks', href: 'https://portfolio.anirveda.rocks' },
];

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/prettycoolflacko', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/elyuzar-f', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://instagram.com/elyuzar_f', label: 'Instagram' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:elyuzarf@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative bg-[var(--color-bg-secondary)]">
      <hr className="gradient-divider" />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="section-title mx-auto">Get In Touch</h2>
          <p className="section-subtitle mx-auto mt-4">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-6 mb-10">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="glass-card p-6 flex items-center gap-6 no-underline group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] border border-[rgba(0,201,255,0.12)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <info.icon className="text-lg" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[var(--color-text-muted)] text-xs font-[var(--font-mono)]">
                      {info.label}
                    </p>
                    <p className="text-[var(--color-text-primary)] text-sm font-medium group-hover:text-[var(--color-accent)] transition-colors break-all">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-glass)] flex items-center justify-center text-[var(--color-text-secondary)] text-lg transition-all duration-300 hover:border-[var(--color-border-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_15px_var(--color-accent-glow)] hover:-translate-y-1"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-10 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-3">
              <label
                htmlFor="contact-name"
                className="block text-[var(--color-text-secondary)] text-xs font-[var(--font-mono)] uppercase tracking-wider"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl px-5 py-4 text-sm text-[var(--color-text-primary)] font-[var(--font-body)] placeholder:text-[var(--color-text-muted)] outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:shadow-[0_0_10px_var(--color-accent-glow)]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="contact-email"
                className="block text-[var(--color-text-secondary)] text-xs font-[var(--font-mono)] uppercase tracking-wider"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl px-5 py-4 text-sm text-[var(--color-text-primary)] font-[var(--font-body)] placeholder:text-[var(--color-text-muted)] outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:shadow-[0_0_10px_var(--color-accent-glow)]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="contact-message"
                className="block text-[var(--color-text-secondary)] text-xs font-[var(--font-mono)] uppercase tracking-wider"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your message..."
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl px-5 py-4 text-sm text-[var(--color-text-primary)] font-[var(--font-body)] placeholder:text-[var(--color-text-muted)] outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:shadow-[0_0_10px_var(--color-accent-glow)] resize-none leading-relaxed"
              />
            </div>

            <button type="submit" className="btn-glow justify-center mt-4">
              <FiSend className="text-lg" />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
