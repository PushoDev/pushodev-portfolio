import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Menu, X, Globe, ChevronDown, Home, User, Code2, FolderGit2, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

// 3D flip on hover/keyboard focus: the front face rolls back while an
// identical back face rolls in from below
const frontFaceVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backFaceVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: { opacity: 1, scale: 1.6 },
};

const flipTransition = { type: "spring" as const, stiffness: 100, damping: 20 };

const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Colors follow the brand gradient (cyan -> purple -> pink)
  const navItems = [
    { key: "nav.home", href: "#home", icon: Home, iconColor: "group-hover:text-cyan-400", activeColor: "text-cyan-400", glow: "rgba(34,211,238,0.18)" },
    { key: "nav.about", href: "#about", icon: User, iconColor: "group-hover:text-blue-400", activeColor: "text-blue-400", glow: "rgba(96,165,250,0.18)" },
    { key: "nav.skills", href: "#skills", icon: Code2, iconColor: "group-hover:text-violet-400", activeColor: "text-violet-400", glow: "rgba(167,139,250,0.18)" },
    { key: "nav.projects", href: "#projects", icon: FolderGit2, iconColor: "group-hover:text-purple-400", activeColor: "text-purple-400", glow: "rgba(192,132,252,0.18)" },
    { key: "nav.contact", href: "#contact", icon: Mail, iconColor: "group-hover:text-pink-400", activeColor: "text-pink-400", glow: "rgba(244,114,182,0.18)" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the vertical center of the viewport
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const closest = visible.reduce((a, b) =>
            Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
          );
          setActiveSection(closest.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        <motion.nav
          key="navbar"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
        >
            <div
              className="flex items-center justify-between gap-4 px-5 py-2.5 rounded-full border border-white/20 backdrop-blur-xl w-full max-w-5xl"
              style={{ background: 'rgba(10,15,37,0.75)', boxShadow: '0 4px 32px rgba(0,0,0,0.4)' }}
            >
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-lg font-bold font-mono text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text cursor-pointer whitespace-nowrap"
                onClick={() => scrollToSection("#home")}
                data-cursor-hover
              >
                &lt;PushoDev /&gt;
              </motion.div>

              {/* Desktop Navigation */}
              <div className="items-center hidden gap-0.5 lg:gap-1 md:flex">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  const Icon = item.icon;
                  const face = (
                    <>
                      <Icon
                        className={`hidden lg:block w-4 h-4 transition-colors duration-300 ${isActive ? item.activeColor : item.iconColor}`}
                      />
                      {t(item.key)}
                    </>
                  );
                  return (
                    <motion.button
                      key={item.key}
                      onClick={() => scrollToSection(item.href)}
                      initial="initial"
                      whileHover="hover"
                      whileFocus="hover"
                      whileTap={{ scale: 0.95 }}
                      className={`group relative px-1.5 lg:px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap focus:outline-none ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                        }`}
                      style={{ perspective: "600px" }}
                      data-cursor-hover
                    >
                      {/* Radial glow */}
                      <motion.span
                        variants={glowVariants}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${item.glow} 0%, transparent 70%)` }}
                      />

                      {/* Front face */}
                      <motion.span
                        variants={frontFaceVariants}
                        transition={flipTransition}
                        className="relative z-10 flex items-center gap-1.5"
                        style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                      >
                        {face}
                      </motion.span>

                      {/* Back face — visual duplicate only */}
                      <motion.span
                        aria-hidden="true"
                        variants={backFaceVariants}
                        transition={flipTransition}
                        className="absolute inset-0 z-10 flex items-center justify-center gap-1.5"
                        style={{ transformStyle: "preserve-3d", transformOrigin: "center top" }}
                      >
                        {face}
                      </motion.span>

                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-indicator"
                          className="absolute bottom-0 h-[2px] rounded-full left-1.5 right-1.5 lg:left-3 lg:right-3"
                          style={{ background: 'linear-gradient(90deg, #22d3ee, #a855f7)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Theme and Language toggles */}
              <div className="flex items-center gap-2">
                <ThemeToggle />

                {/* Language */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200 text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                  data-cursor-hover
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language.toUpperCase()}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex md:hidden items-center justify-center w-8 h-8 rounded-full border border-white/15 text-gray-300 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                  data-cursor-hover
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>
        </motion.nav>
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden rounded-2xl border border-white/20 overflow-hidden"
            style={{ background: 'rgba(10,15,37,0.92)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <div className="px-4 py-4">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.key}
                      onClick={() => scrollToSection(item.href)}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      className={`py-2.5 px-3 font-medium text-left transition-colors duration-200 rounded-lg text-sm ${isActive
                          ? 'text-white bg-white/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      data-cursor-hover
                    >
                      {t(item.key)}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
