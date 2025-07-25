/**
 * Skills section with interactive technology cards and animated quote
 */
import React, { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('frontend');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = {
    frontend: {
      title: t('skills.frontend'),
      skills: [
        { name: 'HTML5', color: 'from-orange-500 to-red-500', icon: '🌐' },
        { name: 'CSS3', color: 'from-blue-500 to-cyan-400', icon: '🎨' },
        { name: 'JavaScript', color: 'from-yellow-400 to-yellow-600', icon: '⚡' },
        { name: 'TypeScript', color: 'from-blue-600 to-blue-800', icon: '📘' },
        { name: 'React', color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
        { name: 'Vue.js', color: 'from-green-400 to-emerald-500', icon: '💚' },
        { name: 'Tailwind CSS', color: 'from-teal-400 to-blue-500', icon: '🌊' },
        { name: 'SASS/SCSS', color: 'from-pink-500 to-rose-500', icon: '💅' },
      ]
    },
    backend: {
      title: t('skills.backend'),
      skills: [
        { name: 'PHP', color: 'from-purple-600 to-indigo-600', icon: '🐘' },
        { name: 'Python', color: 'from-yellow-400 to-blue-500', icon: '🐍' },
        { name: 'Laravel', color: 'from-red-500 to-orange-500', icon: '🚀' },
        { name: 'Django', color: 'from-green-600 to-emerald-600', icon: '🎯' },
        { name: 'FastAPI', color: 'from-teal-500 to-cyan-500', icon: '⚡' },
        { name: 'NestJS', color: 'from-red-600 to-pink-600', icon: '🏰' },
        { name: 'WordPress', color: 'from-blue-600 to-gray-600', icon: '📝' },
        { name: 'Node.js', color: 'from-green-500 to-green-700', icon: '🟢' },
      ]
    },
    tools: {
      title: t('skills.tools'),
      skills: [
        { name: 'Docker', color: 'from-blue-500 to-cyan-500', icon: '🐳' },
        { name: 'Git', color: 'from-orange-500 to-red-500', icon: '📂' },
        { name: 'GitHub', color: 'from-gray-700 to-gray-900', icon: '🐙' },
        { name: 'Postman', color: 'from-orange-400 to-red-500', icon: '📮' },
        { name: 'VS Code', color: 'from-blue-500 to-purple-600', icon: '💻' },
        { name: 'MySQL', color: 'from-blue-600 to-orange-500', icon: '🗃️' },
        { name: 'PostgreSQL', color: 'from-blue-700 to-indigo-600', icon: '🐘' },
        { name: 'MongoDB', color: 'from-green-500 to-green-700', icon: '🍃' },
      ]
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Quote */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8"
          >
            {t('skills.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 italic max-w-3xl mx-auto leading-relaxed"
          >
            "{t('skills.quote')}"
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl p-2 border border-white/20 shadow-lg">
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 mx-1 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/10'
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 10,
                z: 50
              }}
              className="group relative"
            >
              <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-white/40 cursor-pointer"
                   data-cursor-hover>
                
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                    {skill.name}
                  </h3>
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-all duration-500 -z-10`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full"
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
