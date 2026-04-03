import type { Metadata } from 'next';
import './globals.css';
import '../../../packages/react/src/prismo.css';

export const metadata: Metadata = {
  title: 'prismo — Holographic card effects for React',
  description:
    'CSS-only holographic, foil & prismatic card effects for React. Zero dependencies, 60fps, 10+ rarity types.',
  openGraph: {
    title: 'prismo — Holographic card effects for React',
    description:
      'CSS-only holographic, foil & prismatic card effects for React. Zero dependencies, 60fps, 10+ rarity types.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
