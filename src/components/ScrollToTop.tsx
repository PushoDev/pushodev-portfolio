/**
 * Scroll to top button with smooth animations and visibility control
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Rocket } from 'lucide-react';
import { Button } from './ui/button';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            {/* Progress Circle */}
            <svg
              className="absolute inset-0 w-14 h-14 transform -rotate-90"
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-300 dark:text-gray-600"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="text-gradient-to-r from-cyan-400 to-purple-500"
                style={{
                  strokeDasharray: 163.36, // 2 * π * 26
                  strokeDashoffset: 163.36 - (163.36 * scrollProgress) / 100,
                }}
                animate={{
                  stroke: [
                    '#00ffff',
                    '#8b5cf6',
                    '#ec4899',
                    '#f97316',
                    '#00ffff',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </svg>

            {/* Main Button */}
            <Button
              onClick={scrollToTop}
              size="sm"
              className="relative w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl backdrop-blur-sm border-2 border-white/20 transition-all duration-300"
              data-cursor-hover
            >
              <motion.div
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ChevronUp className="w-6 h-6" />
              </motion.div>
            </Button>

            {/* Rocket Trail Animation */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    x: [0, Math.cos(i * 90 * Math.PI / 180) * 25],
                    y: [0, Math.sin(i * 90 * Math.PI / 180) * 25],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                />
              ))}
            </motion.div>

            {/* Glow Effect */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.5)',
                  '0 0 30px rgba(139, 92, 246, 0.8)',
                  '0 0 20px rgba(6, 182, 212, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full -z-10"
            />

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
            >
              <div className="backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 rounded-xl px-3 py-2 border border-white/20 shadow-lg">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Volver arriba
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {Math.round(scrollProgress)}% recorrido
                </div>
              </div>
              
              {/* Arrow */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white/90 dark:bg-gray-900/90 border-r border-b border-white/20 rotate-45"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
