import type { ReactNode, MouseEventHandler } from 'react';
import Link from 'next/link';

type ButtonColor = 'yellow' | 'peach' | 'cream' | 'blue' | 'red';
type ButtonSize = 'sm' | 'md' | 'icon';

interface BrutalButtonProps {
  href?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  color?: ButtonColor;
  size?: ButtonSize;
  external?: boolean;
  download?: boolean | string;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  title?: string;
}

const COLOR_MAP: Record<ButtonColor, string> = {
  yellow: 'bg-[#F5DB82] text-[#111111]',
  peach: 'bg-[#F4B3A4] text-[#111111]',
  cream: 'bg-[#F5F0E6] text-[#111111]',
  blue: 'bg-[#8FD3E8] text-[#111111]',
  red: 'bg-[#D94B43] text-[#111111]',
};

const SIZE_MAP: Record<ButtonSize, string> = {
  icon: 'w-10 h-10',
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
};

export default function BrutalButton({
  href,
  type = 'button',
  onClick,
  color = 'cream',
  size = 'md',
  external = false,
  download,
  children,
  className = '',
  'aria-label': ariaLabel,
  title,
}: BrutalButtonProps) {
  const classes = [
    'border-2 border-ink brutal-shadow-sm brutal-press font-ui font-bold uppercase tracking-[0.04em]',
    'inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer',
    COLOR_MAP[color],
    SIZE_MAP[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    const isInternalAppRoute =
      href.startsWith('/') && !href.startsWith('/os') && !external && !download;

    if (isInternalAppRoute) {
      return (
        <Link
          href={href}
          onClick={onClick}
          className={classes}
          aria-label={ariaLabel}
          title={title}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download}
        className={classes}
        aria-label={ariaLabel}
        title={title}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </button>
  );
}
