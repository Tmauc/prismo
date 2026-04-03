'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  RevealOnScroll,
  StaggerReveal,
  HorizontalScroll,
  MagneticWrap,
  SplitText,
} from '@/components/GsapAnimations';
import { PrismoCard } from '@prismojs/react';

gsap.registerPlugin(ScrollTrigger);

const HoloScene = dynamic(
  () => import('@/components/HoloScene').then((m) => ({ default: m.HoloScene })),
  { ssr: false }
);

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════ */

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Parallax fade on scroll
    const tween = gsap.to(el, {
      opacity: 0,
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particles background */}
      <HoloScene />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '900px',
        }}
      >
        {/* Version badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: '100px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            background: 'rgba(139, 92, 246, 0.08)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-violet)',
            marginBottom: '2rem',
            letterSpacing: '0.05em',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)' }} />
          v1.0.0
        </div>

        {/* Title */}
        <SplitText
          text="prismo"
          tag="h1"
          className="text-prismatic"
          immediate
          delay={0.3}
        />
        <style jsx global>{`
          h1.text-prismatic {
            font-family: var(--font-display);
            font-weight: 800;
            font-size: clamp(3rem, 11vw, 8.5rem);
            line-height: 1;
            letter-spacing: -0.03em;
            justify-content: center;
            margin-bottom: 1.5rem;
          }
          @media (max-width: 600px) {
            h1.text-prismatic {
              flex-wrap: wrap !important;
            }
            /* Break after the hyphen */
            h1.text-prismatic .split-char-break {
              flex-basis: 100%;
              height: 0;
            }
          }
        `}</style>

        {/* Tagline */}
        <RevealOnScroll delay={0.5} immediate>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: 'var(--text-muted)',
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
            }}
          >
            Holographic, foil & prismatic card effects for React.
            <br />
            <span style={{ color: 'var(--text-dim)' }}>
              Zero dependencies. Pure CSS animations. 60fps.
            </span>
          </p>
        </RevealOnScroll>

        {/* CTAs */}
        <RevealOnScroll delay={0.7} immediate>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <MagneticWrap>
              <a
                href="/docs"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '10px',
                  background: 'var(--prismatic)',
                  backgroundSize: '200% 200%',
                  animation: 'prismatic-shift 3s ease infinite',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-display)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                Get Started
                <span style={{ fontSize: '1.2em' }}>&#8594;</span>
              </a>
            </MagneticWrap>

            <MagneticWrap>
              <a
                href="https://github.com/tmauc/prismo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-display)',
                  textDecoration: 'none',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                GitHub
              </a>
            </MagneticWrap>
          </div>
        </RevealOnScroll>

        {/* Install command */}
        <RevealOnScroll delay={0.9} immediate>
          <div
            style={{
              marginTop: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ color: 'var(--accent-cyan)' }}>$</span>
            npm i @prismojs/react
          </div>
        </RevealOnScroll>

      </div>

      {/* Scroll indicator — positioned relative to the section */}
      <div
        style={{
          position: 'absolute',
          bottom: '3vh',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'float-down 2s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          scroll
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ opacity: 0.4 }}>
          <path d="M8 4V20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RARITY GALLERY — Horizontal scroll showcase
   ═══════════════════════════════════════════════════════════════ */

const RARITIES = [
  { rarity: 'rare holo', label: 'Holo', color: '#00d4ff' },
  { rarity: 'rare holo v', label: 'Holo V', color: '#8b5cf6' },
  { rarity: 'rare holo vmax', label: 'VMAX', color: '#ff2d8a' },
  { rarity: 'rare holo vstar', label: 'VSTAR', color: '#f5c542' },
  { rarity: 'rare rainbow', label: 'Rainbow', color: '#22c55e' },
  { rarity: 'rare rainbow alt', label: 'Rainbow Alt', color: '#ff2d8a' },
  { rarity: 'rare secret', label: 'Gold Secret', color: '#f5c542' },
  { rarity: 'rare ultra', label: 'Ultra Rare', color: '#8b5cf6' },
] as const;

function GalleryHeader() {
  return (
    <div style={{ padding: '2rem 1.5rem 1rem', textAlign: 'center', width: '100vw', maxWidth: '100%' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--accent-cyan)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}
      >
        Rarity Collection
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.3rem, 4vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        10+ holographic effects.
        <br />
        <span style={{ color: 'var(--text-dim)' }}>One component.</span>
      </h2>
    </div>
  );
}

function GallerySection() {
  return (
    <section style={{ padding: '6rem 0 0', position: 'relative' }}>
      <HorizontalScroll header={<GalleryHeader />}>
        {/* Spacer */}
        <div style={{ minWidth: '10vw', flexShrink: 0 }} />

        {RARITIES.map(({ rarity, label, color }) => (
          <div
            key={rarity}
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <PrismoCard rarity={rarity} gallery>
              <img
                src={`data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="390" viewBox="0 0 280 390">
                    <defs>
                      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="${color}" stop-opacity="0.12"/>
                        <stop offset="50%" stop-color="#0a0a14" stop-opacity="1"/>
                        <stop offset="100%" stop-color="${color}" stop-opacity="0.06"/>
                      </linearGradient>
                    </defs>
                    <rect width="280" height="390" rx="12" fill="url(#bg)"/>
                    <rect x="1" y="1" width="278" height="388" rx="11" fill="none" stroke="${color}" stroke-opacity="0.2"/>
                    <text x="140" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="20" fill="${color}" opacity="0.8">${label}</text>
                  </svg>`
                )}`}
                alt={label}
                className="gallery-card-img"
                style={{ borderRadius: '12px' }}
              />
            </PrismoCard>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.1em',
              }}
            >
              {rarity}
            </span>
          </div>
        ))}

        {/* Spacer */}
        <div style={{ minWidth: '10vw', flexShrink: 0 }} />
      </HorizontalScroll>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════════════════════════════════ */

const FEATURES = [
  {
    icon: '0',
    title: 'Zero Dependencies',
    description: 'Pure CSS animations. No spring libraries, no animation frameworks. Just React + CSS custom properties.',
    accent: 'var(--accent-cyan)',
  },
  {
    icon: '60',
    title: '60fps Smooth',
    description: 'Pointer tracking via requestAnimationFrame. GPU-accelerated transforms. No jank, even on mobile.',
    accent: 'var(--accent-green)',
  },
  {
    icon: '10+',
    title: 'Rarity Types',
    description: 'Holo, V, VMAX, VSTAR, Rainbow, Secret Gold, Ultra Rare, Radiant, and custom overlay support.',
    accent: 'var(--accent-violet)',
  },
  {
    icon: '~3',
    title: 'KB Gzipped',
    description: 'Tiny JavaScript footprint. The CSS handles all the visual complexity. Tree-shakeable exports.',
    accent: 'var(--accent-magenta)',
  },
];

function FeaturesSection() {
  return (
    <section style={{ padding: '8rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <RevealOnScroll>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent-magenta)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Why prismo
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 4vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '4rem',
          }}
        >
          Craft meets
          <span className="text-prismatic"> performance</span>.
        </h2>
      </RevealOnScroll>

      <StaggerReveal
        className=""
        stagger={0.15}
      >
        {FEATURES.map(({ icon, title, description, accent }) => (
          <div
            key={title}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '1.5rem',
              padding: '2rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: `${accent}0a`,
                border: `1px solid ${accent}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: accent,
              }}
            >
              {icon}
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '0.4rem',
                }}
              >
                {title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </StaggerReveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CODE SECTION
   ═══════════════════════════════════════════════════════════════ */

function CodeSection() {
  return (
    <section style={{ padding: '4rem 2rem 8rem', maxWidth: '900px', margin: '0 auto' }}>
      <RevealOnScroll>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Quick Start
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 4vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '3rem',
          }}
        >
          Three lines. <span style={{ color: 'var(--text-dim)' }}>That&apos;s it.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'var(--bg-surface)',
            position: 'relative',
          }}
        >
          {/* Prismatic top border */}
          <div
            style={{
              height: '2px',
              background: 'var(--prismatic)',
              backgroundSize: '200% 100%',
              animation: 'prismatic-shift 3s ease infinite',
            }}
          />

          {/* Window chrome */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-dim)',
              }}
            >
              App.tsx
            </span>
          </div>

          {/* Code */}
          <pre
            style={{
              padding: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: 1.7,
              overflowX: 'auto',
              margin: 0,
            }}
          >
            <code>
              <Line dim>
                <K>import</K> {'{'} <V>PrismoCard</V> {'}'} <K>from</K> <S>&apos;@prismojs/react&apos;</S>;
              </Line>
              <Line dim>
                <K>import</K> <S>&apos;@prismojs/react/styles&apos;</S>;
              </Line>
              <Line />
              <Line>
                <K>export default</K> <K>function</K> <F>Card</F>() {'{'}
              </Line>
              <Line>
                {'  '}<K>return</K> (
              </Line>
              <Line highlight>
                {'    '}&lt;<V>PrismoCard</V> <A>rarity</A>=<S>&quot;rare holo v&quot;</S>&gt;
              </Line>
              <Line>
                {'      '}&lt;<T>img</T> <A>src</A>=<S>&quot;/my-card.png&quot;</S> /&gt;
              </Line>
              <Line highlight>
                {'    '}&lt;/<V>PrismoCard</V>&gt;
              </Line>
              <Line>
                {'  '});
              </Line>
              <Line>
                {'}'}
              </Line>
            </code>
          </pre>
        </div>
      </RevealOnScroll>
    </section>
  );
}

/* ─── Syntax tokens ─────────────────────────────────────────── */

function Line({ children, dim, highlight }: { children?: React.ReactNode; dim?: boolean; highlight?: boolean }) {
  return (
    <div
      style={{
        opacity: dim ? 0.5 : 1,
        background: highlight ? 'rgba(139, 92, 246, 0.06)' : undefined,
        margin: highlight ? '0 -1.5rem' : undefined,
        padding: highlight ? '0 1.5rem' : undefined,
        borderLeft: highlight ? '2px solid var(--accent-violet)' : '2px solid transparent',
        minHeight: children ? undefined : '1.4em',
      }}
    >
      {children}
    </div>
  );
}

function K({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#ff7b72' }}>{children}</span>;
}
function S({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#a5d6ff' }}>{children}</span>;
}
function F({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#d2a8ff' }}>{children}</span>;
}
function V({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#7ee787' }}>{children}</span>;
}
function A({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#ffa657' }}>{children}</span>;
}
function T({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#79c0ff' }}>{children}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   PACKAGES SECTION
   ═══════════════════════════════════════════════════════════════ */

const PACKAGES = [
  {
    name: '@prismojs/react',
    description: 'Core React component with all rarity effects and pointer tracking.',
    install: 'npm i @prismojs/react',
    accent: 'var(--accent-cyan)',
    status: 'stable',
  },
];

function PackagesSection() {
  return (
    <section style={{ padding: '4rem 2rem 8rem', maxWidth: '900px', margin: '0 auto' }}>
      <RevealOnScroll>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent-green)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Packages
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 4vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '3rem',
          }}
        >
          Install & go.
        </h2>
      </RevealOnScroll>

      <StaggerReveal stagger={0.12}>
        {PACKAGES.map(({ name, description, install, accent, status }) => (
          <div
            key={name}
            style={{
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'var(--bg-surface)',
              marginBottom: '1rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shimmer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                opacity: 0.5,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: accent,
                    }}
                  >
                    {name}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '100px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      color: 'var(--accent-green)',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                    }}
                  >
                    {status}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {description}
                </p>
              </div>

              <code
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {install}
              </code>
            </div>
          </div>
        ))}
      </StaggerReveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Documentation', href: '/docs' },
          { label: 'GitHub', href: 'https://github.com/tmauc/prismo' },
          { label: 'npm', href: 'https://www.npmjs.com/package/@prismojs/react' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'color 0.2s',
            }}
          >
            {label}
          </a>
        ))}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-dim)',
        }}
      >
        Built with care by{' '}
        <a
          href="https://github.com/tmauc"
          style={{ color: 'var(--accent-violet)', textDecoration: 'none' }}
        >
          tmauc
        </a>
      </p>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <HeroSection />
      <main>
        <GallerySection />
        <FeaturesSection />
        <CodeSection />
        <PackagesSection />
      </main>
      <Footer />
    </div>
  );
}
