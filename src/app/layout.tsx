import type { Metadata } from 'next';
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['500', '700'],
  subsets: ['latin'],
  variable: '--font-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Elyuzar Fazlurrahman: Backend Engineer & Mobile Developer',
  description:
    'Portfolio of Elyuzar Fazlurrahman — building FastAPI backends, offline-first Flutter apps, and self-hosted systems.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-ui antialiased">{children}</body>
    </html>
  );
}
