'use client';

import dynamic from 'next/dynamic';

const OsShellApp = dynamic(() => import('./OsShellApp'), { ssr: false });

export default function OsShellClient() {
  return <OsShellApp />;
}
