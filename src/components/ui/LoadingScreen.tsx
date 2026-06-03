import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Tick progress bar to 100% over ~1200ms
    const totalMs = 1200;
    const steps = 60;
    const stepMs = totalMs / steps;

    const ticker = setInterval(() => {
      setProgress((p) => {
        const next = p + 100 / steps;
        return next >= 100 ? 100 : next;
      });
    }, stepMs);

    // Signal parent after 1500ms so exit animation has room
    const done = setTimeout(onComplete, 1500);

    return () => {
      clearInterval(ticker);
      clearTimeout(done);
    };
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

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mb-12 font-mono font-black text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-clip-text select-none"
        style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
      >
        &lt;Pushodev /&gt;
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-48 h-[2px] bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
            style={{ width: `${progress}%`, transition: 'width 20ms linear' }}
          />
        </div>
        <span className="text-[10px] tracking-[0.3em] text-gray-600 uppercase">Loading</span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
