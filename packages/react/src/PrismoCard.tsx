'use client';

import React, { useCallback, useRef } from 'react';

export type Rarity =
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
  | 'custom';

export interface PrismoCardProps {
  /** Foil/rarity effect type */
  rarity?: Rarity | (string & {});
  /** Card supertype — e.g. 'pokémon', 'trainer', 'energy' */
  supertype?: string;
  /** Card subtype — e.g. 'basic', 'stage', 'supporter' */
  subtype?: string;
  /** Enable gallery mode (disables clip-path) */
  gallery?: boolean;
  /** Custom image URL for the 'custom' rarity foil overlay */
  image?: string;
  /** Additional className on the root .card element */
  className?: string;
  children?: React.ReactNode;
}

function applyCardTransform(el: HTMLDivElement, x: number, y: number): void {
  const ox = x - 50;
  const oy = y - 50;
  const hyp = Math.min(Math.max(Math.sqrt(oy * oy + ox * ox) / 50, 0), 1);

  el.style.setProperty('--pos', `${Math.round(50 + x / 4 - 12.5)}% ${Math.round(50 + y / 3 - 16.67)}%`);
  el.style.setProperty('--posx', `${Math.round(50 + x / 4 - 12.5)}%`);
  el.style.setProperty('--posy', `${Math.round(50 + y / 3 - 16.67)}%`);
  el.style.setProperty('--rx', `${Math.floor(-ox / 3.5)}deg`);
  el.style.setProperty('--ry', `${Math.floor(oy / 2)}deg`);
  el.style.setProperty('--mx', `${Math.round(x)}%`);
  el.style.setProperty('--my', `${Math.round(y)}%`);
  el.style.setProperty('--o', '1');
  el.style.setProperty('--hyp', `${hyp}`);
  el.style.setProperty('--s', '1');
}

function resetCardTransform(el: HTMLDivElement): void {
  el.style.setProperty('--rx', '0deg');
  el.style.setProperty('--ry', '0deg');
  el.style.setProperty('--mx', '50%');
  el.style.setProperty('--my', '50%');
  el.style.setProperty('--o', '0');
  el.style.setProperty('--hyp', '0');
  el.style.setProperty('--pos', '50% 50%');
  el.style.setProperty('--posx', '50%');
  el.style.setProperty('--posy', '50%');
  el.style.setProperty('--s', '1');
}

function getPointerPosition(
  e: { clientX: number; clientY: number },
  rect: DOMRect
): { x: number; y: number } {
  return {
    x: Math.floor((100 / rect.width) * (e.clientX - rect.left)),
    y: Math.floor((100 / rect.height) * (e.clientY - rect.top)),
  };
}

export const PrismoCard: React.FC<PrismoCardProps> = ({
  rarity = 'common',
  supertype = 'pokémon',
  subtype = 'basic',
  gallery = false,
  image,
  className,
  children,
}) => {
  const rotatorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const el = rotatorRef.current;
      if (!el) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const point =
          'touches' in e
            ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
            : { clientX: e.clientX, clientY: e.clientY };
        const { x, y } = getPointerPosition(point, rect);
        applyCardTransform(el, x, y);
      });
    },
    []
  );

  const handlePointerEnter = useCallback(() => {
    const el = rotatorRef.current;
    if (!el) return;
    if (rarity === 'custom' && image) {
      el.style.setProperty('--customimage', `url(${image})`);
    }
  }, [rarity, image]);

  const handlePointerLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const el = rotatorRef.current;
    if (!el) return;
    resetCardTransform(el);
  }, []);

  return (
    <div
      className={`card${className ? ` ${className}` : ''}`}
      data-supertype={supertype}
      data-subtypes={subtype}
      data-rarity={rarity}
      data-gallery={gallery ? 'true' : 'false'}
    >
      <div className="card__translater">
        <div
          ref={rotatorRef}
          className="card__rotator"
          onMouseEnter={handlePointerEnter}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          <div className="card__front">
            <div>{children}</div>
            <div className={`card__shine ${subtype} ${supertype}`} />
            <div className={`card__glare ${subtype} ${rarity}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrismoCard;
