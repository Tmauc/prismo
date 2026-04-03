<div align="center">

# prismo

**Holographic, foil & prismatic card effects for React**

CSS-only animations · Zero dependencies · 60fps · 10+ rarity types

[![npm](https://img.shields.io/npm/v/@prismojs/react?color=8b5cf6&label=npm)](https://www.npmjs.com/package/@prismojs/react)
[![License: MIT](https://img.shields.io/badge/license-MIT-00d4ff)](./LICENSE)

</div>

---

## Features

- **10+ built-in rarities** — Holo, V, VMAX, VSTAR, Rainbow, Gold Secret, Ultra Rare, Radiant, and custom overlay support
- **Pure CSS animations** — No spring libraries, no animation frameworks. Pointer-driven holographic shine via CSS custom properties
- **60fps pointer tracking** — `requestAnimationFrame`-throttled updates, GPU-accelerated transforms
- **~3KB gzipped** — Tiny JS footprint. The CSS handles all visual complexity
- **React 18 & 19** — Works with both versions out of the box
- **Custom overlays** — Bring your own foil texture via the `image` prop

## Quick Start

```bash
npm install @prismojs/react
```

Import the stylesheet once in your app entry:

```tsx
import '@prismojs/react/styles';
```

Use the component:

```tsx
import { PrismoCard } from '@prismojs/react';

function Card() {
  return (
    <PrismoCard rarity="rare holo v">
      <img src="/my-card.png" alt="My card" />
    </PrismoCard>
  );
}
```

## Rarities

| Rarity | Description |
|---|---|
| `common` | No foil overlay — base card only |
| `rare holo` | Classic holographic strip with rainbow bars |
| `rare holo v` | Full-face rainbow gradient with metallic scan lines |
| `rare holo vmax` | Textured cosmic foil with deep color-burn blends |
| `rare holo vstar` | Etched pattern overlay with dual-layer exclusion |
| `rare rainbow` | Full rainbow secret with glitter texture |
| `rare rainbow alt` | Alternate art rainbow with higher contrast |
| `rare secret` | Gold metallic foil with glitter accents |
| `rare ultra` | Illusion pattern overlay with exclusion blend |
| `radiant` | Etched linear pattern with green-yellow hue cycle |
| `custom` | Your own image overlay via the `image` prop |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `rarity` | `Rarity \| string` | `'common'` | Holographic effect type |
| `supertype` | `string` | `'pokémon'` | Card supertype (affects clip-path regions) |
| `subtype` | `string` | `'basic'` | Card subtype (stage, supporter variants) |
| `gallery` | `boolean` | `false` | Disable clip-path, foil covers entire surface |
| `image` | `string` | — | Custom foil overlay URL (for `rarity="custom"`) |
| `className` | `string` | — | Additional class on the root `.card` element |

## Next.js

Add to `transpilePackages` in your Next.js config:

```ts
// next.config.ts
export default {
  transpilePackages: ['@prismojs/react'],
};
```

## Project Structure

```
prismo/
├── packages/react/     @prismojs/react — the npm package
├── apps/docs/          Next.js docs site + homepage
├── turbo.json          Turborepo config
└── pnpm-workspace.yaml
```

## Development

```bash
pnpm install
pnpm dev        # Run everything in parallel
pnpm build      # Build all packages + docs
```

## License

MIT
