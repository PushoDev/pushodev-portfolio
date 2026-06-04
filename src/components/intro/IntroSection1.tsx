import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  useMotionValueEvent,
} from 'motion/react';
import OrbitImages from './OrbitImages';
import * as simpleIcons from 'simple-icons';

// Build inline SVG data-URIs from simple-icons
const iconUrl = (key: string, color: string): string => {
  const icon = (simpleIcons as Record<string, { path?: string }>)[key];
  if (!icon?.path) return '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="${icon.path}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const orbitIcons: string[] = [
  iconUrl('siReact', '#61DAFB'),
  iconUrl('siTypescript', '#3178C6'),
  iconUrl('siTailwindcss', '#06B6D4'),
  iconUrl('siLaravel', '#FF2D20'),
  iconUrl('siNestjs', '#E0234E'),
  iconUrl('siPython', '#3776AB'),
  iconUrl('siFlutter', '#02569B'),
  iconUrl('siDocker', '#2496ED'),
  iconUrl('siPostgresql', '#336791'),
  iconUrl('siNodedotjs', '#339933'),
].filter(Boolean);

// Same spring config as the original GTA effect
const springConfig = { stiffness: 120, damping: 20 };

const IntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Unmount the fixed layers only once the dark overlay is fully opaque
  // (overlayOpacity >= 0.99). Unmounting at exactly opacity=1 ensures a
  // seamless cut — the dark overlay hides any one-frame flash.
  const [introActive, setIntroActive] = useState(true);

  // Track the 200vh scroll container.
  // offset ['start start', 'end start']:
  //   progress=0  → container top at viewport top (scroll=0)
  //   progress=1  → container bottom at viewport top (scroll≈200vh)
  // This maps the full 200vh intro zone to 0→1.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // ── Mask — spring physics (same feel as the GTA original) ─────────
  // mask-pushodev.svg natural size: 900×220 px
  //   At 9000px width (10×): height = 2200px, text at ~72% = 1584px from top
  //   Center text (450px in 900px viewport): SVG top = 450-1584 = -1134px → use ≈-1100px
  //   At 300px width (0.33×): height = 73px, text at ~53px
  //   Target text at 30% from top ≈ 270px: SVG top = 270-53 = 217px → use ≈220px
  const rawMaskSize = useTransform(scrollYProgress, [0, 1], [9000, 300]);
  const rawMaskPos  = useTransform(scrollYProgress, [0, 1], [-1100, 220]);
  const maskSize    = useSpring(rawMaskSize, springConfig);
  const maskPos     = useSpring(rawMaskPos,  springConfig);
  const maskSizeCSS = useMotionTemplate`${maskSize}px`;
  const maskPosCSS  = useMotionTemplate`center ${maskPos}px`;

  // ── Outer layer: full-screen dark bg, fades out in the first 50% ──
  const outerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale      = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  // ── Dark transition overlay: fades in at 80-100% ──────────────────
  const overlayOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // Unmount once the overlay is essentially opaque — seamless cut to Hero
  useMotionValueEvent(overlayOpacity, 'change', (v) => {
    if (v >= 0.99) setIntroActive(false);
  });

  // ── Content (text + orbit): visible at start, fades at ~50% ──────
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12, 0.48], [1, 1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.48], [0, -60]);

  // shared fixed-layer style — z-index below portfolio sections
  const fixedBase: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 5,
  };

  return (
    <>
      {/* 200vh scroll zone — provides scroll distance, no visual content */}
      <div ref={containerRef} style={{ height: '200vh' }} id="intro" />

      {/* Fixed visual layers — unmounted once intro is fully scrolled past */}
      {introActive && (
        <>
          {/* ── Layer 1 (outer): full-screen dark bg + subtle glow ────────── */}
          {/* Same as the GTA outer image layer — fades out at 50% scroll */}
          <motion.div
            style={{ ...fixedBase, opacity: outerOpacity, scale: bgScale }}
          >
            <div style={{ position: 'absolute', inset: 0, background: '#06060f' }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.18) 0%, rgba(6,182,212,0.10) 50%, transparent 100%)',
              }}
            />
          </motion.div>

          {/* ── Layer 2 (masked): colorful gradient visible THROUGH the SVG logo ── */}
          {/* This is the core GTA effect — logo shape becomes a "window" showing */}
          {/* the gradient; as mask shrinks, window contracts to the logo itself.  */}
          <motion.div
            style={{
              ...fixedBase,
              WebkitMaskImage: 'url(/mask-pushodev.svg)',
              maskImage: 'url(/mask-pushodev.svg)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: maskSizeCSS as any,
              maskSize: maskSizeCSS as any,
              WebkitMaskPosition: maskPosCSS as any,
              maskPosition: maskPosCSS as any,
            }}
          >
            {/* Inner gradient — contrasts with outer dark layer */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                scale: bgScale,
                background:
                  'linear-gradient(135deg, #a855f7 0%, #06b6d4 50%, #ec4899 100%)',
              }}
            />
            {/* Dark fill inside mask — fades in at end (same role as the white fill */}
            {/* in the GTA demo), creating a seamless transition to the Hero's dark bg */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#06060f',
                opacity: overlayOpacity,
              }}
            />
          </motion.div>

          {/* ── Layer 3: global dark overlay — covers all layers for Hero transition ── */}
          <motion.div
            style={{ ...fixedBase, background: '#06060f', opacity: overlayOpacity }}
          />

          {/* ── Layer 4: content (text + orbit + scroll hint) ─────────────────── */}
          <motion.div
            style={{
              ...fixedBase,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              padding: '0 1rem',
              opacity: contentOpacity,
              y: contentY,
            }}
          >
            {/* Brand title */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="font-mono font-black text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-clip-text select-none"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
              >
                &lt;Pushodev /&gt;
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.18, ease: 'easeOut' }}
                className="text-xs tracking-[0.35em] text-gray-400 uppercase select-none"
              >
                Full-Stack Developer
              </motion.p>
            </div>

            {/* Elliptical orbit of tech icons */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.36, ease: 'easeOut' }}
              style={{ width: '100%', maxWidth: '80rem' }}
            >
              <OrbitImages
                images={orbitIcons}
                radiusX={370}
                radiusY={72}
                rotation={-6}
                duration={26}
                itemSize={52}
              />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                userSelect: 'none',
              }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
              >
                <span className="text-[10px] tracking-[0.25em] text-gray-500 uppercase">
                  Scroll
                </span>
                <div
                  style={{
                    width: '1px',
                    height: '2.5rem',
                    background: 'linear-gradient(to bottom, #6b7280, transparent)',
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default IntroSection;
