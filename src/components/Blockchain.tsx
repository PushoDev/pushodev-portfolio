/**
 * "Towards Fullstack Blockchain": honest learning roadmap + how the existing
 * Web2 stack connects to smart contracts. Nothing here is shown as finished.
 */
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import GlitchVault from './GlitchVault';
import { useLanguage } from '../contexts/LanguageContext';

type PhaseStatus = 'current' | 'next';

const PHASES: {
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  status: PhaseStatus;
}[] = [
  {
    titleEs: 'Fundamentos y Solidity 0.8',
    titleEn: 'Fundamentals and Solidity 0.8',
    descEs: 'Modelo mental de la blockchain, gas, storage y eventos. Entorno con Foundry listo.',
    descEn: 'Blockchain mental model, gas, storage and events. Foundry environment ready.',
    status: 'current',
  },
  {
    titleEs: 'Contratos con tests',
    titleEn: 'Contracts with tests',
    descEs: 'ERC-20 con OpenZeppelin, tests unitarios y fuzz, y cobertura medida.',
    descEn: 'ERC-20 with OpenZeppelin, unit and fuzz tests, and measured coverage.',
    status: 'next',
  },
  {
    titleEs: 'Seguridad',
    titleEn: 'Security',
    descEs: 'Reentrada, control de acceso y firmas: para cada una, el test que la explota y el arreglo.',
    descEn: 'Reentrancy, access control and signatures: for each, the test that exploits it and the fix.',
    status: 'next',
  },
  {
    titleEs: 'Proyecto en testnet',
    titleEn: 'Testnet project',
    descEs: 'Contrato desplegado con código verificado, README con límites y demo reproducible.',
    descEn: 'Deployed contract with verified code, a README with limits and a reproducible demo.',
    status: 'next',
  },
  {
    titleEs: 'Integración Web2 + Web3',
    titleEn: 'Web2 + Web3 integration',
    descEs: 'Indexador de eventos en Laravel y una interfaz React con wagmi y viem.',
    descEn: 'Event indexer in Laravel and a React interface with wagmi and viem.',
    status: 'next',
  },
];

const FLOW = ['Solidity', 'Eventos', 'Indexador Laravel', 'PostgreSQL', 'API', 'React + wagmi'];
const FLOW_EN = ['Solidity', 'Events', 'Laravel indexer', 'PostgreSQL', 'API', 'React + wagmi'];

const Blockchain: React.FC = () => {
  const { language } = useLanguage();
  const es = language === 'es';
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blockchain" className="relative py-20">
      <div ref={ref} className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-purple-400 uppercase">
            {es ? 'Siguiente paso' : 'Next step'}
          </p>
          <h2 className="mb-6 text-4xl font-bold text-transparent lg:text-5xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text">
            {es ? 'De Fullstack a Fullstack Blockchain' : 'From Fullstack to Fullstack Blockchain'}
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {es
              ? 'Estoy aprendiendo a escribir contratos inteligentes con pruebas y a conectarlos con una aplicación web real. Publico cada proyecto solo cuando tiene código, tests y una demo en testnet.'
              : 'I am learning to write smart contracts with tests and connect them to a real web application. I publish each project only once it has code, tests and a testnet demo.'}
          </p>
        </motion.div>

        {/* Roadmap */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.titleEn}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <GlitchVault
                className="h-full border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20"
                contentClassName="p-5"
                glitchColor="#a78bfa"
                glitchRadius={80}
                animatedBorder={phase.status === 'current'}
              >
                <span
                  className={`inline-block px-2.5 py-0.5 mb-3 text-[10px] font-bold tracking-wider uppercase rounded-full ${
                    phase.status === 'current'
                      ? 'text-white bg-gradient-to-r from-amber-500 to-orange-600'
                      : 'text-purple-400 border border-dashed border-purple-400/60'
                  }`}
                >
                  {phase.status === 'current' ? (es ? 'En curso' : 'In progress') : es ? 'Próximo' : 'Next'}
                </span>
                <div className="mb-1 font-mono text-xs text-gray-500 dark:text-gray-400">
                  {es ? 'Fase' : 'Phase'} {i + 1}
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-800 dark:text-gray-100">
                  {es ? phase.titleEs : phase.titleEn}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {es ? phase.descEs : phase.descEn}
                </p>
              </GlitchVault>
            </motion.div>
          ))}
        </div>

        {/* How the Web2 stack plugs in */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative p-6 mt-10 border shadow-lg gb backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20"
        >
          <h3 className="mb-1 text-lg font-bold text-gray-800 dark:text-gray-100">
            {es ? 'Mi base Web2 es la ventaja' : 'My Web2 background is the edge'}
          </h3>
          <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
            {es
              ? 'La cadena guarda lo que debe ser inmutable; todo lo demás sigue en el backend que ya conozco.'
              : 'The chain stores what must be immutable; everything else stays in the backend I already know.'}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {(es ? FLOW : FLOW_EN).map((step, i, arr) => (
              <React.Fragment key={step}>
                <span className="px-3 py-1.5 text-sm font-medium text-gray-700 border rounded-full bg-white/20 dark:bg-gray-800/50 dark:text-gray-200 border-white/20">
                  {step}
                </span>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-purple-400" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-4 mt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ShieldAlert className="flex-shrink-0 w-4 h-4 mt-0.5 text-amber-500" />
            {es
              ? 'Material educativo, sin auditar. No usar con fondos reales.'
              : 'Educational material, unaudited. Do not use with real funds.'}
          </p>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300"
            data-cursor-hover
          >
            {es ? 'Ver las ideas Web3 en Proyectos' : 'See the Web3 ideas in Projects'}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blockchain;
