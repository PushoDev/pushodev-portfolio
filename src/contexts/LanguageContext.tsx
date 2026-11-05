/**
 * Context for managing language (ES/EN) across the application
 */
import React, { createContext, useContext, useEffect, useState } from "react";

interface LanguageContextType {
  language: "es" | "en";
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.role": "Desarrollador Full-Stack",
    "hero.description":
      'Fundador y CEO del Ecommerce más grande de Granma "GolfitoShop", ✨ Graduado en la especialidad de Informática 🖥️. Apasionado al desarrollo de Software 📱⚙️ y a la Solución de problemas. 😊⭐🤖 📧',
    "hero.downloadCV": "Descargar CV",

    // Stats
    "stats.projects": "Proyectos Terminados",
    "stats.clients": "Clientes Felices",
    "stats.coffee": "Invitaciones de Café",
    "stats.thesis": "Asesoramientos de Tesis",

    // Skills
    "skills.title": "Habilidades",
    "skills.quote":
      "La web es como un lienzo, y el código es la pintura. Crea tu obra maestra.",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Datos y herramientas",
    "skills.mobile": "Móvil y escritorio",
    "skills.blockchain": "Blockchain",

    // Projects
    "projects.title": "Proyectos",
    "projects.all": "Todos",
    "projects.web": "Web",
    "projects.mobile": "Mobile",
    "projects.desktop": "Desktop",
    "projects.web3": "Web3",
    "projects.status.production": "En producción",
    "projects.status.development": "En desarrollo",
    "projects.status.completed": "Completado",
    "projects.status.idea": "Idea",
    "projects.modal.comingSoon": "Próximamente",
    "projects.quote": "Cada proyecto es una oportunidad para innovar y crear soluciones que impacten positivamente.",
    "projects.viewAll": "Ver Todos los Proyectos",
    "projects.featured": "Destacado",
    "projects.modal.description": "DESCRIPCIÓN",
    "projects.modal.technologies": "TECNOLOGÍAS",
    "projects.modal.viewGithub": "Ver en GitHub",
    "projects.modal.visitDemo": "Visitar Demo",
    "projects.modal.privateProject": "Proyecto Privado",
    "projects.modal.close": "Cerrar",

    // About
    "about.title": "Acerca de Mí",
    "about.experience": "Años de Experiencia",
    "about.availability": "Disponibilidad",
    "about.approach": "Mi Enfoque",
    "about.cleanCode": "✨ Código limpio y mantenible",
    "about.performance": "🚀 Performance y optimización",
    "about.userDesign": "🎨 Diseño centrado en el usuario",
    "about.scalableSolutions": "🔧 Soluciones escalables",
    "about.clientsSays": "Lo Que Dicen Mis Clientes",
    "about.intro1": "¡Hola! Mi nombre es",
    "about.intro2": ", y soy desarrollador Full-Stack apasionado por crear soluciones digitales que marquen la diferencia.",
    "about.journey1": "Mi viaje en la programación comenzó como autodidacta, creando software educativo con Macromedia para mis primeros clientes. Desde entonces he ampliado mi stack a Laravel, React, Django y .NET, y he fundado",
    "about.journey2": ", el ecommerce más grande de Granma.",
    "about.education1": "Como graduado en Informática en el antiguo",
    "about.education2": ", en 2008, y estudié Ingeniería en la Universidad de Granma (2018–2022). Combino esa base teórica con aprendizaje autodidacta y práctica real. Me especializo en crear aplicaciones web modernas, APIs robustas y apps móviles que no solo funcionan, sino que ofrecen buenas experiencias a los usuarios.",

    // Contact
    "contact.title": "Contacto",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",

    // Footer
    "footer.available": "Disponible para trabajar",
    "footer.busy": "Ocupado",
    "footer.rights": "Todos los derechos reservados",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "Hello, I am",
    "hero.role": "Full-Stack Developer",
    "hero.description":
      'Founder and CEO of the largest Ecommerce in Granma "GolfitoShop", ✨ Graduated in the Computer Science specialty 🖥️. Passionate about Software Development 📱⚙️ and Problem Solving. 😊⭐🤖 📧',
    "hero.downloadCV": "Download CV",

    // Stats
    "stats.projects": "Completed Projects",
    "stats.clients": "Happy Clients",
    "stats.coffee": "Coffee Invitations",
    "stats.thesis": "Thesis Advisories",

    // Skills
    "skills.title": "Skills",
    "skills.quote":
      "The web is like a canvas, and code is the paint. Create your masterpiece.",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Data & tools",
    "skills.mobile": "Mobile & desktop",
    "skills.blockchain": "Blockchain",

    // Projects
    "projects.title": "Projects",
    "projects.all": "All",
    "projects.web": "Web",
    "projects.mobile": "Mobile",
    "projects.desktop": "Desktop",
    "projects.web3": "Web3",
    "projects.status.production": "In production",
    "projects.status.development": "In development",
    "projects.status.completed": "Completed",
    "projects.status.idea": "Idea",
    "projects.modal.comingSoon": "Coming soon",
    "projects.quote": "Every project is an opportunity to innovate and create solutions that have a positive impact.",
    "projects.viewAll": "View All Projects",
    "projects.featured": "Featured",
    "projects.modal.description": "DESCRIPTION",
    "projects.modal.technologies": "TECHNOLOGIES",
    "projects.modal.viewGithub": "View on GitHub",
    "projects.modal.visitDemo": "Visit Demo",
    "projects.modal.privateProject": "Private Project",
    "projects.modal.close": "Close",

    // About
    "about.title": "About Me",
    "about.experience": "Years of Experience",
    "about.availability": "Availability",
    "about.approach": "My Approach",
    "about.cleanCode": "✨ Clean and maintainable code",
    "about.performance": "🚀 Performance and optimization",
    "about.userDesign": "🎨 User-centered design",
    "about.scalableSolutions": "🔧 Scalable solutions",
    "about.clientsSays": "What My Clients Say",
    "about.intro1": "Hello! My name is",
    "about.intro2": ", and I'm a Full-Stack developer passionate about creating digital solutions that make a difference.",
    "about.journey1": "My programming journey began as a self-taught learner, building educational software with Macromedia for my first clients. Since then I have expanded my stack to Laravel, React, Django and .NET, and founded",
    "about.journey2": ", the largest e-commerce in Granma.",
    "about.education1": "As a graduate in Computer Science from the former",
    "about.education2": "in 2008, and studied Engineering at the University of Granma (2018–2022). I combine that theoretical foundation with self-taught learning and real-world practice. I specialize in building modern web applications, robust APIs and mobile apps that not only work, but deliver great user experiences.",

    // Contact
    "contact.title": "Contact",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",

    // Footer
    "footer.available": "Available for work",
    "footer.busy": "Busy",
    "footer.rights": "All rights reserved",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"es" | "en">(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "es" || saved === "en") return saved;
    } catch {
      /* storage unavailable */
    }
    // First visit: Spanish only if the browser prefers it, English otherwise
    return (navigator.language || "en").toLowerCase().startsWith("es")
      ? "es"
      : "en";
  });

  // Keep <html lang>, the tab title and the meta description in the active language
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem("lang", language);
    } catch {
      /* storage unavailable */
    }
    document.title =
      language === "es"
        ? "Luis Guisado (PushoDev) | Desarrollador Fullstack"
        : "Luis Guisado (PushoDev) | Fullstack Developer";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        language === "es"
          ? "Luis Guisado (PushoDev): desarrollador Fullstack con Laravel, React, Django y .NET. Sistemas en producción y apps con Expo. Disponible para trabajo remoto."
          : "Luis Guisado (PushoDev): Fullstack developer with Laravel, React, Django and .NET. Production systems and Expo apps. Open to remote work."
      );
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["es"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
