/**
 * Footer: brand + availability, quick navigation and social dock, and a
 * call to action that leads to the contact form.
 */
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Coffee, ExternalLink, Github, Heart, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import VisitCounter from './VisitCounter';
import SocialDock, { type DockItemData } from './SocialDock';
import badge from '@/imgs/pusho-badge-sm.png';

const CONTACT_EMAIL = 'bethocubans1990@gmail.com';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const es = language === 'es';
  const currentYear = new Date().getFullYear();
  const isAvailable = true; // Cambia esto según tu disponibilidad

  const socialLinks: DockItemData[] = [
    { name: 'GitHub', url: 'https://github.com/PushoDev', icon: Github, hoverColor: 'text-gray-900 dark:text-white' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/luis-alberto-pushodev/', icon: Linkedin, hoverColor: 'text-blue-400' },
    { name: 'Blog', url: 'https://puschoft.blogspot.com/', icon: ExternalLink, hoverColor: 'text-orange-400' },
    { name: es ? 'Correo' : 'Email', url: `mailto:${CONTACT_EMAIL}`, icon: Mail, hoverColor: 'text-pink-400' },
  ];

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'about', label: t('nav.about') },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'contact', label: t('nav.contact') },
  ];

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/10 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left - Logo and Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img
                src={badge}
                alt="PushoDev"
                width={56}
                height={56}
                loading="lazy"
                draggable={false}
                className="w-14 h-14 select-none"
              />
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                &lt;Pusho.dev /&gt;
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {isAvailable ? t('footer.available') : t('footer.busy')}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto md:mx-0">
              {es
                ? 'Desarrollador Fullstack: sistemas con Laravel, React y Django en producción, apps con Expo y rumbo a Blockchain.'
                : 'Fullstack developer: production systems with Laravel, React and Django, Expo apps, and heading to Blockchain.'}
            </p>
          </motion.div>

          {/* Center - Navigation + Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <nav aria-label={es ? 'Navegación del pie de página' : 'Footer navigation'}>
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={goTo(link.id)}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 hover:bg-clip-text transition-colors"
                      data-cursor-hover
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {es ? 'Conectemos' : "Let's connect"}
            </h3>
            <SocialDock items={socialLinks} className="mx-auto w-fit" />
          </motion.div>

          {/* Right - Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-right"
          >
            <div className="relative gb backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl p-5 border border-white/20 shadow-lg">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {es ? '¿Tienes un proyecto en mente?' : 'Got a project in mind?'}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {es ? 'Disponible para trabajo remoto. Respondo rápido.' : 'Open to remote work. I reply fast.'}
              </p>
              <a
                href="#contact"
                onClick={goTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-colors"
                data-cursor-hover
              >
                {es ? 'Escríbeme' : 'Get in touch'}
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center justify-center md:justify-end gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
                <Coffee className="w-4 h-4 text-orange-400" />
                <span>Powered by Coffee</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
            <span>© {currentYear} Luis Alberto Guisado - Pusho.dev.</span>
            <span>{t('footer.rights')}</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <VisitCounter />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{es ? 'Hecho con' : 'Built with'}</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-2 py-1 bg-cyan-400/20 text-cyan-500 dark:text-cyan-400 rounded-full">React</span>
              <span className="px-2 py-1 bg-purple-400/20 text-purple-500 dark:text-purple-400 rounded-full">TypeScript</span>
              <span className="px-2 py-1 bg-pink-400/20 text-pink-500 dark:text-pink-400 rounded-full">Tailwind</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements — fixed positions so they don't jump on re-render */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 rounded-full"
              style={{ left: `${(i * 23 + 8) % 96}%`, top: `${(i * 37 + 12) % 88}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
