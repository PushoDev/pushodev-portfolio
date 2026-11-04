/**
 * "Own products": the two products I build myself (GolfitoShop and DayClosure),
 * introduced by the brand illustration. Short on purpose; details live in Projects.
 */
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import GlitchVault from './GlitchVault';
import { useLanguage } from '../contexts/LanguageContext';
import badge from '@/imgs/pusho-badge.png';

interface Product {
  name: string;
  roleEs: string;
  roleEn: string;
  statusEs: string;
  statusEn: string;
  statusClass: string;
  glow: string;
  factsEs: string[];
  factsEn: string[];
}

const PRODUCTS: Product[] = [
  {
    name: 'GolfitoShop',
    roleEs: 'Fundador',
    roleEn: 'Founder',
    statusEs: 'En producción',
    statusEn: 'In production',
    statusClass: 'from-emerald-500 to-teal-600',
    glow: '#F5A623',
    factsEs: [
      'Marketplace local de Granma: negocios, servicios y clientes en un solo lugar.',
      'Web, API y bot de Telegram en producción; apps móviles en desarrollo.',
      'Membresías, anuncios por zona y pedidos coordinados por WhatsApp.',
    ],
    factsEn: [
      "Granma's local marketplace: businesses, services and customers in one place.",
      'Web, API and Telegram bot in production; mobile apps in development.',
      'Memberships, zone-based ads and orders coordinated through WhatsApp.',
    ],
  },
  {
    name: 'DayClosure',
    roleEs: 'Producto propio',
    roleEn: 'Own product',
    statusEs: 'En desarrollo',
    statusEn: 'In development',
    statusClass: 'from-amber-500 to-orange-600',
    glow: '#FFC131',
    factsEs: [
      'ERP/POS instalable para pequeños negocios con conexión inestable.',
      'Escritorio y móvil con datos locales en SQLite, un despliegue por negocio.',
      'Reconstruido con Tauri (Rust + React) sobre reglas de negocio ya validadas.',
    ],
    factsEn: [
      'Installable ERP/POS for small businesses with unreliable connectivity.',
      'Desktop and mobile with local SQLite data, one deployment per business.',
      'Rebuilt with Tauri (Rust + React) on business rules already validated.',
    ],
  },
];

const OwnProducts: React.FC = () => {
  const { language } = useLanguage();
  const es = language === 'es';
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="products" className="relative py-20">
      <div ref={ref} className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            <div
              aria-hidden="true"
              className="absolute w-3/4 rounded-full aspect-square opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(circle, #8b5cf6 0%, #06b6d4 50%, transparent 70%)' }}
            />
            <motion.img
              src={badge}
              alt={
                es
                  ? 'Luis Guisado con las mascotas de GolfitoShop y DayClosure'
                  : 'Luis Guisado with the GolfitoShop and DayClosure mascots'
              }
              width={420}
              height={420}
              draggable={false}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-[420px] select-none drop-shadow-2xl"
            />
          </motion.div>

          {/* Copy + product cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-4xl font-bold text-transparent lg:text-5xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text">
                {es ? 'Productos propios' : 'Products of my own'}
              </h2>
              <p className="max-w-xl mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                {es
                  ? 'Además de proyectos para clientes, diseño y construyo mis propios productos, de la idea al despliegue.'
                  : 'Besides client work, I design and build my own products, from idea to deployment.'}
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {PRODUCTS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                >
                  <GlitchVault
                    className="h-full border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20"
                    contentClassName="p-6"
                    glitchColor={p.glow}
                    glitchRadius={90}
                    animatedBorder
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${p.statusClass}`}>
                        {es ? p.statusEs : p.statusEn}
                      </span>
                      <span className="text-xs font-medium text-purple-500 dark:text-purple-400">
                        {es ? p.roleEs : p.roleEn}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-800 dark:text-gray-100">{p.name}</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      {(es ? p.factsEs : p.factsEn).map((fact) => (
                        <li key={fact} className="flex gap-2">
                          <Check className="flex-shrink-0 w-4 h-4 mt-0.5 text-cyan-400" aria-hidden="true" />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </GlitchVault>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-purple-500 dark:text-purple-400 hover:text-purple-400"
              data-cursor-hover
            >
              {es ? 'Ver todos los proyectos' : 'See all projects'}
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnProducts;
