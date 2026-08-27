import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Target, Eye, Album, Heart } from "lucide-react";

// Apple-inspired refined animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // Apple-like smooth ease
    },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
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
          "S.S. Infotech is a Nagpur-based IT solutions company committed to delivering innovative, reliable, and high-performance digital solutions. We specialize in web and application development, software integration, and digital transformation, empowering businesses to achieve growth, efficiency, and success through technology-driven excellence.",
        ],
      },
      {
        title: "Our Founder's Vision",
        subtitle: "Founder",
        icon: Sparkles,
        image: "aboutimg/mangesh sir.png",
        alt: "Founder - Mr. Mangesh Ingle",
        content: [
          "Our journey began with a simple yet powerful idea — to build technology that transforms possibilities into progress. I've always believed that true innovation lies in understanding real problems and solving them with precision and creativity.",
          "What started as a vision to develop smart, reliable software has grown into a purpose — to create meaningful digital experiences that empower businesses and people alike. Every project reflects our passion for excellence and our constant drive to redefine what technology can achieve.",
          "— Mr. Mangesh Ingle, Founder & CEO",
        ],
        order: "md:order-2",
        contentOrder: "order-2 md:order-1",
      },
      {
        title: "Driving Innovation Forward",
        subtitle: "Director - SS Infotech",
        icon: Target,
        image: "aboutimg/allan sir.png",
        alt: "Director - Mr. Allan Abraham",
        content: [
          "As Director, my focus is on leading a team that blends creativity with technology to deliver practical, high-impact solutions. We are driven by curiosity and a shared belief that the best results come from collaboration, dedication, and continuous learning.",
          "In a fast-changing digital world, our commitment remains constant — to build software that is efficient, scalable, and tailored to every client's unique vision. For us, success means seeing our work make a real difference.",
          "— Mr. Allan Abraham, Director",
        ],
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
          "We aim to empower the world through the transformative power of Information Technology. Our vision is to not only utilize existing innovations but to pioneer new solutions that inspire progress and connect people globally.",
      },
      {
        title: "Our Mission",
        icon: Target,
        content:
          "Our mission is to earn and uphold the trust, confidence, and loyalty of our valued clients. Every milestone we have achieved stems from the strong, long-term relationships we nurture with our customers.",
      },
      {
        title: "Our Objectives",
        icon: Album,
        content:
          "At S.S. Infotech, our objective is to build lasting relationships with our clients founded on trust, commitment, and exceptional service. We aim to harness our knowledge and expertise to drive technological innovation.",
      },
      {
        title: "Our Values",
        icon: Heart,
        content:
          "At S.S. Infotech, we place people at the heart of everything we do. Our care is reflected in the trust, loyalty, and satisfaction we share with our clients. We are guided by a unified vision to use technology as a force for progress.",
      },
    ],
    []
  );

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] font-sans relative overflow-hidden">
      {/* Ambient Background Orbs */}
      <motion.div
        className="fixed top-[20%] -left-[10%] w-[400px] h-[400px] bg-purple-400/[0.04] rounded-full blur-[100px] pointer-events-none z-0"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-[20%] -right-[5%] w-[300px] h-[300px] bg-indigo-400/[0.03] rounded-full blur-[100px] pointer-events-none z-0"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
      />

      {/* Hero Section — Apple Dark Style */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#000000] via-[#1a1a2e] to-[#16213e] text-white">
        {/* Ambient Glows */}
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-purple-500/[0.08] rounded-full blur-[100px]"
          animate={{
            opacity: [0.05, 0.12, 0.05],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-500/[0.06] rounded-full blur-[100px]"
          animate={{
            opacity: [0.04, 0.1, 0.04],
            scale: [1, 1.15, 1],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        />

        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            src="/aboutus.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-purple-900/40" />
        </div>

        <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 text-center z-10 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
            className="space-y-8"
          >
            <motion.div variants={item}>
              <motion.div
                className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-xl text-white/80 px-6 py-3 text-sm border border-white/[0.08] rounded-full font-medium tracking-wide"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                {/* <Sparkles className="w-4 h-4 text-[#a78bfa]" /> */}
                About Our Journey
              </motion.div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[1.05]"
            >
              Discover Our{" "}
              <span className="bg-gradient-to-r from-[#c4b5fd] via-[#a78bfa] to-[#818cf8] bg-clip-text text-transparent">
                Story
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl mx-auto font-light tracking-[-0.01em]"
            >
              Our mission, vision, and the dedicated team driving our{" "}
              <span className="text-white/80 font-normal">success in technology innovation.</span>
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`py-24 lg:py-32 relative z-10 ${
            index % 2 === 1 ? "bg-white" : "bg-[#f5f5f7]"
          }`}
        >
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={container}
              className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center"
            >
              {/* Image */}
              <motion.div
                variants={scaleIn}
                className={`relative ${section.order || ""}`}
              >
                <motion.div
                  className="relative overflow-hidden rounded-3xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.15)]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.img
                    src={section.image}
                    alt={section.alt}
                    className="w-full h-[480px] object-cover"
                    loading="lazy"
                    onError={(e) => (e.target.src = "/imgs/placeholder.jpg")}
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </motion.div>

                {/* Subtle Glow Behind Image */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-500/[0.06] to-indigo-500/[0.04] rounded-[32px] blur-2xl -z-10"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Content */}
              <motion.div
                variants={slideIn}
                className={`space-y-6 ${section.contentOrder || ""}`}
              >
                <motion.div
                  className="inline-flex items-center gap-3"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#f3e8ff] to-[#e9d5ff] rounded-xl flex items-center justify-center shadow-sm">
                    <section.icon className="w-5 h-5 text-[#7c3aed]" />
                  </div>
                  <span className="text-[#7c3aed] font-semibold text-sm tracking-[0.08em] uppercase">
                    {section.subtitle}
                  </span>
                </motion.div>

                <motion.h2
                  className="text-4xl sm:text-5xl font-bold text-[#1d1d1f] tracking-[-0.03em] leading-[1.1]"
                  variants={fadeUp}
                  custom={0.1}
                >
                  {section.title}
                </motion.h2>

                <motion.div
                  className="space-y-5 text-[#6e6e73] text-[17px] leading-[1.7] font-normal"
                  variants={container}
                >
                  {section.content.map((paragraph, i) => (
                    <motion.p
                      key={i}
                      variants={fadeUp}
                      custom={0.2 + i * 0.1}
                      className={
                        paragraph.startsWith("—")
                          ? "text-[#7c3aed] font-semibold text-[15px] mt-4"
                          : paragraph.startsWith('"')
                          ? "text-[#424245] italic border-l-[3px] border-[#c4b5fd] pl-5"
                          : "text-[#424245] italic border-l-[3px] border-[#c4b5fd] pl-5"
                      }
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Mission & Vision Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#f5f5f7] relative overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
            className="text-center mb-20"
          >
            <motion.h2
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1d1d1f] tracking-[-0.03em] mb-5"
            >
              Our Purpose & Focus
            </motion.h2>
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-[#6e6e73] max-w-xl mx-auto font-light"
            >
              Driving innovation and excellence in everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {missionVision.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={index * 0.1}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-black/[0.04] hover:border-purple-500/10 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Top gradient line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-[#7c3aed] to-[#6366f1] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_24px_-6px_rgba(124,58,237,0.3)]"
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                  >
                    <card.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-[-0.02em]">
                    {card.title}
                  </h3>

                  <p className="text-[#6e6e73] leading-[1.6] text-[15px]">
                    {card.content}
                  </p>
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