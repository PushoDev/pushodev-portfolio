/**
 * About section with testimonials carousel and personal information
 */
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import aboutImage from "@/imgs/about.png";

const About: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Cristina Lavañino",
      position: "Profesora de Biología",
      avatar:
        "https://scontent-mia3-3.xx.fbcdn.net/v/t39.30808-6/481163271_527371140375433_9102856195478967612_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=KebFicPFGKoQ7kNvwEGihFh&_nc_oc=AdniK7rnd0VugCNnmdcXmFGOwB6weWAc4OQQWdMQzAxgInKgweJzt9RyggCS27OE_eI&_nc_zt=23&_nc_ht=scontent-mia3-3.xx&_nc_gid=Bomp6hG2LoLkUqD33Zenvw&oh=00_Afgg57Tx8OrN4jashGSWcDF_IemQjra9-PZ-mYbJ572IDg&oe=691EAF6A",
      content:
        "La calidad del código y la arquitectura que Luis implementó en nuestro proyecto es sobresaliente. Definitivamente recomiendo sus servicios.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michel Verdecia",
      position: "Fotógrafo Profesional",
      avatar:
        "https://scontent-mia3-3.xx.fbcdn.net/v/t39.30808-6/468880164_1682177725693580_4176664096948928189_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=N04rPzGNUwkQ7kNvwHXK2re&_nc_oc=AdlDgZvVzw5PDxSVrBP2bzsWqyFB7jcmrFbvDQomT9Btf0VTX2LpgiDSZUx0Wh1Uvsk&_nc_zt=23&_nc_ht=scontent-mia3-3.xx&_nc_gid=RlLr8D7X0xCiv9L3O4iAtg&oh=00_AfhTG8c5AA_B9wW8SGETDKbS-DXe5faNxjw1jg0aFlRQ0A&oe=691EBCC6",
      content:
        "Luis Alberto es un desarrollador excepcional. Su dedicación y habilidades técnicas son impresionantes. Entregó nuestro proyecto a tiempo y superó nuestras expectativas.",
      rating: 5,
    },
    {
      id: 3,
      name: "Marketing",
      position: "Decoraciones Imperio",
      avatar:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/565a4a50-5997-4ad0-a471-bedc91f578ab.jpg",
      content:
        "Trabajar con Pusho.dev fue una experiencia fantástica. Su enfoque en los detalles y capacidad para resolver problemas complejos es admirable.",
      rating: 5,
    },
    {
      id: 4,
      name: "CEO",
      position: "Regalos RX Mzllo",
      avatar:
        "https://pub-cdn.sider.ai/u/U0O9H2Y0YNR/web-coder/6882accea51c7347d0934b3b/resource/4be2acc8-b22f-4069-9922-c4b7d327c05d.jpg",
      content:
        "GolfitoShop es un testimonio del talento de Luis. Su visión y ejecución técnica han transformado completamente nuestro negocio online.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="about" className="relative py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Side - Image and Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Profile Image */}
            <div className="relative mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mx-auto overflow-hidden shadow-2xl w-80 h-96 rounded-2xl shadow-cyan-400/20"
              >
                <img
                  src={aboutImage}
                  alt="Luis Alberto - About"
                  className="object-cover object-center w-full h-full"
                  onError={(e) => {
                    console.error("Error cargando imagen:", e);
                    console.log("Ruta intentada:", aboutImage);
                  }}
                  onLoad={() => console.log("Imagen cargada correctamente")}
                />
              </motion.div>

              {/* Floating elements around image */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full shadow-lg bg-gradient-to-r from-cyan-400 to-purple-500"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${
                        i * 60
                      }deg) translateY(-40px) translateX(-50%)`,
                      transformOrigin: "50% 40px",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Personal Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="p-4 text-center border backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-xl border-white/20">
                <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
                  10+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t("about.experience")}
                </div>
              </div>
              <div className="p-4 text-center border backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-xl border-white/20">
                <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
                  24/7
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t("about.availability")}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="mb-8 text-4xl font-bold text-transparent lg:text-5xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text">
              {t("about.title")}
            </h2>

            <div className="space-y-6 leading-relaxed text-gray-600 dark:text-gray-300">
              <p className="text-lg">
                {t("about.intro1")}{" "}
                <span className="font-semibold text-cyan-400">
                  Luis Alberto Guisado Lavañino
                </span>{" "}
                {t("about.intro2")}
              </p>

              <p>
                {t("about.journey1")}{" "}
                <span className="font-semibold text-purple-400">
                  GolfitoShop
                </span>{" "}
                {t("about.journey2")}
              </p>

              <p>
                {t("about.education1")}{" "}
                <span className="font-semibold text-purple-400">
                  'IPI Ruben Bravo'
                </span>{" "}
                {t("about.education2")}
              </p>

              <div className="p-6 border bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border-white/10">
                <h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">
                  🎯 {t("about.approach")}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>{t("about.cleanCode")}</li>
                  <li>{t("about.performance")}</li>
                  <li>{t("about.userDesign")}</li>
                  <li>{t("about.scalableSolutions")}</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="mb-12 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
            {t("about.clientsSays")}
          </h3>

          {/* Testimonials Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="p-8 border shadow-lg backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-2xl border-white/20">
              {/* Quote Icon */}
              <Quote className="w-12 h-12 mx-auto mb-6 text-cyan-400" />

              {/* Testimonial Content */}
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="mb-6 text-lg italic leading-relaxed text-gray-600 dark:text-gray-300">
                  "{testimonials[currentTestimonial].content}"
                </p>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {Array.from({
                    length: testimonials[currentTestimonial].rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="object-cover w-12 h-12 border-2 rounded-full border-cyan-400/50"
                  />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonials[currentTestimonial].position}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm"
                data-cursor-hover
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Dots indicator */}
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-cyan-400 w-8"
                        : "bg-gray-400/50 hover:bg-gray-400"
                    }`}
                    data-cursor-hover
                    aria-label={`Go to testimonial ${index + 1}`}
                    title={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm"
                data-cursor-hover
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
