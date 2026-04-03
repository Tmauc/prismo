import Link from 'next/link';

export default function ApiReference() {
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
          API Reference
        </h1>

        {/* PrismoCard */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '1.5rem' }}>
            {'<PrismoCard />'}
          </h2>

          <PropTable
            rows={[
              {
                name: 'rarity',
                type: "Rarity | string",
                default: "'common'",
                description: "The holographic effect to apply. Built-in values: 'common', 'rare holo', 'rare holo galaxy', 'rare holo v', 'rare holo vmax', 'rare holo vstar', 'rare rainbow', 'rare rainbow alt', 'rare secret', 'rare ultra', 'radiant', 'custom'.",
              },
              {
                name: 'supertype',
                type: 'string',
                default: "'pokémon'",
                description: "Card supertype. Affects clip-path regions for some rarity effects.",
              },
              {
                name: 'subtype',
                type: 'string',
                default: "'basic'",
                description: "Card subtype. Affects clip-path for stage/supporter variants.",
              },
              {
                name: 'gallery',
                type: 'boolean',
                default: 'false',
                description: 'When true, disables clip-path so the foil effect covers the entire card surface.',
              },
              {
                name: 'image',
                type: 'string',
                default: 'undefined',
                description: "URL of a custom foil overlay image. Only used when rarity is 'custom'.",
              },
              {
                name: 'className',
                type: 'string',
                default: 'undefined',
                description: 'Additional CSS class applied to the root .card element.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                default: 'undefined',
                description: 'The card content — typically an image or custom markup.',
              },
            ]}
          />
        </section>

        {/* Rarity type */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-violet)', marginBottom: '1rem' }}>
            Rarity type
          </h2>
          <CodeBlock>{`type Rarity =
  | 'common'
  | 'rare holo'
  | 'rare holo galaxy'
  | 'rare holo v'
  | 'rare holo vmax'
  | 'rare holo vstar'
  | 'rare rainbow'
  | 'rare rainbow alt'
  | 'rare secret'
  | 'rare ultra'
  | 'radiant'
  | 'custom';`}</CodeBlock>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            The <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.9em' }}>rarity</code> prop
            also accepts arbitrary strings for forward compatibility with future CSS effects.
          </p>
        </section>

        {/* CSS Custom Properties */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '1rem' }}>
            CSS Custom Properties
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            The component sets these CSS variables on the card rotator element in real-time during pointer interaction:
          </p>
          <PropTable
            rows={[
              { name: '--mx, --my', type: 'percentage', default: '50%', description: 'Pointer X/Y position relative to card (0\u2013100%).' },
              { name: '--rx, --ry', type: 'deg', default: '0deg', description: '3D rotation angles derived from pointer offset.' },
              { name: '--pos', type: 'background-position', default: '50% 50%', description: 'Combined position for shine gradients.' },
              { name: '--posx, --posy', type: 'percentage', default: '50%', description: 'Individual axis positions for gradient offsets.' },
              { name: '--hyp', type: '0\u20131', default: '0', description: 'Distance from center (hypotenuse), normalized. Controls brightness.' },
              { name: '--o', type: '0 | 1', default: '0', description: 'Interaction active flag. 1 during hover, 0 on leave.' },
              { name: '--s', type: 'number', default: '1', description: 'Scale factor (reserved for future use).' },
              { name: '--customimage', type: 'url()', default: 'none', description: "Set on hover when rarity is 'custom'. Uses the image prop value." },
            ]}
          />
        </section>

        {/* CSS Classes */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-magenta)', marginBottom: '1rem' }}>
            CSS Class Structure
          </h2>
          <CodeBlock>{`.card                    \u2192 Root container (data-rarity, data-supertype, data-subtypes, data-gallery)
  .card__translater      \u2192 Perspective container
    .card__rotator       \u2192 3D transform target (receives CSS vars)
      .card__front       \u2192 Face container
        [children]       \u2192 Your content
        .card__shine     \u2192 Holographic gradient overlay
        .card__glare     \u2192 Specular glare overlay`}</CodeBlock>
        </section>
      </div>
    </div>
  );
}

function PropTable({ rows }: { rows: { name: string; type: string; default: string; description: string }[] }) {
  return (
    <div style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ background: 'var(--bg-surface)' }}>
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ name, type, default: def, description }) => (
            <tr key={name} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 500, whiteSpace: 'nowrap' }}>{name}</td>
              <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-violet)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{type}</td>
              <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{def}</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.65, padding: '1.25rem 1.5rem', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', marginBottom: '1rem' }}>
      <code>{children}</code>
    </pre>
  );
}
