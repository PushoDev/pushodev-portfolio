/**
 * Main home page component that integrates all portfolio sections
 */
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import CustomCursor from '../components/CustomCursor';
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

const Home: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Background Effects */}
          <AuroraBackground />
          <CustomCursor />
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main Content */}
          <main>
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
