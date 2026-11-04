/**
 * Skills section with interactive technology cards and animated quote
 */
import React, { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import * as simpleIcons from "simple-icons";
import GlitchVault from "./GlitchVault";

interface Skill {
  name: string;
  color: string;
  /** simple-icons key; omit and use `abbr` when the brand has no icon there */
  iconKey?: string;
  abbr?: string;
  /** Still being learned: shown with a badge */
  learning?: boolean;
}

const SkillIcon: React.FC<{ skill: Skill; size: "sm" | "lg" }> = ({ skill, size }) => {
  const iconData = skill.iconKey
    ? (simpleIcons[skill.iconKey as keyof typeof simpleIcons] as any)
    : null;
  const box = size === "lg" ? "w-8 h-8" : "w-6 h-6";
  if (iconData?.path) {
    return (
      <svg className={box} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d={iconData.path} fill={skill.color} />
      </svg>
    );
  }
  return (
    <span
      className={`${box} flex items-center justify-center font-black leading-none ${size === "lg" ? "text-sm" : "text-[9px]"}`}
      style={{ color: skill.color }}
    >
      {skill.abbr ?? skill.name.slice(0, 2)}
    </span>
  );
};

const Skills: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("frontend");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories: Record<string, { title: string; skills: Skill[] }> = {
    frontend: {
      title: t("skills.frontend"),
      skills: [
        { name: "HTML5", color: "#E34C26", iconKey: "siHtml5" },
        { name: "CSS3", color: "#1572B6", iconKey: "siCss" },
        { name: "JavaScript", color: "#F7DF1E", iconKey: "siJavascript" },
        { name: "TypeScript", color: "#3178C6", iconKey: "siTypescript" },
        { name: "React", color: "#61DAFB", iconKey: "siReact" },
        { name: "Next.js", color: "#808080", iconKey: "siNextdotjs" },
        { name: "Vue.js", color: "#4FC08D", iconKey: "siVuedotjs" },
        { name: "Inertia.js", color: "#9553E9", iconKey: "siInertia" },
        { name: "Vite", color: "#646CFF", iconKey: "siVite" },
        { name: "Tailwind CSS", color: "#06B6D4", iconKey: "siTailwindcss" },
        { name: "MUI", color: "#007FFF", iconKey: "siMui" },
      ],
    },
    backend: {
      title: t("skills.backend"),
      skills: [
        { name: "PHP", color: "#777BB4", iconKey: "siPhp" },
        { name: "Laravel", color: "#FF2D20", iconKey: "siLaravel" },
        { name: "Python", color: "#3776AB", iconKey: "siPython" },
        { name: "Django", color: "#44B78B", iconKey: "siDjango" },
        { name: "FastAPI", color: "#009688", iconKey: "siFastapi" },
        { name: "Node.js", color: "#339933", iconKey: "siNodedotjs" },
        { name: "NestJS", color: "#E0234E", iconKey: "siNestjs" },
        { name: ".NET", color: "#512BD4", iconKey: "siDotnet" },
        { name: "C#", color: "#9B4F96", abbr: "C#" },
        { name: "Telegram Bots", color: "#26A5E4", iconKey: "siTelegram" },
        { name: "Odoo", color: "#714B67", iconKey: "siOdoo" },
        { name: "WordPress", color: "#21759B", iconKey: "siWordpress" },
      ],
    },
    tools: {
      title: t("skills.tools"),
      skills: [
        { name: "PostgreSQL", color: "#4169E1", iconKey: "siPostgresql" },
        { name: "MySQL", color: "#4479A1", iconKey: "siMysql" },
        { name: "MariaDB", color: "#4479A1", iconKey: "siMariadb" },
        { name: "SQL Server", color: "#CC2927", abbr: "SQL" },
        { name: "SQLite", color: "#0F80CC", iconKey: "siSqlite" },
        { name: "Redis", color: "#FF4438", iconKey: "siRedis" },
        { name: "MongoDB", color: "#13AA52", iconKey: "siMongodb" },
        { name: "Docker", color: "#2496ED", iconKey: "siDocker" },
        { name: "Kubernetes", color: "#326CE5", iconKey: "siKubernetes" },
        { name: "Linux", color: "#FCC624", iconKey: "siLinux" },
        { name: "Git", color: "#F05032", iconKey: "siGit" },
        { name: "GitHub", color: "#8b949e", iconKey: "siGithub" },
        { name: "GitHub Actions", color: "#2088FF", iconKey: "siGithubactions" },
        { name: "Postman", color: "#FF6C37", iconKey: "siPostman" },
      ],
    },
    mobile: {
      title: t("skills.mobile"),
      skills: [
        { name: "React Native", color: "#61DAFB", iconKey: "siReact" },
        { name: "Expo", color: "#a78bfa", iconKey: "siExpo" },
        { name: "TanStack Query", color: "#FF4154", iconKey: "siReactquery" },
        { name: "Firebase", color: "#FFA000", iconKey: "siFirebase" },
        { name: "Flutter", color: "#02569B", iconKey: "siFlutter" },
        { name: "Dart", color: "#0175C2", iconKey: "siDart" },
        { name: "Tauri", color: "#FFC131", iconKey: "siTauri", learning: true },
        { name: "Rust", color: "#CE422B", iconKey: "siRust", learning: true },
      ],
    },
    blockchain: {
      title: t("skills.blockchain"),
      skills: [
        { name: "Solidity", color: "#8a92b2", iconKey: "siSolidity", learning: true },
        { name: "Foundry", color: "#F59E0B", abbr: "FDY", learning: true },
        { name: "OpenZeppelin", color: "#4E5EE4", iconKey: "siOpenzeppelin", learning: true },
        { name: "Ethereum", color: "#8c9be8", iconKey: "siEthereum", learning: true },
      ],
    },
  };

  return (
    <section id="skills" className="relative py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Animated Quote */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-4xl font-bold text-transparent lg:text-5xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text"
          >
            {t("skills.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-lg italic leading-relaxed text-gray-600 lg:text-xl dark:text-gray-300"
          >
            "{t("skills.quote")}"
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-1 p-2 border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20">
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-white/10"
                }`}
                data-cursor-hover
              >
                {category.title}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                z: 50,
              }}
              className="relative group"
              style={{ "--skill-color": skill.color } as React.CSSProperties}
            >
              <GlitchVault
                className="transition-all duration-300 border shadow-lg cursor-pointer backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20 hover:shadow-2xl hover:border-white/40"
                contentClassName="p-6 text-center"
                glitchColor={skill.color}
                glitchRadius={90}
                animatedBorder
                overlay={
                  <>
                    {/* Gradient overlay on hover */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-10 rounded-2xl"
                      style={{ backgroundColor: "var(--skill-color)" }}
                    />
                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-20 blur-xl rounded-2xl -z-10"
                      style={{ backgroundColor: "var(--skill-color)" }}
                    />
                  </>
                }
              >
                <div className="flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <SkillIcon skill={skill} size="lg" />
                </div>
                <h3 className="font-semibold text-gray-800 transition-all duration-300 dark:text-gray-200 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text">
                  {skill.name}
                </h3>
                {skill.learning && (
                  <span className="inline-block px-2 py-0.5 mt-2 text-[10px] font-semibold tracking-wider uppercase border border-dashed rounded-full border-purple-400/70 text-purple-400">
                    {language === "es" ? "Aprendiendo" : "Learning"}
                  </span>
                )}
              </GlitchVault>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Horizontal Marquee — infinite scroll of all tech logos ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 overflow-hidden"
        >
          <p className="mb-4 text-xs tracking-[0.25em] text-center text-gray-500 uppercase">
            & More
          </p>
          <div
            className="flex gap-8 animate-marquee w-max"
            style={{ cursor: 'default' }}
          >
            {/* Duplicated to create seamless loop (–50% translateX = one full cycle) */}
            {[...Object.values(skillCategories).flatMap(c => c.skills),
              ...Object.values(skillCategories).flatMap(c => c.skills)].map(
              (skill, index) => {
                return (
                  <div
                    key={`marquee-${index}`}
                    className="flex flex-col items-center gap-2 flex-shrink-0"
                    title={skill.name}
                  >
                    <div className="p-2 border rounded-xl bg-white/5 dark:bg-gray-800/30 border-white/10">
                      <SkillIcon skill={skill} size="sm" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
