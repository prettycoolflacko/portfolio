'use client';

import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import BrutalButton from '@/components/ui/BrutalButton';

interface ModalFrameProps {
  open: boolean;
  onClose: () => void;
  title: string;
  headerColor?: string;
  titleId: string;
  maxWidthClass?: string;
  children: ReactNode;
}

export default function ModalFrame({
  open,
  onClose,
  title,
  headerColor = '#F5DB82',
  titleId,
  maxWidthClass = 'max-w-2xl',
  children,
}: ModalFrameProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const backdropTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.14 };
  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: 'easeOut' as const };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          className="fixed inset-0 z-50 bg-[#111111]/65 flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={panelTransition}
            className={`w-full ${maxWidthClass} max-h-[90vh] flex flex-col bg-cream border-[3px] border-ink shadow-[6px_6px_0_#111111] overflow-hidden`}
          >
            <div
              style={{ background: headerColor }}
              className="flex items-center justify-between gap-3 px-5 py-3.5 border-b-2 border-ink shrink-0"
            >
              <h2 id={titleId} className="text-extruded text-xl sm:text-2xl truncate">
                {title}
              </h2>
              <BrutalButton
                size="icon"
                color="cream"
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 shrink-0"
              >
                <X size={18} strokeWidth={2.5} aria-hidden="true" />
              </BrutalButton>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
