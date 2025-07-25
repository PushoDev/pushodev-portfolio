/**
 * Projects section with filtering and glassmorphism cards
 */
import React, { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Github, ExternalLink, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "GolfitoShop",
      description:
        "El ecommerce más grande de Granma con sede en Mazanillo, con funcionalidades avanzadas de comercio electrónico.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/4b2d9b98-0b1a-4cf8-8601-d60b094ac62d.jpg",
      technologies: ["WordPress", "MySQL", "QvaPay", "Stripe"],
      category: "web",
      github: "https://github.com/PushoDev",
      demo: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "Portfolio personal con efectos visuales avanzados y diseño moderno.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/3dee8b37-6d8d-4372-9c54-a729721947fe.jpg",
      technologies: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      category: "web",
      github: "https://github.com/PushoDev",
      demo: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "Aplicación de gestión de tareas con colaboración en tiempo real.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/80c2882f-1399-4bdd-82fc-1e2fb8cbe6d6.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      category: "web",
      github: "https://github.com/PushoDev",
      demo: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Mobile Weather App",
      description:
        "Aplicación móvil del clima con predicciones y alertas personalizadas.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/6a2caf5a-41ed-4717-9fa4-7408a865454d.jpg",
      technologies: ["React Native", "TypeScript", "REST API"],
      category: "mobile",
      github: "https://github.com/PushoDev",
      demo: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Desktop Inventory System",
      description:
        "Sistema de inventario para pequeñas empresas con reportes avanzados.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/03dd86ba-c717-41fd-895f-d40803dc39f5.jpg",
      technologies: ["Python", "Tkinter", "SQLite", "Pandas"],
      category: "desktop",
      github: "https://github.com/PushoDev",
      demo: "#",
      featured: false,
    },
    {
      id: 6,
      title: "API REST FastAPI",
      description:
        "API robusta para microservicios con documentación automática.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/60c30d1b-d865-4604-be63-690de7ae6ca1.jpg",
      technologies: ["FastAPI", "Python", "PostgreSQL", "Docker"],
      category: "web",
      github: "https://github.com/PushoDev",
      demo: "#",
      featured: false,
    },
  ];

  const filters = [
    { key: "all", label: t("projects.all") },
    { key: "web", label: t("projects.web") },
    { key: "mobile", label: t("projects.mobile") },
    { key: "desktop", label: t("projects.desktop") },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="relative py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
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
            {t("projects.title")}
          </motion.h2>

          {/* Animated Quote Slider */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl p-6 mx-auto mb-12 border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20"
          >
            <p className="text-lg italic text-gray-600 dark:text-gray-300">
              "Cada proyecto es una oportunidad para innovar y crear soluciones
              que impacten positivamente."
            </p>
          </motion.div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-2 p-2 border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20">
            <Filter className="w-5 h-5 mx-2 my-auto text-gray-500 dark:text-gray-400" />
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-white/10"
                }`}
                data-cursor-hover
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="overflow-hidden transition-all duration-500 border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20 hover:shadow-2xl hover:border-white/40">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />

                  {/* Action buttons */}
                  <div className="absolute flex space-x-2 transition-opacity duration-300 opacity-0 top-4 right-4 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-sm"
                      asChild
                      data-cursor-hover
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                    {project.demo !== "#" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-sm"
                        asChild
                        data-cursor-hover
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-cyan-500 to-purple-600">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-800 transition-all duration-300 dark:text-gray-200 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text">
                    {project.title}
                  </h3>

                  <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-gray-700 border rounded-full bg-white/20 dark:bg-gray-800/50 dark:text-gray-300 border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 transition-all duration-500 opacity-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 group-hover:opacity-100 blur-xl rounded-2xl -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-3 text-gray-700 bg-transparent border-white/20 hover:bg-white/10 backdrop-blur-sm dark:text-gray-300"
            data-cursor-hover
          >
            Ver Todos los Proyectos
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
