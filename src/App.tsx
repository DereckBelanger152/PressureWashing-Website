import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
} from "framer-motion";
import {
  Facebook,
  Instagram,
  Atom as Tiktok,
  Droplets,
  Star,
  Phone,
  Mail,
  Menu,
  X,
  Shield,
  Clock,
  Award,
} from "lucide-react";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const testimonialRef = useRef(null);
  const isInView = useInView(testimonialRef, { once: false, margin: "-100px" });
  const controls = useAnimation();

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 0.7]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let interval: number;
    if (isInView) {
      interval = window.setInterval(() => {
        controls
          .start({
            x: [0, -50],
            transition: { duration: 0.5 },
          })
          .then(() => {
            controls.set({ x: 0 });
          });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isInView, controls]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const testimonials = [
    {
      name: "John smithhshaha",
      text: "test",
      rating: 5,
      role: "test",
    },
    {
      name: "Sarah Johnson",
      text: "test",
      rating: 5,
      role: "test",
    },
    {
      name: "Mike Williams",
      text: "test",
      rating: 5,
      role: "test",
    },
    {
      name: "Emma Davis",
      text: "test",
      rating: 5,
      role: "test",
    },
    {
      name: "David Thompson",
      text: "test",
      rating: 5,
      role: "test",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Équipment professionnel",
      description: "test",
    },
    {
      icon: Droplets,
      title: "Écologique",
      description: "test",
    },
    {
      icon: Clock,
      title: "Service rapide",
      description: "test",
    },
    {
      icon: Award,
      title: "Satisfaction garantie",
      description: "test",
    },
  ];

  const navItems = ["Menu", "À propos", "Testimoniaux", "Contact"];

  return (
    <div className="min-h-screen bg-[#023047]">
      {/* Navbar */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#023047]/95 py-2" : "bg-transparent py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-[#8ecae6]">
              Lavage à pression Provinciale
            </h1>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 hover:bg-[#219ebc]/20 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ y: -2 }}
                  className="text-white cursor-pointer hover:text-[#8ecae6] transition-colors"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu */}
          <motion.div
            className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ul className="pt-4 pb-2 bg-[#023047]/95 rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  className="text-white py-3 px-4 cursor-pointer hover:bg-[#219ebc]/20 transition-colors"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: backgroundOpacity }}
          />
          <img
            src="https://images.unsplash.com/photo-1610476840592-0b4c45b65bac?auto=format&fit=crop&q=80"
            alt="Lavage à pression"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#8ecae6] mb-4 md:mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(142,202,230,0)",
                "0 0 20px rgba(142,202,230,0.5)",
                "0 0 20px rgba(142,202,230,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Lavage à pression Provinciale
          </motion.h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-6 md:mb-8 font-light">
            Préparez votre propriété pour votre nouvelle toiture avec nos
            services de lavage à pression
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#fb8500] text-white px-6 md:px-10 py-3 md:py-4 rounded-lg text-lg md:text-xl font-semibold hover:bg-[#ffb703] transition-colors shadow-lg"
          >
            Obtenez une soumission gratuite!
          </motion.button>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Droplets className="w-8 h-8 md:w-10 md:h-10 text-[#8ecae6]" />
        </motion.div>
      </section>

      {/* About Us */}
      <motion.section
        className="py-16 md:py-32 relative"
        style={{
          background: "linear-gradient(to bottom, #023047 0%, #219ebc 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pourquoi nous choisir?
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/95 p-6 md:p-8 rounded-xl shadow-xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <feature.icon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-[#219ebc]" />
                <h3 className="text-xl md:text-2xl font-semibold text-[#023047] mb-3 md:mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        ref={testimonialRef}
        className="py-16 md:py-32 relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #219ebc 0%, #8ecae6 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Clients satisfaits
          </motion.h2>
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4 md:gap-6"
                animate={{
                  x: [0, "-100%"],
                }}
                transition={{
                  x: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {[...testimonials, ...testimonials].map(
                  (testimonial, index) => (
                    <motion.div
                      key={index}
                      className="min-w-[280px] md:min-w-[350px] bg-white/90 p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex mb-3 md:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 md:w-5 md:h-5 text-[#ffb703] fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="font-semibold text-[#023047] text-base md:text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-[#219ebc] text-sm md:text-base">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        className="py-16 md:py-32 relative"
        style={{
          background: "linear-gradient(to bottom, #8ecae6 0%, white 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#023047] mb-8 md:mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contactez-nous
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              <motion.div
                className="flex items-center gap-3 md:gap-4"
                whileHover={{ x: 10 }}
              >
                <Phone className="w-6 h-6 md:w-8 md:h-8 text-[#fb8500]" />
                <div>
                  <h3 className="font-semibold text-[#023047] text-base md:text-lg">
                    Téléphone
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    (555) 123-4567
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 md:gap-4"
                whileHover={{ x: 10 }}
              >
                <Mail className="w-6 h-6 md:w-8 md:h-8 text-[#fb8500]" />
                <div>
                  <h3 className="font-semibold text-[#023047] text-base md:text-lg">
                    Courriel
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    info@blablabla.com
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 md:gap-4"
                whileHover={{ x: 10 }}
              ></motion.div>
            </div>
            <motion.form
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2.5 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all text-base"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2.5 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all text-base"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-2.5 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all text-base"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-2.5 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all text-base"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#fb8500] text-white py-3 md:py-4 rounded-lg font-semibold hover:bg-[#ffb703] transition-colors shadow-lg text-base md:text-lg"
              >
                Envoyer
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#023047] text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#8ecae6]">
                Lavage à pression Provinciale
              </h3>
              <p className="mt-2 md:mt-3 text-gray-300 max-w-md text-sm md:text-base">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </p>
            </div>
            <div className="flex gap-6 md:gap-8">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="transform transition-transform"
              >
                <Instagram className="w-6 h-6 md:w-7 md:h-7 text-[#8ecae6]" />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="transform transition-transform"
              >
                <Facebook className="w-6 h-6 md:w-7 md:h-7 text-[#8ecae6]" />
              </motion.a>
              <motion.a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="transform transition-transform"
              >
                <Tiktok className="w-6 h-6 md:w-7 md:h-7 text-[#8ecae6]" />
              </motion.a>
            </div>
          </div>
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; Dereck Bélanger - Tout droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
