/**
 * Social links as a "dock": a glass pill where the hovered icon grows and its
 * neighbours follow, with a name tooltip. Shared by Hero and Footer.
 */
import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import type { LucideIcon } from 'lucide-react';

export interface DockItemData {
  name: string;
  url: string;
  icon: LucideIcon;
  /** Tailwind text color applied to the icon while hovered, e.g. "text-blue-400" */
  hoverColor?: string;
}

interface SocialDockProps {
  items: DockItemData[];
  /** Icon box size at rest / when hovered (px) */
  baseSize?: number;
  maxSize?: number;
  /** Distance (px) over which neighbours still react */
  reach?: number;
  className?: string;
}

const DockItem: React.FC<{
  item: DockItemData;
  mouseX: MotionValue<number>;
  baseSize: number;
  maxSize: number;
  reach: number;
}> = ({ item, mouseX, baseSize, maxSize, reach }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? x - box.x - box.width / 2 : reach * 2;
  });
  const target = useTransform(distance, [-reach, 0, reach], [baseSize, maxSize, baseSize]);
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 });
  const iconSize = useTransform(size, (s) => s * 0.48);

  return (
    <motion.a
      ref={ref}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.name}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileTap={{ scale: 0.92 }}
      className="relative flex items-center justify-center rounded-full border border-black/10 bg-black/5 text-gray-600 shadow-sm outline-none transition-colors hover:border-purple-400/60 focus-visible:ring-2 focus-visible:ring-purple-400 dark:border-white/15 dark:bg-white/10 dark:text-gray-300"
      data-cursor-hover
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-gray-900/90 px-2 py-1 text-xs font-medium text-white shadow-lg backdrop-blur"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        style={{ width: iconSize, height: iconSize }}
        className={`flex items-center justify-center transition-colors ${hovered ? item.hoverColor ?? 'text-purple-400' : ''}`}
      >
        <item.icon className="h-full w-full" />
      </motion.span>
    </motion.a>
  );
};

const SocialDock: React.FC<SocialDockProps> = ({
  items,
  baseSize = 40,
  maxSize = 58,
  reach = 110,
  className = '',
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{ height: baseSize + 16 }}
      className={`flex items-end gap-2 rounded-2xl border border-black/10 bg-white/60 px-3 pb-2 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {items.map((item) => (
        <DockItem key={item.name} item={item} mouseX={mouseX} baseSize={baseSize} maxSize={maxSize} reach={reach} />
      ))}
    </motion.div>
  );
};

export default SocialDock;
