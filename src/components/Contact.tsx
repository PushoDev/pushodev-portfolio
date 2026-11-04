/**
 * Contact section with editor-style profile card and contact form
 */
import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Phone, MapPin, Send, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import CoderProfileCard from "./CoderProfileCard";

const CONTACT_EMAIL = "bethocubans1990@gmail.com";

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const es = language === "es";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [website, setWebsite] = useState(""); // honeypot, must stay empty
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error ?? "send_failed");
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
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
            {es
              ? "¿Tienes un proyecto o una oportunidad en mente? Escríbeme con el formulario, por correo o por WhatsApp. Estoy disponible para trabajo remoto y respondo rápido."
              : "Have a project or an opportunity in mind? Use the form, or message me by email or WhatsApp. I'm open to remote work and reply quickly."}
          </p>
        </motion.div>

        <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <CoderProfileCard />

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 gap-4 mt-8"
            >
              {[
                {
                  icon: Mail,
                  grad: "from-cyan-400 to-purple-500",
                  label: "Email",
                  value: CONTACT_EMAIL,
                  href: `mailto:${CONTACT_EMAIL}`,
                },
                {
                  icon: Phone,
                  grad: "from-purple-500 to-pink-500",
                  label: "WhatsApp",
                  value: "+53 55572430",
                  href: "https://wa.me/5355572430",
                },
                {
                  icon: Linkedin,
                  grad: "from-blue-500 to-cyan-500",
                  label: "LinkedIn",
                  value: "luis-alberto-pushodev",
                  href: "https://www.linkedin.com/in/luis-alberto-pushodev/",
                },
                {
                  icon: MapPin,
                  grad: "from-pink-500 to-orange-500",
                  label: es ? "Ubicación" : "Location",
                  value: es ? "Granma, Cuba · Trabajo remoto" : "Granma, Cuba · Remote work",
                  href: undefined,
                },
              ].map(({ icon: Icon, grad, label, value, href }) => {
                const inner = (
                  <>
                    <div className={`flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${grad}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{label}</div>
                      <div className="text-sm text-gray-600 truncate dark:text-gray-300">{value}</div>
                    </div>
                  </>
                );
                const cls =
                  "relative gb gb-soft flex items-center p-4 space-x-4 border backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-xl border-white/20";
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`${cls} transition-colors hover:border-white/40 hover:bg-white/20`}
                    data-cursor-hover
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative p-8 border shadow-2xl gb backdrop-blur-2xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="contact-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-gray-800 placeholder-gray-500 border bg-white/20 dark:bg-gray-800/50 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm dark:text-gray-200 dark:placeholder-gray-400"
                    placeholder={es ? "Tu nombre completo" : "Your full name"}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="contact-email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-gray-800 placeholder-gray-500 border bg-white/20 dark:bg-gray-800/50 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm dark:text-gray-200 dark:placeholder-gray-400"
                    placeholder={es ? "tu.email@ejemplo.com" : "your.email@example.com"}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="contact-message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 text-gray-800 placeholder-gray-500 border resize-none bg-white/20 dark:bg-gray-800/50 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm dark:text-gray-200 dark:placeholder-gray-400"
                    placeholder={es ? "Cuéntame sobre tu proyecto o idea..." : "Tell me about your project or idea..."}
                  />
                </div>

                {/* Honeypot: hidden from people, bots tend to fill it */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
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
                    disabled={status === "sending"}
                    className="flex items-center justify-center w-full py-4 space-x-2 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-xl hover:shadow-xl disabled:opacity-60"
                    data-cursor-hover
                  >
                    <Send className="w-5 h-5" />
                    <span>
                      {status === "sending"
                        ? es ? "Enviando..." : "Sending..."
                        : es ? "Enviar mensaje" : "Send message"}
                    </span>
                  </Button>
                </motion.div>
              </form>

              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                  className="p-4 mt-6 text-center text-green-600 border dark:text-green-300 bg-green-500/20 border-green-500/30 rounded-xl"
                >
                  {es
                    ? "¡Mensaje enviado! Te responderé lo antes posible."
                    : "Message sent! I'll reply as soon as I can."}
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="alert"
                  className="p-4 mt-6 text-sm text-center text-red-600 border dark:text-red-300 bg-red-500/10 border-red-500/30 rounded-xl"
                >
                  {es ? "No se pudo enviar el mensaje. Escríbeme directamente a " : "The message could not be sent. Write to me directly at "}
                  <a className="font-semibold underline" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                  .
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
