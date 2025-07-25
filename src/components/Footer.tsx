/**
 * Footer with social links, availability status, and modern design
 */
import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ExternalLink, Heart, Coffee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const isAvailable = true; // Cambia esto según tu disponibilidad

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/PushoDev',
      icon: Github,
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/luis-alberto-pushodev/',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Blog',
      url: 'https://puschoft.blogspot.com/',
      icon: ExternalLink,
      color: 'hover:text-orange-400'
    }
  ];

  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Left - Logo and Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
              &lt;Pusho.dev /&gt;
            </div>
            
            {/* Availability Status */}
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {isAvailable ? t('footer.available') : t('footer.busy')}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Creando experiencias digitales excepcionales con código limpio y diseño innovador.
            </p>
          </motion.div>

          {/* Center - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Conectemos
            </h3>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/40`}
                  data-cursor-hover
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Fun Stats or Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-right"
          >
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl p-4 border border-white/20 shadow-lg">
              <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                <Coffee className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Powered by Coffee
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                "El código es poesía digital"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>© {currentYear} Luis Alberto - Pusho.dev.</span>
            <span>{t('footer.rights')}</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
          </div>

          {/* Tech Stack Badge */}
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>Hecho con</span>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 rounded-full">React</span>
              <span className="px-2 py-1 bg-purple-400/20 text-purple-400 rounded-full">TypeScript</span>
              <span className="px-2 py-1 bg-pink-400/20 text-pink-400 rounded-full">Tailwind</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
