/**
 * Editor-style profile card showing the developer as a JS object
 */
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

const SKILLS = [
  "Laravel",
  "PHP",
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "NestJS",
  "MySQL",
  "PostgreSQL",
  "Docker",
];

const punct = "text-zinc-600 dark:text-gray-400";

const Str: React.FC<{ value: string; className?: string }> = ({
  value,
  className = "text-green-600 dark:text-green-400",
}) => (
  <>
    <span className={punct}>'</span>
    <span className={className}>{value}</span>
    <span className={punct}>'</span>
  </>
);

const Key: React.FC<{ name: string }> = ({ name }) => (
  <span className="text-zinc-800 dark:text-white">{name}: </span>
);

const CoderProfileCard: React.FC = () => {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const role = language === "es" ? "Desarrollador Full-Stack" : "Full-Stack Developer";
  const experience = language === "es" ? "5+ años" : "5+ years";
  const name = "Luis Guisado";
  const location = "Granma, Cuba";

  // Each entry is one logical line; the number sits in the same row so it
  // stays aligned even when the skills line wraps.
  const lines: { indent?: boolean; content: React.ReactNode }[] = [
    {
      content: (
        <>
          <span className="text-pink-500 dark:text-pink-400">const </span>
          <span className="text-violet-500 dark:text-violet-400">coder </span>
          <span className="text-pink-500 dark:text-pink-400">= </span>
          <span className={punct}>{"{"}</span>
        </>
      ),
    },
    { indent: true, content: <><Key name="name" /><Str value={name} /><span className={punct}>,</span></> },
    { indent: true, content: <><Key name="role" /><Str value={role} /><span className={punct}>,</span></> },
    { indent: true, content: <><Key name="location" /><Str value={location} /><span className={punct}>,</span></> },
    { indent: true, content: <><Key name="experience" /><Str value={experience} /><span className={punct}>,</span></> },
    {
      indent: true,
      content: (
        <>
          <Key name="skills" />
          <span className={punct}>[</span>
          {SKILLS.map((skill, index) => (
            <span key={skill}>
              <Str value={skill} className="text-cyan-600 dark:text-cyan-400" />
              {index < SKILLS.length - 1 && <span className={punct}>, </span>}
            </span>
          ))}
          <span className={punct}>],</span>
        </>
      ),
    },
    {
      indent: true,
      content: (
        <>
          <Key name="available" />
          <span className="text-orange-500 dark:text-orange-400">true</span>
          <span className={punct}>,</span>
        </>
      ),
    },
    { content: <span className={punct}>{"};"}</span> },
  ];

  const summary =
    language === "es"
      ? `${name}, ${role} en ${location}, ${experience} de experiencia. Tecnologías: ${SKILLS.join(", ")}. Disponible para trabajar.`
      : `${name}, ${role} based in ${location}, ${experience} of experience. Technologies: ${SKILLS.join(", ")}. Available for work.`;

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden border rounded-2xl shadow-2xl bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-[#000000] dark:to-[#0a0d37] border-zinc-300 dark:border-[#1b2c68a0]"
    >
      <p className="sr-only">{summary}</p>

      <div aria-hidden="true">
        {/* Top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600" />

        {/* Window header */}
        <div className="flex items-center justify-between px-4 py-4 lg:px-6 bg-zinc-200 dark:bg-black">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-orange-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          <div className="font-mono text-xs text-zinc-600 dark:text-gray-400">
            coder.js
          </div>
        </div>

        {/* Code body */}
        <div className="relative px-4 py-6 overflow-hidden border-t-2 lg:px-6 lg:py-8 border-zinc-300 dark:border-indigo-900">
          <div className="absolute w-56 h-56 bg-blue-600 rounded-full -top-24 -left-24 opacity-10 blur-3xl" />
          <div className="absolute w-56 h-56 bg-pink-600 rounded-full -bottom-24 -right-24 opacity-10 blur-3xl" />

          <div className="relative font-mono text-xs leading-relaxed md:text-sm">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                className="flex"
              >
                <span className="hidden w-6 mr-4 text-right select-none shrink-0 md:block opacity-70 text-zinc-500 dark:text-gray-500">
                  {i + 1}
                </span>
                <div className={`min-w-0 ${line.indent ? "pl-6" : ""}`}>
                  {line.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-3 pb-4 text-xs border-t lg:px-6 border-zinc-300 dark:border-gray-800 text-zinc-600 dark:text-gray-500">
          <span>UTF-8</span>
          <span>JavaScript</span>
          <span>Ln {lines.length}, Col 3</span>
        </div>
      </div>
    </div>
  );
};

export default CoderProfileCard;
