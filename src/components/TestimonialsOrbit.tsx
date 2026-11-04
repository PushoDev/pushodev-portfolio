/**
 * Testimonials as an orbit: client photos sit on a circle, the selected one
 * rotates to the top and its quote shows in the centre card.
 * On phones (no room for a circle) the photos become a row under the card.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  avatar: string;
  content: string;
  rating: number;
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
};

const arrowBtn =
  'p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-purple-400';

const TestimonialsOrbit: React.FC<{ testimonials: Testimonial[]; prevLabel?: string; nextLabel?: string }> = ({
  testimonials,
  prevLabel = 'Previous',
  nextLabel = 'Next',
}) => {
  const n = testimonials.length;
  // `step` is unbounded so the orbit always turns the short way round
  const [step, setStep] = useState(0);
  const active = mod(step, n);
  const isMobile = useIsMobile();

  const radius = 220;
  const size = 76;
  const box = radius * 2 + size + 24;

  const go = useCallback((delta: number) => setStep((s) => s + delta), []);
  const select = (i: number) => {
    const delta = mod(i - active + n / 2, n) - n / 2;
    if (delta !== 0) setStep((s) => s + Math.round(delta));
  };
  const rotationOf = (i: number) => (i - step) * (360 / n);

  const t = testimonials[active];

  const card = (
    <AnimatePresence mode="wait">
      <motion.div
        key={t.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="z-10 w-full max-w-sm p-6 text-center border shadow-xl backdrop-blur-xl bg-white/60 dark:bg-gray-950/70 rounded-2xl border-white/20 md:w-72"
      >
        <Quote className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
        <p className="mb-4 text-sm italic leading-relaxed text-gray-600 dark:text-gray-300">"{t.content}"</p>
        <div className="flex justify-center mb-3" aria-label={`${t.rating}/5`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <div className="font-semibold text-gray-800 dark:text-gray-100">{t.name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{t.position}</div>
        <div className="flex items-center justify-center gap-3 mt-4">
          <button type="button" onClick={() => go(-1)} aria-label={prevLabel} className={arrowBtn} data-cursor-hover>
            <ChevronLeft size={16} className="text-gray-700 dark:text-gray-300" />
          </button>
          <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
            {active + 1}/{n}
          </span>
          <button type="button" onClick={() => go(1)} aria-label={nextLabel} className={arrowBtn} data-cursor-hover>
            <ChevronRight size={16} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  const avatarClass = (i: number) =>
    `w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300 ${
      i === active
        ? 'border-4 border-purple-500 dark:border-purple-400 shadow-lg'
        : 'border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400'
    }`;

  // Arrow keys only act while the widget has focus (the page also has a form)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-6" onKeyDown={onKeyDown}>
        {card}
        <div className="flex gap-3">
          {testimonials.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => select(i)}
              aria-label={p.name}
              className="w-12 h-12 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              data-cursor-hover
            >
              <img src={p.avatar} alt={p.name} className={avatarClass(i)} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center" onKeyDown={onKeyDown}>
      <div className="relative flex items-center justify-center" style={{ width: box, height: box }}>
        {/* orbit ring */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 border rounded-full border-purple-400/30 left-1/2 top-1/2"
          style={{ width: radius * 2, height: radius * 2 }}
        />
        {card}

        {testimonials.map((p, i) => {
          const rotation = rotationOf(i);
          return (
            <motion.div
              key={p.id}
              animate={{ transform: `rotate(${rotation}deg) translateY(-${radius}px)` }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: size,
                height: size,
                position: 'absolute',
                top: `calc(50% - ${size / 2}px)`,
                left: `calc(50% - ${size / 2}px)`,
              }}
            >
              {/* counter-rotation keeps the photo upright */}
              <motion.button
                type="button"
                animate={{ rotate: -rotation }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => select(i)}
                aria-label={p.name}
                aria-current={i === active}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-full h-full rounded-full outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                data-cursor-hover
              >
                <img src={p.avatar} alt={p.name} className={avatarClass(i)} draggable={false} />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TestimonialsOrbit;
