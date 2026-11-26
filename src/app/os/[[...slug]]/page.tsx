import type { Metadata } from 'next';
import OsShellClient from '@/components/legacy/OsShellClient';

export const metadata: Metadata = {
  title: 'Desktop mode: Elyuzar Fazlurrahman',
};

export default function OsPage() {
  return <OsShellClient />;
}
