import { FiGithub, FiLinkedin, FiInstagram, FiHeart } from 'react-icons/fi';

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/prettycoolflacko', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/elyuzar-f', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://instagram.com/elyuzar_f', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 text-[var(--color-text-muted)] text-sm">
          <span>Built with</span>
          <FiHeart className="text-[var(--color-accent)] mx-1" />
          <span>by</span>
          <a
            href="https://github.com/prettycoolflacko"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors no-underline ml-1"
          >
            Elyuzar Fazlurrahman
          </a>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-lg"
            >
              <social.icon />
            </a>
          ))}
        </div>

        <p className="text-[var(--color-text-muted)] text-xs font-[var(--font-mono)]">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
