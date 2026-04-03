import Link from 'next/link';

export default function AdvancedPage() {
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
          Advanced Usage
        </h1>

        <Section title="Custom Foil Overlay">
          <P>
            Set <Code>rarity=&quot;custom&quot;</Code> and pass an <Code>image</Code> URL to use your own foil texture.
            The image is applied as a CSS background via the <Code>--customimage</Code> custom property.
          </P>
          <CodeBlock>{`<PrismoCard rarity="custom" image="/my-foil-texture.png">
  <img src="/card.png" alt="card" />
</PrismoCard>`}</CodeBlock>
          <P muted>
            Best results with seamless tileable textures at 500x500px or above.
            PNG with transparency works for overlay blending.
          </P>
        </Section>

        <Section title="Gallery Mode">
          <P>
            By default, some rarity effects use <Code>clip-path</Code> to restrict the foil
            to specific regions (the holo strip on basic holos, for example). Set <Code>gallery</Code> to
            disable clipping and apply the effect to the full card surface.
          </P>
          <CodeBlock>{`<PrismoCard rarity="rare holo" gallery>
  <img src="/card.png" alt="card" />
</PrismoCard>`}</CodeBlock>
        </Section>

        <Section title="Subtypes & Clip Regions">
          <P>
            The <Code>subtype</Code> prop changes the clip-path shape for certain rarities.
            For example, <Code>stage</Code> cards have a different holo region than <Code>basic</Code> cards,
            and <Code>supporter</Code> trainers have their own mask.
          </P>
          <CodeBlock>{`<PrismoCard rarity="rare holo" subtype="stage" supertype="pokémon">
  <img src="/stage2.png" alt="Stage 2" />
</PrismoCard>`}</CodeBlock>
        </Section>

        <Section title="Performance Tips">
          <Ul>
            <li>
              <strong>Mobile detection</strong> — On low-end devices, consider skipping the PrismoCard wrapper
              entirely and rendering the image directly. The pointer tracking is lightweight but the CSS effects
              can be GPU-intensive with many cards visible.
            </li>
            <li>
              <strong>Virtualization</strong> — When rendering large grids (50+ cards), combine with a
              virtualization library like <Code>react-window</Code> to only mount visible cards.
            </li>
            <li>
              <strong>Static fallback</strong> — For SSR/SSG, the card renders as a static element. The
              holographic effect only activates on pointer interaction (progressive enhancement).
            </li>
            <li>
              <strong>Reduce motion</strong> — The CSS respects the user&apos;s <Code>prefers-reduced-motion</Code>{' '}
              setting when your stylesheet includes appropriate media queries wrapping the transition/transform rules.
            </li>
          </Ul>
        </Section>

        <Section title="Styling the Card Container">
          <P>
            The root <Code>.card</Code> element uses CSS custom properties for transforms.
            You can override sizing, border-radius, and perspective via the <Code>className</Code> prop
            or by targeting the CSS classes directly.
          </P>
          <CodeBlock>{`.card {
  /* Override card dimensions */
  width: 300px;
  aspect-ratio: 2.5 / 3.5;
}

.card__rotator {
  /* Adjust perspective depth */
  perspective: 800px;
}`}</CodeBlock>
        </Section>
      </div>
    </div>
  );
}

/* ─── Shared helpers ────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <p style={{ color: muted ? 'var(--text-muted)' : 'var(--text)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
      {children}
    </p>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {children}
    </ul>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em', padding: '0.15em 0.4em', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--accent-cyan)' }}>
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
