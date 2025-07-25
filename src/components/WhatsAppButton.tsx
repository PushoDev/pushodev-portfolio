/**
 * Floating WhatsApp button with custom message and animations
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '535572430';
  const message = 'Hola te escribo desde su Portfolio, ¿estás disponible para un trabajo?';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="absolute bottom-16 right-0 mb-2 mr-2"
          >
            <div className="backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 rounded-2xl p-4 border border-white/20 shadow-2xl max-w-xs">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    ¡Hablemos por WhatsApp!
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    Respondo rápidamente a consultas sobre proyectos
                  </div>
                </div>
              </div>
              
              {/* Arrow pointing to button */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white/90 dark:bg-gray-900/90 border-r border-b border-white/20 transform rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative block"
        data-cursor-hover
      >
        {/* Main Button */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(34, 197, 94, 0.5)',
              '0 0 30px rgba(34, 197, 94, 0.8)',
              '0 0 20px rgba(34, 197, 94, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 backdrop-blur-sm border-2 border-green-400/50"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.div>

        {/* Pulse Animation */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 w-14 h-14 bg-green-500 rounded-full -z-10"
        />

        {/* Notification Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-xs font-bold text-white"
          >
            1
          </motion.div>
        </motion.div>

        {/* Online Status Indicator */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"
        />
      </motion.a>

      {/* Floating Message Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * 120 * Math.PI / 180) * 30],
              y: [0, Math.sin(i * 120 * Math.PI / 180) * 30],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatsAppButton;
