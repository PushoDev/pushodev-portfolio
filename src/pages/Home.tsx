import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import AuroraBackground from '../components/AuroraBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import LoadingScreen from '../components/ui/LoadingScreen';
import GlowLine from '../components/GlowLine';
import ThemeTransition from '../components/ThemeTransition';

const Home: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen">

          {/* Loading screen — AnimatePresence handles the exit animation */}
          <AnimatePresence>
            {showLoader && (
              <LoadingScreen onComplete={() => setShowLoader(false)} />
            )}
          </AnimatePresence>

          <ThemeTransition />

          {/* Background Effects */}
          <AuroraBackground />

          {/* Navigation — visibility controlled inside Navbar via scroll position */}
          <Navbar />

          {/* Main Content */}
          <main>
            <Hero />

            {/* Hero / Skills divider */}
            <div className="px-4">
              <div className="relative h-px max-w-5xl mx-auto">
                <GlowLine orientation="horizontal" position="0" color="purple" />
              </div>
            </div>

            <Skills />
            <Projects />
            <About />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Actions */}
          <WhatsAppButton />
          <ScrollToTop />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Home;
