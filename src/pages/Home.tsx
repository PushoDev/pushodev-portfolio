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
import IntroSection from '../components/intro/IntroSection';
import LoadingScreen from '../components/ui/LoadingScreen';

const Home: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen overflow-x-hidden">

          {/* Loading screen — AnimatePresence handles the exit animation */}
          <AnimatePresence>
            {showLoader && (
              <LoadingScreen onComplete={() => setShowLoader(false)} />
            )}
          </AnimatePresence>

          {/* Background Effects */}
          <AuroraBackground />

          {/* Navigation — visibility controlled inside Navbar via scroll position */}
          <Navbar />

          {/* Main Content */}
          <main>
            {/* Intro section: 200vh scroll container, sticky visual frame */}
            <IntroSection />

            {/* Portfolio sections start after the 200vh intro */}
            <Hero />
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
