/**
 * Skills section with interactive technology cards and animated quote
 */
import React, { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import * as simpleIcons from "simple-icons";

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("frontend");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = {
    frontend: {
      title: t("skills.frontend"),
      skills: [
        { name: "HTML5", color: "#E34C26", iconKey: "siHtml5" },
        { name: "CSS3", color: "#1572B6", iconKey: "siCss" },
        { name: "JavaScript", color: "#F7DF1E", iconKey: "siJavascript" },
        { name: "TypeScript", color: "#3178C6", iconKey: "siTypescript" },
        { name: "React", color: "#61DAFB", iconKey: "siReact" },
        { name: "Vue.js", color: "#4FC08D", iconKey: "siVuedotjs" },
        { name: "Tailwind CSS", color: "#06B6D4", iconKey: "siTailwindcss" },
        { name: "Flutter", color: "#02569B", iconKey: "siFlutter" },
      ],
    },
    backend: {
      title: t("skills.backend"),
      skills: [
        { name: "PHP", color: "#777BB4", iconKey: "siPhp" },
        { name: "Python", color: "#3776AB", iconKey: "siPython" },
        { name: "Laravel", color: "#FF2D20", iconKey: "siLaravel" },
        { name: "WordPress", color: "#21759B", iconKey: "siWordpress" },
        { name: "Django", color: "#092E20", iconKey: "siDjango" },
        { name: "FastAPI", color: "#009688", iconKey: "siFastapi" },
        { name: "NestJS", color: "#E0234E", iconKey: "siNestjs" },
        { name: "Dart", color: "#0175C2", iconKey: "siDart" },
        { name: "Firebase", color: "#FFA000", iconKey: "siFirebase" },
        { name: "Node.js", color: "#339933", iconKey: "siNodedotjs" },
      ],
    },
    tools: {
      title: t("skills.tools"),
      skills: [
        { name: "Docker", color: "#2496ED", iconKey: "siDocker" },
        { name: "Kubernetes", color: "#326CE5", iconKey: "siKubernetes" },
        { name: "Git", color: "#F05032", iconKey: "siGit" },
        { name: "GitHub", color: "#181717", iconKey: "siGithub" },
        { name: "GitHub Actions", color: "#2088FF", iconKey: "siGithubactions" },
        { name: "Postman", color: "#FF6C37", iconKey: "siPostman" },
        { name: "MySQL", color: "#4479A1", iconKey: "siMysql" },
        { name: "PostgreSQL", color: "#336791", iconKey: "siPostgresql" },
        { name: "MongoDB", color: "#13AA52", iconKey: "siMongodb" },
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
          <div className="p-2 border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20">
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 mx-1 ${
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
          {skillCategories[
            activeCategory as keyof typeof skillCategories
          ].skills.map((skill, index) => (
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
              <div
                className="p-6 transition-all duration-300 border shadow-lg cursor-pointer backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20 hover:shadow-2xl hover:border-white/40"
                data-cursor-hover
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-10 rounded-2xl"
                  style={{ backgroundColor: "var(--skill-color)" }}
                />

                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                    {(() => {
                      const iconData = simpleIcons[
                        skill.iconKey as keyof typeof simpleIcons
                      ] as any;
                      return iconData && iconData.path ? (
                        <svg
                          className="w-8 h-8"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d={iconData.path} fill={skill.color} />
                        </svg>
                      ) : null;
                    })()}
                  </div>
                  <h3 className="font-semibold text-gray-800 transition-all duration-300 dark:text-gray-200 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text">
                    {skill.name}
                  </h3>
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-20 blur-xl rounded-2xl -z-10"
                  style={{ backgroundColor: "var(--skill-color)" }}
                />
              </div>
            </motion.div>
          ))}
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
