/**
 * Pill pagination: sliding gradient dot on the active page, arrows disabled at
 * the ends, window of up to 5 page numbers.
 */
import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
  maxVisiblePages?: number;
}

const arrow =
  'w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-purple-400';

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  prevLabel = 'Previous page',
  nextLabel = 'Next page',
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  startPage = Math.max(1, endPage - maxVisiblePages + 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <nav
      aria-label="Pagination"
      className="relative flex items-center justify-center w-fit gap-2 p-2 mx-auto mt-12 border rounded-full shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 border-white/20"
    >
      <motion.button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={prevLabel}
        className={arrow}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor-hover
      >
        <ChevronLeft size={18} />
      </motion.button>

      <div className="flex gap-1">
        {pages.map((i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => onPageChange(i)}
            aria-label={`${i}`}
            aria-current={currentPage === i ? 'page' : undefined}
            className={`relative flex items-center justify-center w-10 h-10 text-sm font-medium transition-colors rounded-full outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
              currentPage === i ? 'text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-cursor-hover
          >
            <span className="relative z-10">{i}</span>
            <AnimatePresence>
              {currentPage === i && (
                <motion.span
                  className="absolute inset-0 rounded-full shadow-inner bg-gradient-to-br from-cyan-500 to-purple-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={nextLabel}
        className={arrow}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor-hover
      >
        <ChevronRight size={18} />
      </motion.button>
    </nav>
  );
};

export default Pagination;
