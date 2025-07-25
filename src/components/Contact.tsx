/**
 * Contact section with hacker-style code animation and contact form
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Phone, MapPin, Send, Code } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [hackerText, setHackerText] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const codeSnippets = [
    "const developer = new FullStackDev();",
    "developer.skills = ['React', 'Laravel', 'Python'];",
    "if (project.isComplex()) {",
    "  developer.solve(problem);",
    "  return 'Perfect Solution ✨';",
    "}",
    "",
    "// Always ready for new challenges",
    "developer.status = 'Available for hire';",
    "developer.passion = 'Creating amazing apps';",
    "",
    "export default developer;"
  ];

  useEffect(() => {
    if (!isInView) return;

    let currentLine = 0;
    let currentChar = 0;
    let isDeleting = false;

    const typeCode = () => {
      const currentLineText = codeSnippets[currentLine];
      
      if (!isDeleting) {
        if (currentChar < currentLineText.length) {
          setHackerText(prev => prev + currentLineText[currentChar]);
          currentChar++;
        } else {
          setTimeout(() => {
            if (currentLine < codeSnippets.length - 1) {
              setHackerText(prev => prev + '\n');
              currentLine++;
              currentChar = 0;
            }
          }, 500);
        }
      }
    };

    const interval = setInterval(typeCode, 100);
    return () => clearInterval(interval);
  }, [isInView]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementaría la lógica de envío del formulario
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos y creemos algo increíble juntos!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Hacker Code Effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Code Terminal */}
            <div className="backdrop-blur-2xl bg-gray-900/90 dark:bg-gray-950/90 rounded-2xl border border-cyan-400/30 shadow-2xl shadow-cyan-400/10 overflow-hidden">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 border-b border-cyan-400/20 bg-gray-800/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2 text-cyan-400 text-sm">
                  <Code className="w-4 h-4" />
                  <span>pusho.dev - terminal</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed min-h-[400px]">
                <div className="text-gray-400 mb-2">// 💻 Full-Stack Developer Portfolio</div>
                <pre className="text-cyan-300 whitespace-pre-wrap">
                  {hackerText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    className="text-cyan-400 font-bold"
                  >
                    |
                  </motion.span>
                </pre>
              </div>

              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-sm -z-10 rounded-2xl"></div>
            </div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 grid grid-cols-1 gap-4"
            >
              <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-xl p-4 border border-white/20 flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">Email</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">luisalberto@pusho.dev</div>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-xl p-4 border border-white/20 flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">WhatsApp</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">+53 5572430</div>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-xl p-4 border border-white/20 flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">Ubicación</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Granma, Cuba</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="backdrop-blur-2xl bg-white/10 dark:bg-gray-900/30 rounded-2xl p-8 border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 dark:bg-gray-800/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 dark:bg-gray-800/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="tu.email@ejemplo.com"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/20 dark:bg-gray-800/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    data-cursor-hover
                  >
                    <Send className="w-5 h-5" />
                    <span>{t('contact.send')}</span>
                  </Button>
                </motion.div>
              </form>

              {/* Success Message Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-center hidden"
              >
                ✅ ¡Mensaje enviado correctamente! Te responderé pronto.
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
