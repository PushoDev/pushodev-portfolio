/**
 * Animated light/dark toggle: gradient ring, sun and moon swap with a slide.
 */
import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const label = isDark
    ? language === 'es' ? 'Cambiar a tema claro' : 'Switch to light theme'
    : language === 'es' ? 'Cambiar a tema oscuro' : 'Switch to dark theme';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full p-[2px] outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        isDark ? 'bg-gradient-to-br from-indigo-600 to-purple-800' : 'bg-gradient-to-br from-yellow-400 to-orange-500'
      }`}
      data-cursor-hover
    >
      <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white dark:bg-gray-950">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ y: -22, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 22, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {isDark ? <Moon className="h-4 w-4 text-indigo-300" /> : <Sun className="h-4 w-4 text-yellow-500" />}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
