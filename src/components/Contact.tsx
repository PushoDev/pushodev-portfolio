/**
 * Contact section with hacker-style code animation and contact form
 */
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Phone, MapPin, Send, Code } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [hackerText, setHackerText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const codeSnippets = [
    "class Full.Stack.Developer {",
    "  constructor(name) {",
    "    this.name = luis.guisado.puchotech;",
    "    this.expertise = ['React', 'Laravel', 'Python', 'Flutter'];",
    "    this.yearsOfExperience = 5;",
    "  }",
    "",
    "  solveProblems() {",
    "    return 'Clean code + Fast delivery + Innovation';",
    "  }",
    "",
    "  readyToCollaborate() {",
    "    return true;",
    "  }",
    "}",
    "",
    "const developer = new FullStackDeveloper();",
    "// Let's build something amazing together 🚀",
  ];

  const stateRef = useRef({ currentLine: 0, currentChar: 0 });

  useEffect(() => {
    if (!isInView) return;

    const typeCode = () => {
      const state = stateRef.current;
      const currentLineText = codeSnippets[state.currentLine];

      if (state.currentChar < currentLineText.length) {
        setHackerText((prev) => prev + currentLineText[state.currentChar]);
        state.currentChar++;
      } else if (state.currentLine < codeSnippets.length - 1) {
        setHackerText((prev) => prev + "\n");
        state.currentLine++;
        state.currentChar = 0;
      }
    };

    const interval = setInterval(typeCode, 50);
    return () => clearInterval(interval);
  }, [isInView]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola, mi nombre es ${formData.name}.\n\nEmail: ${formData.email}\n\nMensaje: ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5355572430?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="relative py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-8 text-4xl font-bold text-transparent lg:text-5xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text">
            {t("contact.title")}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            ¿Tienes un proyecto en mente? ¡Envíame un mensaje a WhatsApp y
            creemos algo increíble juntos!
          </p>
        </motion.div>

        <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side - Hacker Code Effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Code Terminal */}
            <div className="overflow-hidden border shadow-2xl backdrop-blur-2xl bg-gray-900/90 dark:bg-gray-950/90 rounded-2xl border-cyan-400/30 shadow-cyan-400/10">
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 border-b border-cyan-400/20 bg-gray-800/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-cyan-400">
                  <Code className="w-4 h-4" />
                  <span>pusho.dev - terminal</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed min-h-[400px]">
                <div className="mb-2 text-gray-400">
                  // 💻 Full-Stack Developer Portfolio
                </div>
                <pre className="whitespace-pre-wrap text-cyan-300">
                  {hackerText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="font-bold text-cyan-400"
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
              className="grid grid-cols-1 gap-4 mt-8"
            >
              <div className="flex items-center p-4 space-x-4 border backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-xl border-white/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Email
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    pushodevs@gmail.com
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 space-x-4 border backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-xl border-white/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    WhatsApp
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    +53 55572430
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 space-x-4 border backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-xl border-white/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Ubicación
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Granma, Cuba
                  </div>
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
            <div className="p-8 border shadow-2xl backdrop-blur-2xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-gray-800 placeholder-gray-500 border bg-white/20 dark:bg-gray-800/50 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm dark:text-gray-200 dark:placeholder-gray-400"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-gray-800 placeholder-gray-500 border bg-white/20 dark:bg-gray-800/50 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm dark:text-gray-200 dark:placeholder-gray-400"
                    placeholder="tu.email@ejemplo.com"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("contact.message")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 text-gray-800 placeholder-gray-500 border resize-none bg-white/20 dark:bg-gray-800/50 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm dark:text-gray-200 dark:placeholder-gray-400"
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
                    className="flex items-center justify-center w-full py-4 space-x-2 font-semibold text-white transition-all duration-300 bg-green-600 shadow-lg hover:bg-green-700 rounded-xl hover:shadow-xl"
                    data-cursor-hover
                  >
                    <Send className="w-5 h-5" />
                    <span>Enviar por WhatsApp</span>
                  </Button>
                </motion.div>
              </form>

              {/* Success Message Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                className="hidden p-4 mt-6 text-center text-green-300 border bg-green-500/20 border-green-500/30 rounded-xl"
              >
                ✅ ¡Se abrirá WhatsApp para enviar tu mensaje! Te responderé lo
                antes posible.
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
