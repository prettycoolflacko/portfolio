'use client';

import { useState, type FormEvent } from 'react';
import { Send, Mail, FileText } from 'lucide-react';
import { profile, socials } from '@/data/portfolio';
import ModalFrame from '@/components/modals/ModalFrame';
import BrutalButton from '@/components/ui/BrutalButton';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [openedMailClient, setOpenedMailClient] = useState(false);

  const githubSocial = socials.find((s) => s.id === 'github');
  const linkedinSocial = socials.find((s) => s.id === 'linkedin');

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(profile.email).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${cleanName}`
    )}&body=${encodeURIComponent(`From: ${cleanName} (${cleanEmail})\n\n${cleanMessage}`)}`;

    window.location.href = mailtoUrl;
    setOpenedMailClient(true);
  };

  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      title="LET'S TALK"
      headerColor="#F5DB82"
      titleId="contact-modal-title"
      maxWidthClass="max-w-xl"
    >
      <div>
        <div>
          <span className="block font-ui font-bold uppercase text-xs tracking-[0.04em] text-ink mb-2">
            DIRECT EMAIL
          </span>
          <div className="flex items-center gap-2">
            <div className="border-2 border-ink px-3 py-2 font-mono text-xs sm:text-sm truncate flex-1 bg-cream text-ink">
              {profile.email}
            </div>
            <BrutalButton color="peach" size="sm" onClick={handleCopy}>
              {copied ? 'COPIED!' : 'COPY'}
            </BrutalButton>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 pt-5 border-t-2 border-ink space-y-3">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-ui font-bold uppercase text-xs tracking-[0.04em] text-ink mb-1"
            >
              NAME
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border-2 border-ink bg-cream px-3 py-2 font-ui text-sm text-ink focus:outline-2 focus:outline-dashed focus:outline-ink"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-ui font-bold uppercase text-xs tracking-[0.04em] text-ink mb-1"
            >
              YOUR EMAIL
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border-2 border-ink bg-cream px-3 py-2 font-ui text-sm text-ink focus:outline-2 focus:outline-dashed focus:outline-ink"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-ui font-bold uppercase text-xs tracking-[0.04em] text-ink mb-1"
            >
              MESSAGE
            </label>
            <textarea
              id="contact-message"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about the role or project..."
              className="w-full border-2 border-ink bg-cream px-3 py-2 font-ui text-sm text-ink focus:outline-2 focus:outline-dashed focus:outline-ink resize-y"
            />
          </div>

          {openedMailClient && (
            <div
              role="status"
              className="border-2 border-ink bg-accent-yellow px-3 py-2 text-xs font-ui font-bold uppercase text-ink"
            >
              YOUR EMAIL CLIENT HAS BEEN OPENED WITH YOUR MESSAGE DRAFTED TO {profile.email}.
            </div>
          )}

          <BrutalButton type="submit" color="yellow" className="w-full">
            <Send size={15} strokeWidth={2.5} aria-hidden="true" />
            <span>SEND VIA EMAIL APP</span>
          </BrutalButton>
        </form>

        <div className="mt-5 pt-4 border-t-2 border-ink flex flex-wrap gap-2">
          {githubSocial && (
            <BrutalButton color="cream" size="sm" href={githubSocial.href} external>
              {githubSocial.iconPath && (
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                  <path d={githubSocial.iconPath} fill="#111111" />
                </svg>
              )}
              <span>GITHUB</span>
            </BrutalButton>
          )}
          {linkedinSocial && (
            <BrutalButton color="cream" size="sm" href={linkedinSocial.href} external>
              <span className="font-display text-sm leading-none lowercase" aria-hidden="true">
                in
              </span>
              <span>LINKEDIN</span>
            </BrutalButton>
          )}
          <BrutalButton color="cream" size="sm" href={`mailto:${profile.email}`}>
            <Mail size={14} strokeWidth={2.5} aria-hidden="true" />
            <span>MAILTO</span>
          </BrutalButton>
          <BrutalButton color="cream" size="sm" href={profile.cv} download>
            <FileText size={14} strokeWidth={2.5} aria-hidden="true" />
            <span>DOWNLOAD CV</span>
          </BrutalButton>
        </div>
      </div>
    </ModalFrame>
  );
}
