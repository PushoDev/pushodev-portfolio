/**
 * Full-screen wash with a growing sun/moon that fades out whenever the user
 * switches theme. Skipped on first load and when reduced motion is requested.
 */
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeTransition: React.FC = () => {
  const { theme, transitionKey } = useTheme();
  const [activeKey, setActiveKey] = useState(0);

  useEffect(() => {
    if (transitionKey === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setActiveKey(transitionKey);
  }, [transitionKey]);

  if (activeKey === 0) return null;
  const isDark = theme === 'dark';

  return (
    <motion.div
      key={activeKey}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onAnimationComplete={() => setActiveKey(0)}
      className={`pointer-events-none fixed inset-0 z-[90] flex items-center justify-center ${isDark ? 'bg-gray-950' : 'bg-white'}`}
      aria-hidden="true"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 4, rotate: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {isDark ? <Moon className="h-16 w-16 text-indigo-300" /> : <Sun className="h-16 w-16 text-yellow-500" />}
      </motion.div>
    </motion.div>
  );
};

export default ThemeTransition;
