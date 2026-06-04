import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Github, Linkedin, Twitter, Download, ArrowRight, Calendar, Rocket, Globe2 } from 'lucide-react';
import TypewriterEffect from './TypewriterEffect';
import CountUp from './CountUp';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import * as simpleIcons from 'simple-icons';
import avatarImg from '../../public/avatar_gral.png';

/* ─── helpers ─────────────────────────────────────────────────────────── */
const getIcon = (key: string) =>
  (simpleIcons as Record<string, { path: string; hex: string } | undefined>)[key];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

/* ─── data ────────────────────────────────────────────────────────────── */
const TECH = [
  { name: 'Laravel',    key: 'siLaravel',    color: '#FF2D20' },
  { name: 'React',      key: 'siReact',      color: '#61DAFB' },
  { name: 'TypeScript', key: 'siTypescript', color: '#3178C6' },
  { name: '.NET',       key: 'siDotnet',     color: '#512BD4' },
  { name: 'Tailwind',   key: 'siTailwindcss',color: '#06B6D4' },
  { name: 'GitHub',     key: 'siGithub',     color: '#e2e8f0' },
];

const STATS = [
  { value: 40,  suffix: '+', labelEs: 'Proyectos Completados', labelEn: 'Completed Projects',  icon: '</>' },
  { value: 20,  suffix: '+', labelEs: 'Clientes Felices',      labelEn: 'Happy Clients',        icon: '◎'  },
  { value: 80,  suffix: '+', labelEs: 'Invitaciones de Café',  labelEn: 'Coffee Invitations',   icon: '☕' },
  { value: 100, suffix: '%', labelEs: 'Pasión por lo que hago',labelEn: 'Passion for my work',  icon: '★'  },
];

const CARDS = [
  { labelEs: 'DISPONIBLE PARA', subEs: 'FREELANCE',     labelEn: 'AVAILABLE FOR',  subEn: 'FREELANCE',  dot: '#22d3ee', icon: null,    top: '6%',  right: '2%'  },
  { labelEs: 'EXPERIENCIA',     subEs: '5+ AÑOS',        labelEn: 'EXPERIENCE',     subEn: '5+ YEARS',   dot: '#a78bfa', icon: 'cal',   top: '28%', right: '-2%' },
  { labelEs: 'PROYECTOS',       subEs: '40+ COMPLETADOS',labelEn: 'PROJECTS',       subEn: '40+ DONE',   dot: '#f472b6', icon: 'rocket',top: '55%', right: '-2%' },
  { labelEs: 'TRABAJANDO',      subEs: 'GLOBALMENTE',    labelEn: 'WORKING',        subEn: 'GLOBALLY',   dot: '#34d399', icon: 'globe',  top: '76%', right: '2%'  },
];

const SOCIAL = [
  { icon: Github,   href: 'https://github.com/PushoDev',                   label: 'GitHub'   },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/luis-alberto-pushodev/', label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://x.com/luisguisado1990',                                              label: 'Twitter'  },
];

/* ─── component ───────────────────────────────────────────────────────── */
const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  const roles = language === 'es'
    ? ['Full Stack Developer', 'Laravel Specialist', 'React Developer', 'Backend Architect', 'Software Engineer']
    : ['Full Stack Developer', 'Laravel Specialist', 'React Developer', 'Backend Architect', 'Software Engineer'];

  return (
    <section
      ref={ref}
      id="home"
      className="relative z-10 min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: isDark
        ? 'linear-gradient(135deg, #050816 0%, #0A0F25 50%, #120B2B 100%)'
        : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f5f3ff 100%)' }}
    >
      {/* ── grid overlay ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            `linear-gradient(rgba(139,92,246,${isDark ? '0.04' : '0.07'}) 1px, transparent 1px),` +
            `linear-gradient(90deg,rgba(139,92,246,${isDark ? '0.04' : '0.07'}) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── radial glow blobs ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', filter: 'blur(80px)', opacity: isDark ? 0.2 : 0.15 }} />
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(100px)', opacity: isDark ? 0.15 : 0.12 }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', filter: 'blur(80px)', opacity: isDark ? 0.1 : 0.08 }} />
      </div>

      {/* ── floating particles ───────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${(i * 37 + 10) % 95}%`,
              top: `${(i * 53 + 5) % 90}%`,
              background: ['#06b6d4', '#8b5cf6', '#ec4899'][i % 3],
              opacity: 0.35,
            }}
            animate={{ y: [0, -(12 + i % 8), 0], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── main grid ────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center pt-24 pb-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">

            {/* ══ LEFT ═════════════════════════════════════════════════ */}
            <div className="flex flex-col gap-6 lg:pr-8">

              {/* Badge */}
              <motion.div
                {...fadeUp(0.1)}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                className="flex items-center gap-2 w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
                </span>
                <span className="text-xs font-bold tracking-[0.2em] text-pink-400 uppercase">
                  {language === 'es' ? 'Disponible para Freelance' : 'Available for Freelance'}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <p className={`text-2xl sm:text-3xl font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language === 'es' ? 'Hola, soy' : "Hello, I'm"}
                </p>
                <h1 className="font-black leading-none">
                  <span
                    className="block text-6xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)' }}
                  >
                    Luis
                  </span>
                  <span
                    className="block text-6xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
                  >
                    Guisado
                  </span>
                </h1>
              </motion.div>

              {/* Typewriter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.35 }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-transparent" />
                <div className="text-xl sm:text-2xl font-mono">
                  <TypewriterEffect words={roles} className="font-semibold" />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.45 }}
                className={`leading-relaxed max-w-lg text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {language === 'es'
                  ? <>Desarrollo aplicaciones web modernas y escalables utilizando Laravel, React, TypeScript y .NET. Transformo ideas en productos digitales{' '}
                      <span className="text-cyan-400 font-medium">rápidos</span>,{' '}
                      <span className="text-purple-400 font-medium">seguros</span>{' '}
                      y <span className="text-pink-400 font-medium">atractivos</span>.</>
                  : <>I build modern and scalable web applications using Laravel, React, TypeScript and .NET. I transform ideas into digital products that are{' '}
                      <span className="text-cyan-400 font-medium">fast</span>,{' '}
                      <span className="text-purple-400 font-medium">secure</span>{' '}
                      and <span className="text-pink-400 font-medium">attractive</span>.</>
                }
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.55 }}
                className="flex flex-wrap gap-3"
              >
                <motion.a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)',
                    boxShadow: '0 0 24px rgba(139,92,246,0.4)',
                  }}
                  data-cursor-hover
                >
                  {language === 'es' ? 'Ver Proyectos' : 'View Projects'}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="https://github.com/PushoDev/pushodev-portfolio/raw/main/public/pdf/CV_Luis_Alberto_Guisado.pdf"
                  download
                  whileHover={{ scale: 1.03, borderColor: '#22d3ee' }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition-all duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                  style={{ border: '1px solid rgba(139,92,246,0.5)', background: isDark ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.06)' }}
                  data-cursor-hover
                >
                  <Download className="w-4 h-4" />
                  {language === 'es' ? 'Descargar CV' : 'Download CV'}
                </motion.a>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.65 }}
              >
                <p className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {language === 'es' ? 'Tecnologías' : 'Technologies'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {TECH.map((tech) => {
                    const icon = getIcon(tech.key);
                    return (
                      <motion.div
                        key={tech.name}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${isDark ? 'text-gray-300 border border-white/10' : 'text-gray-600 border border-black/10'}`}
                        style={{ background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}
                        title={tech.name}
                        data-cursor-hover
                      >
                        {icon && (
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d={icon.path} fill={tech.color} />
                          </svg>
                        )}
                        <span>{tech.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Stats Glass Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.75 }}
                className={`rounded-2xl p-4 ${isDark ? 'border border-white/10' : 'border border-black/08'}`}
                style={{ background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)' }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {STATS.map((stat) => (
                    <div key={stat.labelEs} className="text-center">
                      <div
                        className="text-2xl font-black text-transparent bg-clip-text"
                        style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #a855f7)' }}
                      >
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className={`text-[10px] mt-0.5 leading-tight ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {language === 'es' ? stat.labelEs : stat.labelEn}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ══ RIGHT ════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="relative flex justify-center items-center min-h-[600px] lg:min-h-[780px]"
            >
              {/* Neon ring 1 — cyan */}
              <motion.div
                className="absolute rounded-full"
                animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '460px', height: '460px',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: '2px solid rgba(6,182,212,0.55)',
                  boxShadow: '0 0 60px rgba(6,182,212,0.3), inset 0 0 60px rgba(6,182,212,0.1)',
                  borderRadius: '50%',
                }}
              />
              {/* Neon ring 2 — pink */}
              <motion.div
                className="absolute rounded-full"
                animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{
                  width: '620px', height: '620px',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: '1.5px solid rgba(236,72,153,0.45)',
                  boxShadow: '0 0 80px rgba(236,72,153,0.2)',
                  borderRadius: '50%',
                }}
              />

              {/* Avatar — wrapper clips overflow at bottom */}
              <div className="absolute inset-x-0 bottom-0 top-0 flex justify-center items-end overflow-hidden z-10 pointer-events-none">
                <motion.img
                  src={avatarImg}
                  alt="Luis Alberto Guisado"
                  className="select-none"
                  style={{
                    height: 'clamp(700px, 110vh, 1100px)',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    filter: 'drop-shadow(0 0 60px rgba(139,92,246,0.5)) drop-shadow(0 0 24px rgba(6,182,212,0.25))',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 70%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 70%, transparent 100%)',
                  }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  draggable={false}
                />
              </div>

              {/* Floating glass cards */}
              {CARDS.map((card, i) => (
                <motion.div
                  key={card.labelEs}
                  className="absolute z-20 rounded-xl px-3 py-2.5 border border-white/10 min-w-[140px]"
                  style={{
                    top: card.top,
                    right: card.right,
                    background: isDark ? 'rgba(10,15,37,0.75)' : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: isDark
                      ? `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)`
                      : `0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)`,
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView
                    ? { opacity: 1, x: 0, y: [0, -4, 0] }
                    : { opacity: 0, x: 30 }}
                  transition={{
                    opacity: { delay: 0.5 + i * 0.12, duration: 0.5 },
                    x: { delay: 0.5 + i * 0.12, duration: 0.5 },
                    y: { delay: 0.5 + i * 0.12, duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${card.dot}18`, border: `1px solid ${card.dot}40` }}
                    >
                      {card.icon === 'cal'    && <Calendar className="w-4 h-4" style={{ color: card.dot }} />}
                      {card.icon === 'rocket' && <Rocket   className="w-4 h-4" style={{ color: card.dot }} />}
                      {card.icon === 'globe'  && <Globe2   className="w-4 h-4" style={{ color: card.dot }} />}
                      {!card.icon && <span className="w-2 h-2 rounded-full" style={{ background: card.dot, boxShadow: `0 0 6px ${card.dot}` }} />}
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: card.dot }}>
                        {language === 'es' ? card.labelEs : card.labelEn}
                      </p>
                      <p className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {language === 'es' ? card.subEs : card.subEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social links — bottom right of right column */}
              <motion.div
                className="absolute bottom-0 right-4 flex gap-2 z-20"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, boxShadow: '0 0 16px rgba(139,92,246,0.6)' }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${isDark ? 'border border-white/10 text-gray-400 hover:text-white' : 'border border-black/10 text-gray-500 hover:text-gray-800'}`}
                    style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                    data-cursor-hover
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── scroll caret ───────────────────────────────────────────────── */}
      <motion.div
        className="flex justify-center pb-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className={`flex flex-col items-center gap-1 transition-colors ${isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
          data-cursor-hover
        >
          <span className="text-[9px] tracking-[0.2em] uppercase">Scroll</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
