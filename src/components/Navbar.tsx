import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Menu, X, Globe, ChevronDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Hidden until the user scrolls past the 200vh intro zone
  const [isPastIntro, setIsPastIntro] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      // Intro occupies 200vh; show navbar 100px before the end
      const introEnd = window.innerHeight * 1.5 - 100;
      setIsPastIntro(window.scrollY >= introEnd);
      setIsScrolled(window.scrollY > window.innerHeight * 1.5 + 50);
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll(); // run once on mount (handles reload mid-page)
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const navItems = [
    { key: "nav.home", href: "#home" },
    { key: "nav.about", href: "#about" },
    { key: "nav.skills", href: "#skills" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.blog", href: "#blog" },
    { key: "nav.contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isPastIntro && (
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
              <div className="items-center hidden gap-6 md:flex">
                {navItems.map((item) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white whitespace-nowrap"
                    data-cursor-hover
                  >
                    {t(item.key)}
                  </motion.button>
                ))}
              </div>

              {/* Theme and Language toggles */}
              <div className="flex items-center gap-2">
                {/* Sun/Moon separate icons */}
                <div className="hidden sm:flex items-center gap-1 rounded-full border border-white/15 px-1 py-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <button
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`p-1.5 rounded-full transition-all duration-200 ${theme === 'light' ? 'bg-white/20 text-yellow-300' : 'text-gray-500 hover:text-gray-300'}`}
                    data-cursor-hover
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`p-1.5 rounded-full transition-all duration-200 ${theme === 'dark' ? 'bg-white/20 text-purple-300' : 'text-gray-500 hover:text-gray-300'}`}
                    data-cursor-hover
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                </div>

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
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isPastIntro && isMobileMenuOpen && (
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
                {navItems.map((item) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-2.5 px-3 font-medium text-left text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 text-sm"
                    data-cursor-hover
                  >
                    {t(item.key)}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
