import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Stars, Camera, Users, Target, Eye, Upload, Image as ImageIcon } from "lucide-react";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
    },
  }),
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 text-gray-800 font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-32 right-20 w-32 h-32 bg-pink-400/30 rounded-full blur-2xl"
        animate={{
          y: [0, -40, 0],
          x: [0, -20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Floating Stars */}
      <motion.div
        className="absolute top-1/4 left-1/5"
        variants={floatingAnimation}
        animate="animate"
      >
        <Stars className="h-6 w-6 text-purple-300" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/3"
        variants={floatingAnimation}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Sparkles className="h-4 w-4 text-pink-300" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 text-white py-28 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"
          variants={pulseAnimation}
          animate="animate"
        />

        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl"
          variants={pulseAnimation}
          animate="animate"
          style={{ animationDelay: "2s" }}
        />

        <div className="absolute inset-0">
          <img
            src="/imgs/gallery/gallery-29.webp"
            alt="About Banner"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative container mx-auto px-6 text-center z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={container}
            className="space-y-6"
          >
            <motion.div
              className="inline-flex items-center justify-center mb-6"
              variants={item}
            >
              <div className="bg-purple-400/20 backdrop-blur-sm text-purple-100 px-6 py-3 text-lg border border-purple-300/30 shadow-lg shadow-purple-500/20 rounded-full font-semibold">
                <Sparkles className="w-5 h-5 mr-2 inline" />
                About Our Journey
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Discover Our{" "}
              <motion.span
                className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent inline-block"
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
              className="text-xl md:text-2xl text-purple-100 leading-relaxed max-w-4xl mx-auto"
            >
              Discover our mission, vision, and the dedicated team driving our{" "}
              <motion.span
                className="font-semibold text-white"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                success in technology innovation.
              </motion.span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* First Section - Image Left, Content Right - Company Overview */}
      <section className="py-20 container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side - Image */}
          <motion.div variants={fadeUp} custom={0}>
            <div className="relative">
              <motion.img
                src="/img/imag3.jpg"
                alt="Company"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl -z-10"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div variants={fadeUp} custom={0.2} className="space-y-6">
            <motion.div
              className="inline-flex items-center mb-4"
              variants={item}
            >
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="ml-3 text-purple-600 font-semibold">About Our Company</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
              Who We Are
            </h2>

            <div className="space-y-4 text-lg text-purple-700">
              <p>
                We are a team of technology enthusiasts, innovators, and creative
                thinkers dedicated to delivering top-tier IT solutions. Our focus
                is to empower businesses with cutting-edge software, web, and
                mobile technologies.
              </p>
              <p>
                From startups to enterprises, we craft solutions that solve real
                problems, boost productivity, and deliver lasting impact.
              </p>
            </div>

            {/* <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
            >
              Learn More About Us
            </motion.button> */}
          </motion.div>
        </motion.div>
      </section>

      {/* Second Section - Image Right, Content Left - Founder */}
      <section className="py-20 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/10 blur-3xl rounded-full"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={container}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Content */}
            <motion.div variants={fadeUp} custom={0} className="space-y-6 order-2 md:order-1">
              <motion.div
                className="inline-flex items-center mb-4"
                variants={item}
              >
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <span className="ml-3 text-purple-600 font-semibold">Founder</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
                Our Founder's Vision
              </h2>

              <div className="space-y-4 text-lg text-purple-700">
                <p>
                  "Our journey began with a simple yet powerful vision: to create technology solutions that truly make a difference. 
                  We believe in the transformative power of innovation and its ability to shape a better future for businesses and communities alike."
                </p>
                <p>
                  "At SS Infotech, we're not just building software; we're building relationships, trust, and lasting partnerships. 
                  Every line of code we write carries our commitment to excellence and our passion for creating meaningful impact."
                </p>
                <p className="font-semibold text-purple-800">
                  - John Doe, Founder & CEO
                </p>
              </div>

              {/* <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
              >
                Connect with Founder
              </motion.button> */}
            </motion.div>

            {/* Right Side - Image */}
            <motion.div variants={fadeUp} custom={0.2} className="order-1 md:order-2">
              <div className="relative">
                <motion.img
                  src="/imgs/gallery/founder1.jpg"
                  alt="Founder"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl -z-10"
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Third Section - Image Left, Content Right - Director */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={container}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Image */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="relative">
                <motion.img
                  src="/imgs/gallery/founder2.jpg"
                  alt="SS Infotech Director"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl -z-10"
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div variants={fadeUp} custom={0.2} className="space-y-6">
              <motion.div
                className="inline-flex items-center mb-4"
                variants={item}
              >
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <span className="ml-3 text-purple-600 font-semibold">Director - SS Infotech</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
                Driving Innovation Forward
              </h2>

              <div className="space-y-4 text-lg text-purple-700">
                <p>
                  "As the Director of SS Infotech, my focus is on fostering innovation while maintaining the highest standards of quality. 
                  We're committed to delivering solutions that not only meet but exceed our clients' expectations."
                </p>
                <p>
                  "Our team's dedication to continuous learning and adaptation in this rapidly evolving tech landscape is what sets us apart. 
                  We embrace challenges as opportunities to innovate and grow."
                </p>
                <p className="font-semibold text-purple-800">
                  - Jane Smith, Director - SS Infotech
                </p>
              </div>

              {/* <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
              >
                Learn About Our Strategy
              </motion.button> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fourth Section - Image Right, Content Left - Overseas Director */}
      <section className="py-20 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/10 blur-3xl rounded-full"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={container}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Content */}
            <motion.div variants={fadeUp} custom={0} className="space-y-6 order-2 md:order-1">
              <motion.div
                className="inline-flex items-center mb-4"
                variants={item}
              >
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <span className="ml-3 text-purple-600 font-semibold">Overseas Director</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
                Global Perspective, Local Impact
              </h2>

              <div className="space-y-4 text-lg text-purple-700">
                <p>
                  "As the Overseas Director, I bridge the gap between global technological trends and local business needs. 
                  Our international experience allows us to bring world-class solutions to our clients while understanding their unique regional challenges."
                </p>
                <p>
                  "We're constantly exploring new markets and technologies to ensure that SS Infotech remains at the forefront of global innovation. 
                  Our diverse team brings together the best practices from around the world to deliver exceptional results."
                </p>
                <p className="font-semibold text-purple-800">
                  - Michael Lee, Overseas Director
                </p>
              </div>

              {/* <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
              >
                Explore Global Partnerships
              </motion.button> */}
            </motion.div>

            {/* Right Side - Image */}
            <motion.div variants={fadeUp} custom={0.2} className="order-1 md:order-2">
              <div className="relative">
                <motion.img
                  src="/imgs/gallery/founder3.jpg"
                  alt="Overseas Director"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl -z-10"
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={container}
            className="space-y-4 mb-16"
          >
            <motion.h2
              variants={item}
              className="text-4xl md:text-5xl font-bold text-purple-900 mb-4"
            >
              Our Vision & Mission
            </motion.h2>
            <motion.p
              variants={item}
              className="text-xl text-purple-600 max-w-3xl mx-auto"
            >
              Driving innovation and excellence in everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={container}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group"
            >
              <motion.div
                className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Eye className="w-8 h-8 text-purple-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-purple-900 mb-4">Our Vision</h3>
              <p className="text-purple-700 leading-relaxed">
                To be a globally recognized leader in technology, driving
                innovation and digital transformation with next-generation IT
                solutions that shape the future.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.2}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group"
            >
              <motion.div
                className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Target className="w-8 h-8 text-purple-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-purple-900 mb-4">Our Mission</h3>
              <p className="text-purple-700 leading-relaxed">
                To deliver exceptional digital products with passion,
                performance, and precision, while fostering long-term client
                relationships built on trust and mutual success.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;