import Link from 'next/link';

const NAV = [
  { href: '/docs/getting-started', title: 'Getting Started', desc: 'Install, import, and render your first prismo card.' },
  { href: '/docs/rarities', title: 'Rarities', desc: 'Visual catalogue of every built-in rarity effect.' },
  { href: '/docs/api', title: 'API Reference', desc: 'Props, types, and CSS custom properties.' },
  { href: '/docs/advanced', title: 'Advanced', desc: 'Custom overlays, gallery mode, and performance tips.' },
];

export default function DocsIndex() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <header
        style={{
          padding: '2rem 2rem 1rem',
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
            textDecoration: 'none',
          }}
        >
          &larr; Home
        </Link>
      </header>

      <main style={{ padding: '2rem', maxWidth: '860px', margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          Documentation
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '4rem' }}>
          Everything you need to add holographic card effects to your React app.
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {NAV.map(({ href, title, desc }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'block',
                padding: '1.5rem 2rem',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'var(--bg-surface)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color .2s, background .2s',
              }}
            >
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                {title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {desc}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
