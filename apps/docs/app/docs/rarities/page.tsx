'use client';

import Link from 'next/link';
import { PrismoCard } from '@prismojs/react';

const RARITIES = [
  { rarity: 'common', label: 'Common', description: 'No foil overlay — base card only.' },
  { rarity: 'rare holo', label: 'Rare Holo', description: 'Classic holographic strip with rainbow bars.' },
  { rarity: 'rare holo v', label: 'Holo V', description: 'Full-face rainbow gradient with metallic scan lines.' },
  { rarity: 'rare holo vmax', label: 'VMAX', description: 'Textured cosmic foil with deep color-burn blends.' },
  { rarity: 'rare holo vstar', label: 'VSTAR', description: 'Etched pattern overlay with dual-layer exclusion.' },
  { rarity: 'rare rainbow', label: 'Rainbow', description: 'Full rainbow secret with glitter texture.' },
  { rarity: 'rare rainbow alt', label: 'Rainbow Alt', description: 'Alternate art rainbow with higher contrast.' },
  { rarity: 'rare secret', label: 'Gold Secret', description: 'Gold metallic foil with glitter accents.' },
  { rarity: 'rare ultra', label: 'Ultra Rare', description: 'Illusion pattern overlay with exclusion blend.' },
  { rarity: 'radiant', label: 'Radiant', description: 'Etched linear pattern with green-yellow hue cycle.' },
  { rarity: 'custom', label: 'Custom', description: 'Provide your own image overlay via the image prop.' },
] as const;

export default function RaritiesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        <Link href="/docs" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', textDecoration: 'none' }}>
          &larr; Docs
        </Link>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '2rem 0 1rem',
          }}
        >
          Rarity Catalogue
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
          Hover or touch each card to see the holographic effect in action.
          Pass the <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.9em' }}>rarity</code> prop to switch between effects.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {RARITIES.map(({ rarity, label, description }) => (
            <div key={rarity} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <PrismoCard rarity={rarity} gallery>
                <img
                  src={`data:image/svg+xml,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="336" viewBox="0 0 240 336">
                      <defs>
                        <linearGradient id="bg" x1="0" y1="0" x2="0.5" y2="1">
                          <stop offset="0%" stop-color="#0f0f1a"/>
                          <stop offset="50%" stop-color="#1a1a2e"/>
                          <stop offset="100%" stop-color="#0f0f1a"/>
                        </linearGradient>
                      </defs>
                      <rect width="240" height="336" rx="12" fill="url(#bg)"/>
                      <rect x="1" y="1" width="238" height="334" rx="11" fill="none" stroke="white" stroke-opacity="0.06"/>
                      <text x="120" y="162" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="18" fill="white" opacity="0.7">${label}</text>
                      <text x="120" y="186" text-anchor="middle" font-family="monospace" font-size="10" fill="white" opacity="0.25">${rarity}</text>
                    </svg>`
                  )}`}
                  alt={label}
                  style={{ width: '240px', height: '336px', borderRadius: '12px' }}
                />
              </PrismoCard>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  maxWidth: '220px',
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
