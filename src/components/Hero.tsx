/**
 * Hero section with typewriter effect, animated elements and social links
 */
import React from "react";
import { motion } from "motion/react";
import { Github, Linkedin, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import TypewriterEffect from "./TypewriterEffect";
import CountUp from "./CountUp";
import { useLanguage } from "../contexts/LanguageContext";

const Hero: React.FC = () => {
  const { t, language } = useLanguage();

  const roles =
    language === "es"
      ? [
          "Desarrollador Full-Stack",
          "Autodidacta",
          "Innovador",
          "Solución de Problemas",
        ]
      : ["Full-Stack Developer", "Self-taught", "Innovator", "Problem Solver"];

  const stats = [
    { key: "stats.projects", value: 42, suffix: "+" },
    { key: "stats.clients", value: 50, suffix: "+" },
    { key: "stats.coffee", value: 80, suffix: "+" },
    { key: "stats.thesis", value: 15, suffix: "+" },
  ];

  const technologies = [
    { name: "React", color: "text-blue-400" },
    { name: "Laravel", color: "text-red-500" },
    { name: "Vue", color: "text-green-400" },
    { name: "Python", color: "text-yellow-400" },
    { name: "Node.js", color: "text-green-500" },
    { name: "TypeScript", color: "text-blue-600" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/PushoDev", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/luis-alberto-pushodev/",
      label: "LinkedIn",
    },
    {
      icon: ExternalLink,
      href: "https://puschoft.blogspot.com/",
      label: "Blog",
    },
  ];

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen pt-16 overflow-hidden"
    >
      {/* Floating circles around image */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-96 h-96"
        >
          <div className="relative w-full h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`outer-${i}`}
                className="absolute w-4 h-4 rounded-full shadow-lg bg-gradient-to-r from-cyan-400 to-purple-500 shadow-cyan-400/50"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${
                    i * 45
                  }deg) translateY(-48px) translateX(-50%)`,
                  transformOrigin: "50% 48px",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-72 h-72"
        >
          <div className="relative w-full h-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`inner-${i}`}
                className="absolute w-3 h-3 rounded-full shadow-lg bg-gradient-to-r from-pink-400 to-orange-500 shadow-pink-400/50"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${
                    i * 60
                  }deg) translateY(-36px) translateX(-50%)`,
                  transformOrigin: "50% 36px",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.25,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-5xl font-bold lg:text-7xl"
            >
              <span className="text-gray-800 dark:text-gray-200">
                {t("hero.greeting")}
              </span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text">
                Luis A. Guisado
              </span>
            </motion.h1>

            <div className="h-12 mb-8 text-2xl lg:text-3xl">
              <TypewriterEffect words={roles} className="font-semibold" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {t("hero.description")}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center mb-8 space-x-4 lg:justify-start"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-12 h-12 text-gray-700 transition-colors duration-300 border rounded-full shadow-lg bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border-white/20 dark:text-gray-300 hover:text-cyan-400"
                  data-cursor-hover
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Download CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                size="lg"
                className="px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 hover:shadow-xl"
                data-cursor-hover
              >
                {t("hero.downloadCV")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image with Tech Logos */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center"
          >
            {/* Profile Image */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden border-4 rounded-full shadow-2xl w-80 h-80 border-gradient-to-r from-cyan-400 to-purple-500 shadow-cyan-400/20"
              >
                <img
                  src="https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/df140b5a-6101-409e-b0ef-0ce43ad9d4f7.jpg"
                  alt="Luis Alberto - Pusho.dev"
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {/* Tech logos around image */}
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={`absolute w-12 h-12 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center ${tech.color} font-bold text-sm shadow-lg`}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${
                      index * 60
                    }deg) translateY(-50px) translateX(-50%) rotate(-${
                      index * 60
                    }deg)`,
                    transformOrigin: "50% 50px",
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  {tech.name.slice(0, 2)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-2 gap-8 mt-20 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              whileHover={{ scale: 1.05 }}
              className="p-6 text-center border shadow-lg rounded-2xl bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm border-white/10"
            >
              <div className="mb-2 text-3xl font-bold text-transparent lg:text-4xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-gray-600 lg:text-base dark:text-gray-300">
                {t(stat.key)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
        >
          <motion.button
            onClick={() =>
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-2 text-gray-700 transition-colors duration-300 border rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border-white/20 dark:text-gray-300 hover:text-cyan-400"
            data-cursor-hover
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
