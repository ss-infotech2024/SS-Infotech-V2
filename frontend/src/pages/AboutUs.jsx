import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Stars, Camera, Users, Target, Eye, Album, Heart } from "lucide-react";
import bgPattern from '../../public/service/service/bg.png';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Reduced delay for smoother stagger
      duration: 0.6, // Slightly faster for snappier feel
      ease: "easeOut",
    },
  }),
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Tighter stagger for smoother flow
      when: "beforeChildren",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -15, 0], // Reduced amplitude for smoother motion
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.03, 1], // Subtler scale for less CPU strain
    opacity: [0.2, 0.4, 0.2],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const AboutUs = () => {
  // Memoize static data to prevent re-computation
  const sections = useMemo(
    () => [
      {
        title: "Who We Are",
        subtitle: "About Our Company",
        icon: Users,
        image: "aboutimg/whoweare2.jpg",
        alt: "Company",
        content: [
          '"S.S. Infotech is a Nagpur-based IT solutions company committed to delivering innovative, reliable, and high-performance digital solutions. We specialize in web and application development, software integration, and digital transformation, empowering businesses to achieve growth, efficiency, and success through technology-driven excellence."',
        ],
      },
      {
        title: "Our Founder's Vision",
        subtitle: "Founder",
        icon: Sparkles,
        image: "aboutimg/mangesh sir.jpg",
        alt: "Founder",
        content: [
          '"Our journey began with a simple yet powerful idea — to build technology that transforms possibilities into progress. I’ve always believed that true innovation lies in understanding real problems and solving them with precision and creativity."', '"What started as a vision to develop smart, reliable software has grown into a purpose — to create meaningful digital experiences that empower businesses and people alike. Every project reflects our passion for excellence and our constant drive to redefine what technology can achieve."',
          "- Mr. Mangesh Ingle, Founder & CEO",
        ],
        order: "md:order-2",
        contentOrder: "order-2 md:order-1",
      },
      {
        title: "Driving Innovation Forward",
        subtitle: "Director - SS Infotech",
        icon: Target,
        image: "aboutimg/allan sir.jpg",
        alt: "SS Infotech Director",
        content: [
          '"As Director, my focus is on leading a team that blends creativity with technology to deliver practical, high-impact solutions. We are driven by curiosity and a shared belief that the best results come from collaboration, dedication, and continuous learning."' , '"In a fast-changing digital world, our commitment remains constant — to build software that is efficient, scalable, and tailored to every client’s unique vision. For us, success means seeing our work make a real difference." ','- Mr. Allan Abraham, Director'
        ],
      },
      {
        title: "Global Perspective, Local Impact",
        subtitle: "Overseas Director",
        icon: Eye,
        image: "aboutimg/allvi sir.jpg",
        alt: "Overseas Director",
        content: [
          '"My goal is to guide students and professionals toward global opportunities that expand their learning and career horizons. We connect ambitious minds with top international institutions, helping them achieve their dreams through the right guidance and support."',' "With a global outlook and a personal touch, our focus is on bridging education, innovation, and opportunity — creating pathways that empower individuals to grow, learn, and lead across borders." ','- Dr. N. G. Alvi, Overseas Director'        ],
        order: "md:order-2",
        contentOrder: "order-2 md:order-1",
      },
    ],
    []
  );

  const missionVision = useMemo(
    () => [
      {
        title: "Our Vision",
        icon: Eye,
        content:
          "We aim to empower the world through the transformative power of Information Technology. Our vision is to not only utilize existing innovations but to pioneer new solutions that inspire progress and connect people globally. We see technology as a bridge to a better future—one that fosters creativity, inclusivity, and sustainable growth. Through dedication, research, and imagination, we strive to redefine the limits of possibility and contribute to building a smarter, more connected, and technologically advanced world for generations to come.",
      },
      {
        title: "Our Mission",
        icon: Target,
        content:
          "Our mission is to earn and uphold the trust, confidence, and loyalty of our valued clients. Every milestone we have achieved stems from the strong, long-term relationships we nurture with our customers—relationships we consider our greatest assets. At SS Infotech, we collaborate with you to craft business and technology solutions tailored to your unique goals. We focus on people first, ensuring that every solution we deliver drives meaningful results—because at SS Infotech, people matter, and results count.",
      },
      {
        title: "Our Objectives",
        icon: Album,
        content:
          "At S.S. Infotech, our objective is to build lasting relationships with our clients founded on trust, commitment, and exceptional service. We aim to harness our knowledge and expertise to drive technological innovation and contribute meaningfully to the advancement of Information Technology. Along with serving businesses, S.S. Infotech also provides students with valuable opportunities to explore a wide spectrum of modern technologies and practical processes, empowering them with real-world skills. Our ultimate goal is to inspire growth, encourage learning, and foster a culture of innovation that benefits both individuals and society.",
      },
      {
        title: "Our Care",
        icon: Heart,
        content:
          "At S.S. Infotech, we place people at the heart of everything we do. Our care is reflected in the trust, loyalty, and satisfaction we share with our clients. We are guided by a unified vision to use technology as a force for progress and empowerment. With every solution we create, we focus on understanding your unique goals, tailoring strategies that deliver measurable impact. Beyond business, we believe in nurturing long-term partnerships built on empathy, reliability, and innovation. Your success is our responsibility, and we are devoted to walking alongside you toward a future defined by growth, excellence, and technological advancement.",
      },
    ],
    []
  );

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 text-gray-800 font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-purple-400/20 rounded-full blur-xl will-change-transform"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-32 right-20 w-24 h-24 bg-pink-400/30 rounded-full blur-2xl will-change-transform"
        animate={{
          y: [0, -30, 0],
          x: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />

      {/* Floating Stars */}
      <motion.div
        className="absolute top-1/4 left-1/5 will-change-transform"
        variants={floatingAnimation}
        animate="animate"
      >
        <Stars className="h-5 w-5 text-purple-300" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/3 will-change-transform"
        variants={floatingAnimation}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      >
        <Sparkles className="h-4 w-4 text-pink-300" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 text-white">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl will-change-transform"
          variants={pulseAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl will-change-transform"
          variants={pulseAnimation}
          animate="animate"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute inset-0">
          <img
            src={bgPattern}
            alt="About Banner"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="space-y-6"
          >
            <motion.div
              className="inline-flex items-center justify-center mb-4"
              variants={item}
            >
              <div className="bg-purple-400/20 backdrop-blur-sm text-purple-100 px-5 py-2 text-lg border border-purple-300/30 shadow-lg shadow-purple-500/20 rounded-full font-semibold">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                About Our Journey
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              Discover Our{" "}
              <motion.span
                className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Story
              </motion.span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl md:text-2xl text-purple-100 leading-relaxed max-w-4xl mx-auto"
            >
              Discover our mission, vision, and the dedicated team driving our{" "}
              <motion.span
                className="font-semibold text-white"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                success in technology innovation.
              </motion.span>
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 will-change-transform"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white/70 rounded-full mt-1"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`py-16 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10   ${
            index % 2 === 1 ? "bg-gradient-to-br from-white to-purple-50" : "bg-gradient-to-br from-purple-50 to-white"
              }`}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full will-change-transform"
            animate={{
              opacity: [0.15, 0.3, 0.15],
              scale: [1, 1.05, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Image */}
            <motion.div variants={fadeUp} custom={0} className={`relative ${section.order || ""}`}>
              <motion.img
                src={section.image}
                alt={section.alt}
                className="rounded-2xl shadow-2xl w-[95%]   object-cover bg-center h-[95%] justify-center"
                loading="lazy"
                onError={(e) => (e.target.src = "/imgs/placeholder.jpg")} // Fallback image
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -inset-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-15 blur-xl -z-10 will-change-transform"
                animate={{
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              variants={fadeUp}
              custom={0.2}
              className={`space-y-6 ${section.contentOrder || ""}`}
            >
              <motion.div className="inline-flex items-center mb-4" variants={item}>
                <div className="bg-purple-100 p-3 rounded-xl">
                  <section.icon className="w-6 h-6 text-purple-600" />
                </div>
                <span className="ml-3 text-purple-600 font-semibold">{section.subtitle}</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-900 mb-4">
                {section.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-purple-700">
                {section.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
      ))}

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full will-change-transform"
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="space-y-4 mb-12"
          >
            <motion.h2
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-900 mb-4"
            >
              Our Purpose & Focus
            </motion.h2>
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-purple-600 max-w-3xl mx-auto"
            >
              Driving innovation and excellence in everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {missionVision.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={index * 0.2}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group"
              >
                <motion.div
                  className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors will-change-transform"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                >
                  <card.icon className="w-6 h-6 text-purple-600" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-3">{card.title}</h3>
                <p className="text-purple-700 leading-relaxed text-sm sm:text-base">{card.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;