import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import badge from '@/imgs/pusho-badge-sm.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Signal parent after 1500ms so exit animation has room
    const done = setTimeout(onComplete, 1500);
    return () => clearTimeout(done);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 bg-[#06060f] flex flex-col items-center justify-center"
      style={{ zIndex: 999999 }}
    >
      {/* Purple glow pulse behind logo */}
      <motion.div
        animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)' }}
      />

      {/* Brand badge */}
      <motion.img
        src={badge}
        alt=""
        aria-hidden="true"
        draggable={false}
        initial={{ opacity: 0, scale: 0.8, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.5, ease: 'easeOut' },
          y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative w-28 h-28 mb-6 select-none sm:w-32 sm:h-32"
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mb-10 font-mono font-black text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-clip-text select-none"
        style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
      >
        &lt;Pushodev /&gt;
      </motion.div>

      {/* Spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col items-center gap-3"
        role="status"
      >
        <svg
          className="w-10 h-10 motion-safe:animate-[spin_1.5s_linear_infinite]"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path
            fill="url(#loader-gradient)"
            d="M20.27,4.74a4.93,4.93,0,0,1,1.52,4.61,5.32,5.32,0,0,1-4.1,4.51,5.12,5.12,0,0,1-5.2-1.5,5.53,5.53,0,0,0,6.13-1.48A5.66,5.66,0,0,0,20.27,4.74ZM12.32,11.53a5.49,5.49,0,0,0-1.47-6.2A5.57,5.57,0,0,0,4.71,3.72,5.17,5.17,0,0,1,9.53,2.2,5.52,5.52,0,0,1,13.9,6.45,5.28,5.28,0,0,1,12.32,11.53ZM19.2,20.29a4.92,4.92,0,0,1-4.72,1.49,5.32,5.32,0,0,1-4.34-4.05A5.2,5.2,0,0,1,11.6,12.5a5.6,5.6,0,0,0,1.51,6.13A5.63,5.63,0,0,0,19.2,20.29ZM3.79,19.38A5.18,5.18,0,0,1,2.32,14a5.3,5.3,0,0,1,4.59-4,5,5,0,0,1,4.58,1.61,5.55,5.55,0,0,0-6.32,1.69A5.46,5.46,0,0,0,3.79,19.38ZM12.23,12a5.11,5.11,0,0,0,3.66-5,5.75,5.75,0,0,0-3.18-6,5,5,0,0,1,4.42,2.3,5.21,5.21,0,0,1,.24,5.92A5.4,5.4,0,0,1,12.23,12ZM11.76,12a5.18,5.18,0,0,0-3.68,5.09,5.58,5.58,0,0,0,3.19,5.79c-1,.35-2.9-.46-4-1.68A5.51,5.51,0,0,1,11.76,12ZM23,12.63a5.07,5.07,0,0,1-2.35,4.52,5.23,5.23,0,0,1-5.91.2,5.24,5.24,0,0,1-2.67-4.77,5.51,5.51,0,0,0,5.45,3.33A5.52,5.52,0,0,0,23,12.63ZM1,11.23a5,5,0,0,1,2.49-4.5,5.23,5.23,0,0,1,5.81-.06,5.3,5.3,0,0,1,2.61,4.74A5.56,5.56,0,0,0,6.56,8.06,5.71,5.71,0,0,0,1,11.23Z"
          />
        </svg>
        <span className="text-[10px] tracking-[0.3em] text-gray-600 uppercase">Loading</span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
