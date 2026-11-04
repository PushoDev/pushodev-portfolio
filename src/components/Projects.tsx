/**
 * Projects section with filtering and glassmorphism cards
 */
import React, { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Github, ExternalLink, Filter } from "lucide-react";
import { Button } from "./ui/button";
import GlitchVault from "./GlitchVault";
import Pagination from "./Pagination";
import { useLanguage } from "../contexts/LanguageContext";
import portfolioImg from "@/imgs/projects/portfolio.jpg";
import golfitoshopImg from "@/imgs/projects/golfitoshop.jpg";
import laglorietashopImg from "@/imgs/projects/laglorietashop.jpg";
import almacenErpImg from "@/imgs/projects/almacen-erp.jpg";
import fastapiImg from "@/imgs/projects/fastapi-dashboard.jpg";
import gestoremImg from "@/imgs/projects/gestorem.jpg";
import droneMedImg from "@/imgs/projects/drone-med.jpg";
import blogCulturalImg from "@/imgs/projects/blog-cultural.jpg";
import reReImg from "@/imgs/projects/re-re-remesas.jpg";
import golfitoshopAppsImg from "@/imgs/projects/golfitoshop-apps.jpg";
import dayclosureImg from "@/imgs/projects/dayclosure.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

const PAGE_SIZE = 6;

type Status = "production" | "development" | "completed" | "idea";
type Category = "web" | "mobile" | "desktop" | "web3";

interface ProjectType {
  id: number;
  title: string;
  description: string;
  descriptionEn: string;
  /** Screenshot; projects without one get a generated gradient cover */
  image?: string;
  technologies: string[];
  category: Category;
  status: Status;
  /** Hover glow, usually the colour of the main technology */
  glow: string;
  github?: string;
  demo?: string;
  featured: boolean;
  isPublic: boolean;
}

const STATUS_STYLE: Record<Status, string> = {
  production: "from-emerald-500 to-teal-600",
  development: "from-amber-500 to-orange-600",
  completed: "from-cyan-500 to-purple-600",
  idea: "from-violet-500 to-fuchsia-600",
};

/** Display order: finished work first, then in-development, then ideas */
const STATUS_ORDER: Record<Status, number> = { production: 0, completed: 1, development: 2, idea: 3 };

const COVER_GRADIENT: Record<Category, string> = {
  web: "from-cyan-700 via-blue-800 to-purple-900",
  mobile: "from-purple-700 via-fuchsia-800 to-pink-900",
  desktop: "from-amber-600 via-orange-800 to-rose-900",
  web3: "from-slate-700 via-violet-900 to-indigo-950",
};

/** Cover for projects that have no screenshot yet */
const ProjectCover: React.FC<{ project: ProjectType; className: string }> = ({ project, className }) => (
  <div
    className={`flex items-center justify-center bg-gradient-to-br ${COVER_GRADIENT[project.category]} ${className}`}
    role="img"
    aria-label={project.title}
  >
    <span className="px-6 text-2xl font-black tracking-tight text-center text-white/90">
      {project.title.split(/\s[—-]\s|\s\(/)[0]}
    </span>
  </div>
);

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
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
      id: 3,
      title: "ERP / POS Multi-Almacén (Laravel + React)",
      description:
        "ERP y punto de venta multi-almacén para negocios con varias monedas (USD/CUP/MLC): inventario con costo real por lote, ventas con comisiones por vendedor, compras a proveedores, traslados entre almacenes, cierre de caja por turno y un bot de Telegram para aprobaciones y reportes. El repositorio es privado por ser software comercial en producción; el enlace de GitHub es una maqueta pública que reproduce la misma arquitectura y funcionalidades.",
      descriptionEn:
        "Multi-warehouse ERP and point of sale for multi-currency businesses (USD/CUP/MLC): inventory with real per-batch cost, sales with per-seller commissions, supplier purchasing, inter-warehouse transfers, shift-based cash register closing, and a Telegram bot for approvals and reports. The repository is private as it's commercial software in production; the GitHub link is a public mockup reproducing the same architecture and functionality.",
      image: almacenErpImg,
      technologies: ["Laravel", "React", "TypeScript", "Inertia.js", "MariaDB", "Telegram Bot"],
      category: "web",
      status: "production",
      glow: "#FF2D20",
      github: "https://github.com/PushoDev/proyecto-inventario",
      demo: "https://gestion.posglorietashop.com",
      featured: true,
      isPublic: true,
    },
    {
      id: 4,
      title: "GolfitoShop — Marketplace Local + Bot de Telegram",
      description:
        "Marketplace local que conecta proveedores de productos, restaurantes y servicios con clientes en Granma, Cuba. Panel de proveedor y administración, catálogos con precios en USD/CUP, anuncios y orden por zona, membresías, y un bot propio de Telegram (@golfitoshop_bot) para buscar productos y negocios, derivando el pedido al WhatsApp del proveedor para coordinarlo directo.",
      descriptionEn:
        "Local marketplace connecting product, restaurant and service providers with customers in Granma, Cuba. Provider and admin dashboard, catalogs with USD/CUP pricing, zone-based ads and ordering, memberships, and a custom Telegram bot (@golfitoshop_bot) to search products and businesses, handing the order off to the provider's WhatsApp to coordinate directly.",
      image: golfitoshopImg,
      technologies: ["Laravel", "React", "TypeScript", "Inertia.js", "PostgreSQL", "Telegram Bot"],
      category: "web",
      status: "production",
      glow: "#F5A623",
      demo: "https://golfitoshop.com",
      featured: true,
      isPublic: false,
    },
    {
      id: 8,
      title: "La Glorieta Shop — E-commerce por WhatsApp",
      description:
        "Tienda online de variedades y equipos para el hogar con selección de tienda por provincia y pedidos coordinados directo por WhatsApp, sin pasarela de pago ni registro obligatorio. Frontend en Next.js consumiendo una API propia, con un panel de gestión/POS aparte containerizado con Docker.",
      descriptionEn:
        "Online store for home goods and appliances with per-province store selection and orders coordinated directly via WhatsApp, no payment gateway or mandatory signup. Next.js frontend consuming a custom API, with a separate management/POS panel containerized with Docker.",
      image: laglorietashopImg,
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Docker"],
      category: "web",
      status: "production",
      glow: "#E11D2E",
      demo: "https://laglorietashop.com",
      featured: true,
      isPublic: false,
    },
    {
      id: 9,
      title: "GolfitoShop Apps — Cliente y Panel (React Native)",
      description:
        "Apps móviles nativas de GolfitoShop: la App Cliente (inicio por zona, kioscos, buscador, lista de compra y pedido por WhatsApp) y la app de Panel para proveedores y administración. Consumen la API v1 del marketplace con un cliente tipado generado desde OpenAPI, notificaciones push y actualizaciones por aire con EAS.",
      descriptionEn:
        "Native mobile apps for GolfitoShop: the Customer app (zone-based home, businesses, search, shopping list and WhatsApp ordering) and the Panel app for providers and administration. They consume the marketplace's API v1 through a typed client generated from OpenAPI, push notifications and over-the-air updates with EAS.",
      image: golfitoshopAppsImg,
      technologies: ["React Native", "Expo", "TypeScript", "TanStack Query", "Firebase"],
      category: "mobile",
      status: "development",
      glow: "#a78bfa",
      featured: true,
      isPublic: false,
    },
    {
      id: 10,
      title: "DayClosure — ERP/POS instalable y offline",
      description:
        "Versión instalable del ERP/POS para pequeños negocios con conexión inestable: app de escritorio y app móvil con datos locales en SQLite y un despliegue por negocio. Se está reconstruyendo con Tauri (Rust + React) a partir de las reglas de negocio ya validadas en producción.",
      descriptionEn:
        "Installable version of the ERP/POS for small businesses with unreliable connectivity: desktop and mobile apps with local SQLite data and one deployment per business. It is being rebuilt with Tauri (Rust + React) on top of business rules already validated in production.",
      image: dayclosureImg,
      technologies: ["Tauri", "Rust", "React", "TypeScript", "SQLite"],
      category: "desktop",
      status: "development",
      glow: "#FFC131",
      featured: true,
      isPublic: false,
    },
    {
      id: 11,
      title: "Re & Re — Remesas y Recargas (Django + React)",
      description:
        "Prueba técnica entregada: plataforma de remesas y recargas ETECSA para Cuba con membresía VIP. Autenticación JWT, gestión de usuarios y membresías, remesas, recargas y pagos. Backend con Django REST Framework y PostgreSQL; frontend con React, Vite y Tailwind.",
      descriptionEn:
        "Delivered technical test: remittance and ETECSA top-up platform for Cuba with a VIP membership. JWT authentication, user and membership management, remittances, top-ups and payments. Backend with Django REST Framework and PostgreSQL; frontend with React, Vite and Tailwind.",
      image: reReImg,
      technologies: ["Django", "DRF", "PostgreSQL", "React", "TypeScript", "JWT"],
      category: "web",
      status: "completed",
      glow: "#44B78B",
      github: "https://github.com/PushoDev/re-remesas",
      featured: true,
      isPublic: true,
    },
    {
      id: 7,
      title: "Blog Cultural Manzanillo",
      description:
        "Blog profesional desarrollado para la Secretaría de Cultura de Manzanillo. Centraliza la difusión de arte y gestión de eventos culturales. Construido con Laravel 13, React 19, Inertia.js y shadcn/ui.",
      descriptionEn:
        "Professional blog developed for the Culture Secretariat of Manzanillo. Centralizes art dissemination and cultural event management. Built with Laravel 13, React 19, Inertia.js and shadcn/ui.",
      image: blogCulturalImg,
      technologies: ["Laravel", "React", "TypeScript", "TailwindCSS", "Inertia.js", "PHP"],
      category: "web",
      status: "completed",
      glow: "#FF2D20",
      github: "https://github.com/PushoDev/blog-cultural-manzanillo",
      featured: false,
      isPublic: true,
    },
    {
      id: 2,
      title: "FastAPI + React & Typescripts Dashboard",
      description:
        "Panel administrativo con autenticación y estadísticas. Backend con FastAPI y frontend con React y TypeScript para una experiencia de administración completa.",
      descriptionEn:
        "Admin dashboard with authentication and statistics. Backend with FastAPI and frontend with React and TypeScript for a complete administration experience.",
      image: fastapiImg,
      technologies: ["FastAPI", "React", "TypeScript", "Python"],
      category: "web",
      status: "completed",
      glow: "#009688",
      github: "https://github.com/PushoDev/sistema.gestion-fast",
      featured: false,
      isPublic: true,
    },
    {
      id: 1,
      title: "Portfolio React & TypeScript + Tailwindcss",
      description:
        "Portfolio Personal con React, TypeScript y TailwindCSS. Efectos visuales avanzados, animaciones fluidas, soporte multiidioma (ES/EN), tema oscuro/claro, y cursor personalizado.",
      descriptionEn:
        "Personal Portfolio with React, TypeScript and TailwindCSS. Advanced visual effects, smooth animations, multilingual support (ES/EN), dark/light theme, and custom cursor.",
      image: portfolioImg,
      technologies: ["React", "TypeScript", "TailwindCSS", "Motion"],
      category: "web",
      status: "completed",
      glow: "#61DAFB",
      github: "https://github.com/PushoDev/pushodev-portfolio",
      demo: "https://pushodev.vercel.app",
      featured: false,
      isPublic: true,
    },
    {
      id: 6,
      title: "Drone Med (Nest + PostgreSQL's)",
      description:
        "API REST Full para Drones de transporte de medicamentos. Sistema robusto para gestión de drones médicos con seguimiento en tiempo real.",
      descriptionEn:
        "Full REST API for medical delivery drones. Robust system for managing medical drones with real-time tracking.",
      image: droneMedImg,
      technologies: ["NestJS", "PostgreSQL", "TypeScript", "Node.js"],
      category: "web",
      status: "completed",
      glow: "#E0234E",
      github: "https://github.com/PushoDev/drones-api",
      featured: false,
      isPublic: true,
    },
    {
      id: 5,
      title: "GestoRem - App Dashboard para Gestión de Remesas",
      description:
        "Aplicación móvil Flutter para la gestión de remesas. Dashboard completo con funcionalidades para seguimiento de envíos, gestión de clientes y estadísticas de operaciones.",
      descriptionEn:
        "Flutter mobile app for remittance management. Complete dashboard with functionalities for shipment tracking, customer management and operation statistics.",
      image: gestoremImg,
      technologies: ["Flutter", "Dart", "Firebase", "Real-time DB"],
      category: "mobile",
      status: "completed",
      glow: "#02569B",
      featured: false,
      isPublic: false,
    },
    {
      id: 12,
      title: "Facturación B2B con pronto pago (Web3)",
      description:
        "Idea en estudio: facturas pagadas con un token ERC-20, con plazos y descuento por pago anticipado. Contratos en Solidity con tests unitarios y fuzz en Foundry, desplegados en testnet con código verificado y una interfaz en React. Aún sin código publicado; material educativo, sin auditar.",
      descriptionEn:
        "Idea under study: invoices paid with an ERC-20 token, with payment terms and an early-payment discount. Solidity contracts with unit and fuzz tests in Foundry, deployed to testnet with verified code and a React interface. No code published yet; educational material, unaudited.",
      technologies: ["Solidity", "Foundry", "OpenZeppelin", "React", "TypeScript"],
      category: "web3",
      status: "idea",
      glow: "#8c9be8",
      featured: false,
      isPublic: false,
    },
    {
      id: 13,
      title: "Notarización de documentos (Web3)",
      description:
        "Idea en estudio: registrar en la blockchain el hash de un documento o de un conjunto de registros y permitir su verificación pública, con un indexador de eventos en Laravel. Aún sin código publicado; material educativo, sin auditar.",
      descriptionEn:
        "Idea under study: record the hash of a document or a set of records on-chain and allow public verification, with an event indexer in Laravel. No code published yet; educational material, unaudited.",
      technologies: ["Solidity", "Foundry", "Laravel", "React", "Merkle"],
      category: "web3",
      status: "idea",
      glow: "#a78bfa",
      featured: false,
      isPublic: false,
    },
  ];

  const filters = [
    { key: "all", label: t("projects.all") },
    { key: "web", label: t("projects.web") },
    { key: "mobile", label: t("projects.mobile") },
    { key: "desktop", label: t("projects.desktop") },
    { key: "web3", label: t("projects.web3") },
  ];

  // Array.prototype.sort is stable: within each status the order above is kept
  const sortedProjects = [...projects].sort(
    (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
  );

  const filteredProjects =
    activeFilter === "all"
      ? sortedProjects
      : sortedProjects.filter((project) => project.category === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const pagedProjects = filteredProjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header — sticky so title + filters stay visible while scrolling cards */}
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
          <div className="flex flex-wrap justify-center gap-2 p-2 border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20">
            <Filter className="w-5 h-5 mx-2 my-auto text-gray-500 dark:text-gray-400" />
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => { setActiveFilter(filter.key); setPage(1); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeFilter === filter.key
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
          {pagedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="relative cursor-pointer group"
              style={{ ["--glow" as string]: project.glow }}
              onClick={() => setSelectedProject(project)}
            >
              <GlitchVault
                className="overflow-hidden h-full transition-all duration-500 border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20 hover:shadow-2xl hover:border-white/40"
                glitchColor={project.glow}
                glitchRadius={110}
                animatedBorder
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <ProjectCover
                      project={project}
                      className="w-full h-48 transition-transform duration-500 group-hover:scale-110"
                    />
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />

                  {/* Action buttons: only for links that really exist */}
                  <div className="absolute flex space-x-2 transition-opacity duration-300 opacity-0 top-4 right-4 group-hover:opacity-100">
                    {project.isPublic && project.github && (
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
                          aria-label="GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.demo && (
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
                          aria-label="Demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r ${STATUS_STYLE[project.status]}`}
                    >
                      {t(`projects.status.${project.status}`)}
                    </span>
                  </div>
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
              </GlitchVault>

              {/* Glow effect — colour matches the project's primary tech */}
              <div
                className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-30 blur-xl rounded-2xl -z-10"
                style={{ backgroundColor: "var(--glow)" }}
              />
            </motion.div>
          ))}
        </motion.div>

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={changePage}
          prevLabel={language === "es" ? "Página anterior" : "Previous page"}
          nextLabel={language === "es" ? "Página siguiente" : "Next page"}
        />

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
            asChild
            data-cursor-hover
          >
            <a href="https://github.com/PushoDev?tab=repositories" target="_blank" rel="noopener noreferrer">
              {t("projects.viewAll")}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
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
              {selectedProject?.image ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="object-cover w-full h-64"
                />
              ) : (
                selectedProject && <ProjectCover project={selectedProject} className="w-full h-64" />
              )}
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

            {selectedProject && !selectedProject.isPublic && (
              <div className="flex-1 px-4 py-2 text-sm text-center text-gray-400 border border-gray-700 rounded-lg bg-gray-800/50">
                {selectedProject.status === "idea"
                  ? t("projects.modal.comingSoon")
                  : t("projects.modal.privateProject")}
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
