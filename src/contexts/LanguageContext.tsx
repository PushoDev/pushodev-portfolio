/**
 * Context for managing language (ES/EN) across the application
 */
import React, { createContext, useContext, useState } from "react";

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
    "skills.tools": "Herramientas",

    // Projects
    "projects.title": "Proyectos",
    "projects.all": "Todos",
    "projects.web": "Web",
    "projects.mobile": "Mobile",
    "projects.desktop": "Desktop",
    "projects.modal.description": "DESCRIPCIÓN",
    "projects.modal.technologies": "TECNOLOGÍAS",
    "projects.modal.viewGithub": "Ver en GitHub",
    "projects.modal.visitDemo": "Visitar Demo",
    "projects.modal.privateProject": "Proyecto Privado",
    "projects.modal.close": "Cerrar",

    // About
    "about.title": "Acerca de Mí",

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
    "skills.tools": "Tools",

    // Projects
    "projects.title": "Projects",
    "projects.all": "All",
    "projects.web": "Web",
    "projects.mobile": "Mobile",
    "projects.desktop": "Desktop",
    "projects.modal.description": "DESCRIPTION",
    "projects.modal.technologies": "TECHNOLOGIES",
    "projects.modal.viewGithub": "View on GitHub",
    "projects.modal.visitDemo": "Visit Demo",
    "projects.modal.privateProject": "Private Project",
    "projects.modal.close": "Close",

    // About
    "about.title": "About Me",

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
  const [language, setLanguage] = useState<"es" | "en">("es");

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
