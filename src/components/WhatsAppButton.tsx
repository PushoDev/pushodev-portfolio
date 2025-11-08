/**
 * Floating WhatsApp button with custom message and animations
 */
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";

const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "5355572430";
  const message =
    "Hola te escribo desde su Portfolio, ¿estás disponible para un trabajo?";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed z-50 bottom-6 right-6">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="absolute right-0 mb-2 mr-2 bottom-16"
          >
            <div className="max-w-xs p-4 border shadow-2xl backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 rounded-2xl border-white/20">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-500 rounded-full">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    ¡Hablemos por WhatsApp!
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    Respondo rápidamente a consultas sobre proyectos
                  </div>
                </div>
              </div>

              {/* Arrow pointing to button */}
              <div className="absolute w-4 h-4 transform rotate-45 border-b border-r -bottom-2 right-6 bg-white/90 dark:bg-gray-900/90 border-white/20"></div>
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
              "0 0 20px rgba(34, 197, 94, 0.5)",
              "0 0 30px rgba(34, 197, 94, 0.8)",
              "0 0 20px rgba(34, 197, 94, 0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="flex items-center justify-center transition-colors duration-300 bg-green-500 border-2 rounded-full shadow-lg w-14 h-14 hover:bg-green-600 backdrop-blur-sm border-green-400/50"
        >
          <MessageCircle className="text-white w-7 h-7" />
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
          className="absolute inset-0 bg-green-500 rounded-full w-14 h-14 -z-10"
        />

        {/* Notification Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 1 }}
          className="absolute flex items-center justify-center w-5 h-5 bg-red-500 rounded-full -top-1 -right-1"
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
          className="absolute w-4 h-4 bg-green-400 border-2 border-white rounded-full -bottom-1 -right-1"
        />
      </motion.a>

      {/* Floating Message Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-400/30"
            style={{
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: [0, Math.cos((i * 120 * Math.PI) / 180) * 30],
              y: [0, Math.sin((i * 120 * Math.PI) / 180) * 30],
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
