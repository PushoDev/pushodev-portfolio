/**
 * Cursor-driven glitch: inside `glitchRadius` px around the pointer the card's
 * content is duplicated into two sliced, colour-split copies that jitter.
 * Keyframes live in effects.css. The copies only exist while hovering, so idle cards cost nothing.
 */
import React, { useRef, useState } from 'react';

interface GlitchVaultProps {
  /** Classes for the card itself (border, radius, background...) */
  className?: string;
  /** Classes for the padded content box; the glitch copies reuse them */
  contentClassName?: string;
  glitchColor?: string;
  glitchRadius?: number;
  /** Animated cyan/violet/pink gradient border (see effects.css) */
  animatedBorder?: boolean;
  /** Decoration rendered once, behind the content (never duplicated) */
  overlay?: React.ReactNode;
  children: React.ReactNode;
}

const GlitchVault: React.FC<GlitchVaultProps> = ({
  className = '',
  contentClassName = '',
  glitchColor = '#FF6B6B',
  glitchRadius = 80,
  animatedBorder = false,
  overlay,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--gx', `${e.clientX - box.left}px`);
    ref.current.style.setProperty('--gy', `${e.clientY - box.top}px`);
  };

  const mask = `radial-gradient(circle ${glitchRadius}px at var(--gx, 50%) var(--gy, 50%), #000 0%, #000 55%, transparent 100%)`;
  const copy = (anim: string, shadow: string, shift: string) => (
    <div
      aria-hidden="true"
      className={`gv-${anim} pointer-events-none absolute inset-0 ${contentClassName}`}
      style={{ WebkitMaskImage: mask, maskImage: mask, filter: `drop-shadow(${shadow})`, transform: `translateX(${shift})` }}
    >
      {children}
    </div>
  );

  return (
    <div
      ref={ref}
      data-cursor-hover
      className={`relative ${animatedBorder ? 'gb' : ''} ${className}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(true)}
      onPointerMove={move}
      onPointerLeave={() => setActive(false)}
    >
      {overlay}
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
      {active && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
            style={{
              background: `radial-gradient(circle ${glitchRadius}px at var(--gx, 50%) var(--gy, 50%), ${glitchColor}26, transparent 100%)`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-20">
            {copy('a', `3px 0 0 #22d3ee`, '2px')}
            {copy('b', `-3px 0 0 ${glitchColor}`, '-2px')}
          </div>
        </>
      )}
    </div>
  );
};

export default GlitchVault;
