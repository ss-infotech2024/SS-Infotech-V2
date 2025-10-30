import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Stars, Users, Target, Eye, Album, Heart } from "lucide-react";

// Enhanced animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      when: "beforeChildren",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const gradientPulse = {
  animate: {
    background: [
      "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
      "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
      "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const AboutUs = () => {
  const sections = useMemo(
    () => [
      {
        title: "Who We Are",
        subtitle: "About Our Company",
        icon: Users,
        image: "aboutimg/whoweare2.jpg",
        alt: "Company Team",
        content: [
          '"S.S. Infotech is a Nagpur-based IT solutions company committed to delivering innovative, reliable, and high-performance digital solutions. We specialize in web and application development, software integration, and digital transformation, empowering businesses to achieve growth, efficiency, and success through technology-driven excellence."',
        ],
      },
      {
        title: "Our Founder's Vision",
        subtitle: "Founder",
        icon: Sparkles,
        image: "aboutimg/mangesh sir.jpg",
        alt: "Founder - Mr. Mangesh Ingle",
        content: [
          '"Our journey began with a simple yet powerful idea — to build technology that transforms possibilities into progress. I\'ve always believed that true innovation lies in understanding real problems and solving them with precision and creativity."',
          '"What started as a vision to develop smart, reliable software has grown into a purpose — to create meaningful digital experiences that empower businesses and people alike. Every project reflects our passion for excellence and our constant drive to redefine what technology can achieve."',
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
        alt: "Director - Mr. Allan Abraham",
        content: [
          '"As Director, my focus is on leading a team that blends creativity with technology to deliver practical, high-impact solutions. We are driven by curiosity and a shared belief that the best results come from collaboration, dedication, and continuous learning."',
          '"In a fast-changing digital world, our commitment remains constant — to build software that is efficient, scalable, and tailored to every client\'s unique vision. For us, success means seeing our work make a real difference."',
          "- Mr. Allan Abraham, Director",
        ],
      },
      {
        title: "Global Perspective, Local Impact",
        subtitle: "Overseas Director",
        icon: Eye,
        image: "aboutimg/allvi sir.jpg",
        alt: "Overseas Director - Dr. N. G. Alvi",
        content: [
          '"My goal is to guide students and professionals toward global opportunities that expand their learning and career horizons. We connect ambitious minds with top international institutions, helping them achieve their dreams through the right guidance and support."',
          '"With a global outlook and a personal touch, our focus is on bridging education, innovation, and opportunity — creating pathways that empower individuals to grow, learn, and lead across borders."',
          "- Dr. N. G. Alvi, Overseas Director",
        ],
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
          "We aim to empower the world through the transformative power of Information Technology. Our vision is to not only utilize existing innovations but to pioneer new solutions that inspire progress and connect people globally. We see technology as a bridge to a better future—one that fosters creativity, inclusivity, and sustainable growth.",
      },
      {
        title: "Our Mission",
        icon: Target,
        content:
          "Our mission is to earn and uphold the trust, confidence, and loyalty of our valued clients. Every milestone we have achieved stems from the strong, long-term relationships we nurture with our customers—relationships we consider our greatest assets.",
      },
      {
        title: "Our Objectives",
        icon: Album,
        content:
          "At S.S. Infotech, our objective is to build lasting relationships with our clients founded on trust, commitment, and exceptional service. We aim to harness our knowledge and expertise to drive technological innovation and contribute meaningfully to the advancement of Information Technology.",
      },
      {
        title: "Our Values",
        icon: Heart,
        content:
          "At S.S. Infotech, we place people at the heart of everything we do. Our care is reflected in the trust, loyalty, and satisfaction we share with our clients. We are guided by a unified vision to use technology as a force for progress and empowerment.",
      },
    ],
    []
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/30 text-gray-800 font-sans relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-purple-400/15 rounded-full blur-xl will-change-transform"
        animate={{
          y: [0, 25, 0],
          x: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-32 right-20 w-28 h-28 bg-blue-400/20 rounded-full blur-2xl will-change-transform"
        animate={{
          y: [0, -35, 0],
          x: [0, -20, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/5 will-change-transform"
        variants={floatingAnimation}
        animate="animate"
      >
        <Stars className="h-6 w-6 text-purple-300/80" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/3 will-change-transform"
        variants={floatingAnimation}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Sparkles className="h-5 w-5 text-blue-300/80" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-80  text-white">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-purple-500/15 rounded-full blur-3xl will-change-transform"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/15 rounded-full blur-3xl will-change-transform"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        />

        <div className="absolute inset-0 overflow-hidden">
          <video
            src="/aboutus.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-purple-900/60" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
            className="space-y-8"
          >
            <motion.div
              className="inline-flex items-center justify-center mb-6"
              variants={item}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-md text-white/90 px-8 py-4 text-lg border border-white/20 shadow-2xl shadow-purple-500/10 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-5 h-5 mr-3 inline" />
                About Our Journey
              </motion.div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            >
              Discover Our{" "}
              <motion.span
                className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 4,
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
              className="text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Discover our mission, vision, and the dedicated team driving our{" "}
              <motion.span
                className="font-semibold text-white"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                success in technology innovation.
              </motion.span>
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 will-change-transform"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`py-20 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${
            index % 2 === 1 
              ? "bg-gradient-to-br from-white to-slate-50/80" 
              : "bg-gradient-to-br from-slate-50/80 to-white"
          }`}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-3xl rounded-full will-change-transform"
            animate={{
              opacity: [0.1, 0.15, 0.1],
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="grid md:grid-cols-2 gap-12 items-center relative"
          >
            {/* Image */}
            <motion.div 
              variants={scaleIn}
              className={`relative ${section.order || ""}`}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={section.image}
                  alt={section.alt}
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/imgs/placeholder.jpg")}
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
              
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10 will-change-transform"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              variants={slideIn}
              className={`space-y-8 ${section.contentOrder || ""}`}
            >
              <motion.div 
                className="inline-flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-white p-3 rounded-xl shadow-lg border border-slate-200"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <section.icon className="w-7 h-7 text-purple-600" />
                </motion.div>
                <span className="ml-4 text-purple-600 font-semibold text-lg tracking-wide">
                  {section.subtitle}
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
                variants={fadeUp}
                custom={0.1}
              >
                {section.title}
              </motion.h2>
              
              <motion.div 
                className="space-y-6 text-slate-700 text-lg leading-relaxed"
                variants={container}
              >
                {section.content.map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    variants={fadeUp}
                    custom={0.2 + i * 0.1}
                    className="text-slate-600 font-light"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      ))}

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/5 blur-3xl rounded-full will-change-transform"
          animate={{
            opacity: [0.08, 0.12, 0.08],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
            className="space-y-6 mb-16"
          >
            <motion.h2
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
            >
              Our Purpose & Focus
            </motion.h2>
            <motion.p
              variants={item}
              className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto font-light"
            >
              Driving innovation and excellence in everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {missionVision.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={index * 0.1}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/60 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-purple-700 group-hover:to-blue-700 transition-colors will-change-transform shadow-lg"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <card.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {card.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-slate-600 leading-relaxed font-light text-base group-hover:text-slate-700 transition-colors"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {card.content}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;