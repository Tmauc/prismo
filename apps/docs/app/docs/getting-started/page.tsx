import Link from 'next/link';

export default function GettingStarted() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        <Link href="/docs" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', textDecoration: 'none' }}>
          &larr; Docs
        </Link>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '2rem 0 3rem',
          }}
        >
          Getting Started
        </h1>

        {/* Install */}
        <Section title="1. Install">
          <CodeBlock>{`npm install @prismojs/react`}</CodeBlock>
          <P>or with pnpm / yarn:</P>
          <CodeBlock>{`pnpm add @prismojs/react\nyarn add @prismojs/react`}</CodeBlock>
        </Section>

        {/* Import styles */}
        <Section title="2. Import the stylesheet">
          <P>
            Add the CSS import once in your app entry point (e.g. <Code>layout.tsx</Code> or <Code>_app.tsx</Code>).
          </P>
          <CodeBlock>{`import '@prismojs/react/styles';`}</CodeBlock>
          <P muted>
            The stylesheet contains all rarity effects, shine overlays, and glare layers.
            It is required for the visual effects to work.
          </P>
        </Section>

        {/* Use component */}
        <Section title="3. Use the component">
          <CodeBlock>{`import { PrismoCard } from '@prismojs/react';

export function MyCard() {
  return (
    <PrismoCard rarity="rare holo v">
      <img
        src="/my-card.png"
        alt="My card"
        style={{ width: '100%', borderRadius: 12 }}
      />
    </PrismoCard>
  );
}`}</CodeBlock>
          <P muted>
            Wrap any content — images, divs, custom markup — and the holographic
            effect is automatically applied on pointer interaction.
          </P>
        </Section>

        {/* Next.js note */}
        <Section title="Next.js configuration">
          <P>
            If you use Next.js, add <Code>@prismojs/react</Code> to <Code>transpilePackages</Code> in your config:
          </P>
          <CodeBlock>{`// next.config.ts
const config = {
  transpilePackages: ['@prismojs/react'],
};

export default config;`}</CodeBlock>
        </Section>

        {/* What's next */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <P muted>Next up:</P>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <NavLink href="/docs/rarities">Rarities catalogue &rarr;</NavLink>
            <NavLink href="/docs/api">API Reference &rarr;</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared layout helpers ─────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 700,
          marginBottom: '1rem',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <p
      style={{
        color: muted ? 'var(--text-muted)' : 'var(--text)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        marginBottom: '1rem',
      }}
    >
      {children}
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85em',
        padding: '0.15em 0.4em',
        borderRadius: '4px',
        background: 'rgba(255,255,255,0.05)',
        color: 'var(--accent-cyan)',
      }}
    >
      {children}
    </code>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        lineHeight: 1.65,
        padding: '1.25rem 1.5rem',
        borderRadius: '12px',
        background: 'var(--bg-surface)',
        border: '1px solid rgba(255,255,255,0.06)',
        overflowX: 'auto',
        marginBottom: '1rem',
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: 'var(--accent-violet)',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid rgba(139,92,246,0.2)',
        background: 'rgba(139,92,246,0.05)',
      }}
    >
      {children}
    </Link>
  );
}
