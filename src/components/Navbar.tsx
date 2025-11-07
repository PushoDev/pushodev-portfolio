/**
 * Navigation bar with glassmorphism effects and scroll animations
 */
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "nav.home", href: "#home" },
    { key: "nav.about", href: "#about" },
    { key: "nav.skills", href: "#skills" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 border-b border-white/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text"
            >
              &lt;Pushodev /&gt;
            </motion.div>

            {/* Desktop Navigation */}
            <div className="items-center hidden space-x-8 md:flex">
              {navItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-medium text-gray-800 transition-colors duration-200 dark:text-gray-200 hover:text-cyan-400"
                  data-cursor-hover
                >
                  {t(item.key)}
                </motion.button>
              ))}
            </div>

            {/* Theme and Language toggles */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="bg-transparent border-white/20 hover:bg-white/10 backdrop-blur-sm"
                data-cursor-hover
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="bg-transparent border-white/20 hover:bg-white/10 backdrop-blur-sm flex items-center space-x-1"
                data-cursor-hover
              >
                <img
                  src={language === "es" ? "/cuba.svg" : "/usa.svg"}
                  alt={language === "es" ? "Cuba" : "USA"}
                  className="w-5 h-4"
                />
                <span className="text-xs font-semibold">
                  {language.toUpperCase()}
                </span>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-transparent md:hidden border-white/20 hover:bg-white/10 backdrop-blur-sm"
                data-cursor-hover
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
        }}
        className={`fixed top-16 left-0 right-0 z-40 md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="border-b shadow-2xl backdrop-blur-2xl bg-white/10 dark:bg-gray-900/10 border-white/20">
          <div className="px-4 py-4 mx-auto max-w-7xl">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-2 font-medium text-left text-gray-800 transition-colors duration-200 dark:text-gray-200 hover:text-cyan-400"
                  data-cursor-hover
                >
                  {t(item.key)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
