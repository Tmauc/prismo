'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Fade-up on scroll ─────────────────────────────────────── */

export function RevealOnScroll({
  children,
  delay = 0,
  y = 60,
  className,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y, opacity: 0 });

    const config: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
    };

    if (!immediate) {
      config.scrollTrigger = {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      };
    }

    const tween = gsap.to(el, config);
    return () => { tween.kill(); };
  }, [delay, y, immediate]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}

/* ─── Stagger children ──────────────────────────────────────── */

export function StaggerReveal({
  children,
  stagger = 0.12,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.children;

    gsap.set(items, { y: 40, opacity: 0 });
    const tween = gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => { tween.kill(); };
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Horizontal scroll gallery ─────────────────────────────── */

export function HorizontalScroll({
  children,
  header,
  className,
}: {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalScroll = track.scrollWidth - container.offsetWidth;

    const tween = gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {header}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'center',
          flex: 1,
          willChange: 'transform',
          paddingBottom: '6rem',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Magnetic cursor follow ────────────────────────────────── */

export function MagneticWrap({
  children,
  strength = 0.3,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return <div ref={ref}>{children}</div>;
}

/* ─── Text split reveal ─────────────────────────────────────── */

export function SplitText({
  text,
  className,
  tag: Tag = 'h1',
  immediate = false,
  delay = 0,
}: {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Play animation immediately on mount instead of on scroll */
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll('.split-char');
    gsap.set(chars, { y: 80, opacity: 0, rotateX: -90 });

    const config: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.03,
      delay,
      ease: 'power4.out',
    };

    if (!immediate) {
      config.scrollTrigger = {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      };
    }

    const tween = gsap.to(chars, config);
    return () => { tween.kill(); };
  }, [text, immediate, delay]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', perspective: '600px', overflow: 'visible', padding: '0 0.05em' }}
    >
      {text.split('').flatMap((char, i) => {
        const els = [
          <span
            key={i}
            className="split-char"
            style={{
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : undefined,
              willChange: 'transform, opacity',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>,
        ];
        // Insert a flex line-break hint after hyphens
        if (char === '-') {
          els.push(<span key={`br-${i}`} className="split-char-break" />);
        }
        return els;
      })}
    </Tag>
  );
}
