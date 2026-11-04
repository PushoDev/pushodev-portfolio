/**
 * Work experience + education timeline, built from the LinkedIn profile.
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Entry {
  org: string;
  roleEs: string;
  roleEn: string;
  period: string;
  periodEn?: string;
  place?: string;
  descEs: string;
  descEn: string;
  stack?: string[];
  current?: boolean;
}

const EXPERIENCE: Entry[] = [
  {
    org: 'GIAvantech Softwares',
    roleEs: 'Programador full stack',
    roleEn: 'Full stack developer',
    period: 'Sep 2026 – Presente',
    periodEn: 'Sep 2026 – Present',
    place: 'Joinville, Brasil · Remoto',
    descEs: 'Soluciones full stack con arquitecturas limpias y APIs REST, servicios orientados a microservicios y automatización de procesos con IA generativa y bots de Telegram. Mantenimiento de aplicaciones en producción con foco en rendimiento y seguridad.',
    descEn: 'Full stack solutions with clean architectures and REST APIs, microservice-oriented services, and process automation with generative AI and Telegram bots. Maintenance of production apps focused on performance and security.',
    stack: ['React', 'Node.js', 'Django', 'PostgreSQL', 'Docker'],
    current: true,
  },
  {
    org: 'Innovasoft Colombia',
    roleEs: 'Programador full stack',
    roleEn: 'Full stack developer',
    period: 'Feb – Mar 2026',
    place: 'Remoto',
    descEs: 'Componentes React integrados con la API y soporte de servicios .NET con lógica de negocio en procedimientos almacenados de SQL Server, en un equipo distribuido en Latinoamérica.',
    descEn: 'React components integrated with the API and support for .NET services with business logic in SQL Server stored procedures, on a team distributed across Latin America.',
    stack: ['React', '.NET', 'C#', 'SQL Server'],
  },
  {
    org: 'Hospital Celia Sánchez Manduley',
    roleEs: 'Ingeniero de software',
    roleEn: 'Software engineer',
    period: 'Feb 2024 – Oct 2026',
    place: 'Manzanillo, Granma, Cuba',
    descEs: 'Diseño de microservicios para flujos de datos médicos, pipelines de procesamiento asíncrono entre departamentos y optimización de índices en bases de datos relacionales para reducir tiempos de respuesta en operaciones críticas.',
    descEn: 'Microservice design for medical data flows, asynchronous processing pipelines across departments, and index optimization in relational databases to cut response times in critical operations.',
  },
  {
    org: 'Independiente',
    roleEs: 'Desarrollador full stack',
    roleEn: 'Full stack developer',
    period: '2022 – Presente',
    periodEn: '2022 – Present',
    place: 'Manzanillo, Granma, Cuba',
    descEs: 'Sistemas completos para clientes privados: ERP/POS, marketplace y e-commerce en producción con Laravel y React, apps móviles con Expo y proyectos con Django y WordPress. Asesoría técnica de tesis y maestrías.',
    descEn: 'End-to-end systems for private clients: production ERP/POS, marketplace and e-commerce with Laravel and React, mobile apps with Expo, and projects with Django and WordPress. Technical advising for theses and master\'s projects.',
    stack: ['Laravel', 'React', 'Expo', 'Django'],
    current: true,
  },
  {
    org: 'Sistemas de Infraestructura Institucional',
    roleEs: 'Desarrollador de software',
    roleEn: 'Software developer',
    period: 'Ago 2016 – Mar 2024',
    place: 'Manzanillo, Granma, Cuba',
    descEs: 'Refactorización de plataformas monolíticas heredadas hacia sistemas web mantenibles y desarrollo de backend escalable para alta concurrencia.',
    descEn: 'Refactoring of legacy monolithic platforms into maintainable web systems and scalable backend development for high concurrency.',
  },
  {
    org: 'Ministerio de Educación',
    roleEs: 'Instructor de informática',
    roleEn: 'IT instructor',
    period: '2011 – 2014',
    place: 'Manzanillo, Granma, Cuba',
    descEs: 'Enseñanza de fundamentos de informática, Microsoft Office y Visual Basic, y formación de estudiantes avanzados en programación y resolución de problemas.',
    descEn: 'Taught computer science fundamentals, Microsoft Office and Visual Basic, and trained advanced students in programming and problem solving.',
  },
  {
    org: 'Ministerio de Salud',
    roleEs: 'Desarrollador de software (prácticas)',
    roleEn: 'Software developer (internship)',
    period: '2008 – 2010',
    place: 'Manzanillo, Granma, Cuba',
    descEs: 'Prácticas laborales tras graduarme en el Instituto Preuniversitario de Informática Rubén Bravo Álvarez.',
    descEn: 'Work placement after graduating from the Rubén Bravo Álvarez computer science pre-university institute.',
  },
];

const EDUCATION = [
  {
    org: 'Universidad de Granma',
    titleEs: 'Grado en Ingeniería',
    titleEn: 'Engineering degree',
    period: '2018 – 2022',
  },
  {
    org: 'IPI Rubén Bravo Álvarez',
    titleEs: 'Bachiller Técnico de Informática',
    titleEn: 'Technical Baccalaureate in Computer Science',
    period: '2005 – 2008',
  },
];

/** Oldest → newest, so the horizontal timeline reads left to right */
const TIMELINE = [...EXPERIENCE].reverse();

const CARD_W = 'w-[82vw] max-w-[420px] sm:w-[420px]';

const Card: React.FC<{
  item: Entry;
  es: boolean;
  x: MotionValue<number>;
  className?: string;
}> = ({ item, es, x, className = '' }) => {
  const ref = useRef<HTMLLIElement>(null);
  // Cards shrink and fade slightly as they move away from the screen centre
  const closeness = useTransform(x, (latest) => {
    const el = ref.current;
    if (!el) return 1;
    const viewport = window.innerWidth;
    const centre = el.offsetLeft + el.offsetWidth / 2 + latest;
    return 1 - Math.min(Math.abs(centre - viewport / 2) / (viewport * 0.6), 1);
  });
  const scale = useTransform(closeness, [0, 1], [0.88, 1]);
  const opacity = useTransform(closeness, [0, 1], [0.45, 1]);

  return (
    <motion.li
      ref={ref}
      style={{ scale, opacity }}
      className={`relative flex-shrink-0 ${CARD_W} ${className}`}
    >
      {/* year above the rail */}
      <div className="mb-6 text-5xl font-black tracking-tight text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
        {item.period.match(/\d{4}/)?.[0]}
      </div>
      {/* dot on the rail */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-[4.6rem] z-10 h-4 w-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 ring-4 ring-purple-500/25"
      />
      <div className="p-6 mt-10 border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20">
        <div className="flex flex-wrap items-center gap-2 mb-1 text-xs font-medium text-cyan-500 dark:text-cyan-400">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{es ? item.period : item.periodEn ?? item.period}</span>
          {item.current && (
            <span className="px-2 py-0.5 text-[10px] font-bold text-white rounded-full bg-gradient-to-r from-emerald-500 to-teal-600">
              {es ? 'Actual' : 'Current'}
            </span>
          )}
        </div>
        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{item.org}</h4>
        <p className="text-sm font-semibold text-purple-500 dark:text-purple-400">
          {es ? item.roleEs : item.roleEn}
        </p>
        {item.place && <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">{item.place}</p>}
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {es ? item.descEs : item.descEn}
        </p>
        {item.stack && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium text-gray-700 border rounded-full bg-white/20 dark:bg-gray-800/50 dark:text-gray-300 border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
};

/** Pinned section: vertical scrolling drives a horizontal track */
const HorizontalTimeline: React.FC<{ es: boolean }> = ({ es }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [shift, setShift] = useState(0); // how far the track must travel
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      setVh(window.innerHeight);
      setShift(Math.max(0, (trackRef.current?.scrollWidth ?? w) - w));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -shift]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);
  const [current, setCurrent] = useState(1);
  useEffect(
    () =>
      smooth.on('change', (p) =>
        setCurrent(Math.min(TIMELINE.length, Math.max(1, Math.round(p * (TIMELINE.length - 1)) + 1)))
      ),
    [smooth]
  );

  return (
    // height = horizontal distance + one screen, so 1px of scroll ≈ 1px of travel
    <div ref={sectionRef} style={{ height: shift + vh || '300vh' }} className="relative">
      <div className="sticky top-0 flex flex-col justify-center h-screen overflow-hidden">
        <div className="px-4 pt-16 mb-6 text-center">
          <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
            {es ? 'Experiencia' : 'Experience'}
          </h3>
          <p className="mt-2 text-xs tracking-widest text-gray-500 uppercase dark:text-gray-400">
            {es ? 'Desliza hacia abajo para avanzar' : 'Scroll down to move along'}
          </p>
        </div>

        <motion.ol ref={trackRef} style={{ x }} className="relative flex items-start w-max gap-8 px-[9vw]">
          {/* rail that travels with the cards */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[5.1rem] h-px bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-50"
          />
          {TIMELINE.map((item) => (
            <Card key={`${item.org}-${item.period}`} item={item} es={es} x={x} />
          ))}
        </motion.ol>

        {/* progress */}
        <div className="px-6 mt-8">
          <div className="flex items-center max-w-md gap-3 mx-auto">
            <div className="flex-1 h-1 overflow-hidden rounded-full bg-gray-500/20">
              <motion.div
                style={{ scaleX: bar, transformOrigin: 'left' }}
                className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
              />
            </div>
            <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
              {current}/{TIMELINE.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Reduced motion: plain horizontally scrollable strip, no pinning */
const StaticTimeline: React.FC<{ es: boolean }> = ({ es }) => {
  const x = useMotionValue(0);
  return (
    <div className="px-4">
      <h3 className="mb-8 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
        {es ? 'Experiencia' : 'Experience'}
      </h3>
      <ol className="flex gap-8 pb-4 overflow-x-auto snap-x">
        {TIMELINE.map((item) => (
          <Card key={`${item.org}-${item.period}`} item={item} es={es} x={x} className="snap-center" />
        ))}
      </ol>
    </div>
  );
};

const Experience: React.FC = () => {
  const { language } = useLanguage();
  const es = language === 'es';
  const reduce = useReducedMotion();

  return (
    <div className="mt-20">
      {reduce ? <StaticTimeline es={es} /> : <HorizontalTimeline es={es} />}

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <h3 className="mt-16 mb-8 text-2xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
          {es ? 'Formación' : 'Education'}
        </h3>
        <div className="grid max-w-4xl gap-4 mx-auto sm:grid-cols-2">
          {EDUCATION.map((ed) => (
            <div
              key={ed.org}
              className="flex items-start gap-4 p-5 border backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20"
            >
              <GraduationCap className="flex-shrink-0 w-6 h-6 mt-0.5 text-purple-400" />
              <div>
                <div className="font-semibold text-gray-800 dark:text-gray-100">{ed.org}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{es ? ed.titleEs : ed.titleEn}</div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{ed.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
