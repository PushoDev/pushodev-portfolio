/**
 * Projects section with filtering and glassmorphism cards
 */
import React, { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Github, ExternalLink, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

interface ProjectType {
  id: number;
  title: string;
  description: string;
  descriptionEn: string;
  image: string;
  technologies: string[];
  category: string;
  github?: string;
  demo?: string;
  featured: boolean;
  isPublic: boolean;
}

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getDescription = (project: ProjectType): string => {
    return language === "en" ? project.descriptionEn : project.description;
  };

  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Portfolio React & TypeScript + Tailwindcss",
      description:
        "Portfolio Personal con React, TypeScript y TailwindCSS. Efectos visuales avanzados, animaciones fluidas, soporte multiidioma (ES/EN), tema oscuro/claro, y cursor personalizado.",
      descriptionEn:
        "Personal Portfolio with React, TypeScript and TailwindCSS. Advanced visual effects, smooth animations, multilingual support (ES/EN), dark/light theme, and custom cursor.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/3dee8b37-6d8d-4372-9c54-a729721947fe.jpg",
      technologies: ["React", "TypeScript", "TailwindCSS", "Motion"],
      category: "web",
      github: "https://github.com/PushoDev/pushodev-portfolio",
      demo: "https://pushodev.vercel.app",
      featured: true,
      isPublic: true,
    },
    {
      id: 2,
      title: "FastAPI + React & Typescripts Dashboard",
      description:
        "Panel administrativo con autenticación y estadísticas. Backend con FastAPI y frontend con React y TypeScript para una experiencia de administración completa.",
      descriptionEn:
        "Admin dashboard with authentication and statistics. Backend with FastAPI and frontend with React and TypeScript for a complete administration experience.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/60c30d1b-d865-4604-be63-690de7ae6ca1.jpg",
      technologies: ["FastAPI", "React", "TypeScript", "Python"],
      category: "web",
      github: "https://github.com/PushoDev/sistema.gestion-fast",
      featured: true,
      isPublic: true,
    },
    {
      id: 3,
      title: "Sistema de Gestión de Almacenes (Laravel + Reactsx)",
      description:
        "Solución completa para manejo de productos y almacenes. Maqueta funcional que demuestra la gestión integral de inventarios y almacenes.",
      descriptionEn:
        "Complete solution for product and warehouse management. Functional mockup demonstrating comprehensive inventory and warehouse management.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/03dd86ba-c717-41fd-895f-d40803dc39f5.jpg",
      technologies: ["Laravel", "React", "PHP", "MySQL"],
      category: "web",
      github: "https://github.com/PushoDev/proyecto-inventario",
      featured: false,
      isPublic: true,
    },
    {
      id: 4,
      title: "E-commerce Multivendedor (WordPress)",
      description:
        "Plataforma de comercio electrónico escalable y segura para múltiples vendedores. Solución completa para marketplace con funcionalidades avanzadas.",
      descriptionEn:
        "Scalable and secure e-commerce platform for multiple vendors. Complete marketplace solution with advanced functionalities.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/4b2d9b98-0b1a-4cf8-8601-d60b094ac62d.jpg",
      technologies: ["WordPress", "PHP", "MySQL", "WooCommerce"],
      category: "web",
      demo: "https://golfitoshop.com",
      featured: true,
      isPublic: false,
    },
    {
      id: 5,
      title: "GestoRem - App Dashboard para Gestión de Remesas",
      description:
        "Aplicación móvil Flutter para la gestión de remesas. Dashboard completo con funcionalidades para seguimiento de envíos, gestión de clientes y estadísticas de operaciones.",
      descriptionEn:
        "Flutter mobile app for remittance management. Complete dashboard with functionalities for shipment tracking, customer management and operation statistics.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/6a2caf5a-41ed-4717-9fa4-7408a865454d.jpg",
      technologies: ["Flutter", "Dart", "Firebase", "Real-time DB"],
      category: "mobile",
      featured: false,
      isPublic: false,
    },
    {
      id: 6,
      title: "Drone Med (Nest + PostgreSQL's)",
      description:
        "API REST Full para Drones de transporte de medicamentos. Sistema robusto para gestión de drones médicos con seguimiento en tiempo real.",
      descriptionEn:
        "Full REST API for medical delivery drones. Robust system for managing medical drones with real-time tracking.",
      image:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/80c2882f-1399-4bdd-82fc-1e2fb8cbe6d6.jpg",
      technologies: ["NestJS", "PostgreSQL", "TypeScript", "Node.js"],
      category: "web",
      github: "https://github.com/PushoDev/drones-api",
      featured: false,
      isPublic: true,
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
              "{t("projects.quote")}"
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
              className={`group relative cursor-pointer ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              onClick={() => setSelectedProject(project)}
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
                        {t("projects.featured")}
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
                    {getDescription(project)}
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
            {t("projects.viewAll")}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Project Details Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="max-w-2xl border-white/20 bg-gray-950/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Project Image */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={selectedProject?.image}
                alt={selectedProject?.title}
                className="object-cover w-full h-64"
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-400">
                {t("projects.modal.description")}
              </h3>
              <p className="leading-relaxed text-gray-300">
                {selectedProject && getDescription(selectedProject)}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-400">
                {t("projects.modal.technologies")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium border rounded-full text-cyan-300 bg-cyan-500/10 border-cyan-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-3 pt-6 border-t border-white/10">
            {selectedProject?.isPublic && selectedProject?.github && (
              <Button
                className="flex-1 text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                asChild
                data-cursor-hover
              >
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  {t("projects.modal.viewGithub")}
                </a>
              </Button>
            )}

            {selectedProject?.demo && selectedProject.demo !== "#" && (
              <Button
                className="flex-1 text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                asChild
                data-cursor-hover
              >
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t("projects.modal.visitDemo")}
                </a>
              </Button>
            )}

            {!selectedProject?.isPublic && (
              <div className="flex-1 px-4 py-2 text-sm text-center text-gray-400 border border-gray-700 rounded-lg bg-gray-800/50">
                {t("projects.modal.privateProject")}
              </div>
            )}

            <Button
              variant="outline"
              className="text-gray-300 border-gray-600 hover:bg-gray-800"
              onClick={() => setSelectedProject(null)}
              data-cursor-hover
            >
              {t("projects.modal.close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
