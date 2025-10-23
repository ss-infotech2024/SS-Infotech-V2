import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { CgWebsite } from "react-icons/cg";
import { MdTabletAndroid } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { FaSearchengin } from "react-icons/fa6";
import { BsDatabaseGear } from "react-icons/bs";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { FaShieldAlt, FaCloud, FaHeadset } from 'react-icons/fa';

// Import images (ensure these are optimized, e.g., WebP format, ~200-300KB)
import bgPattern from '../../public/service/service/bg.png';
import service4 from '../../public/service/service/service-1.png';
import service5 from '../../public/service/service/service-2.png';
import service6 from '../../public/service/service/service-3.png';

// Combined Services data with both sets
const services = [
  // Original services
  {
    id: 1,
    icon: CgWebsite,
    title: "Static Website",
    description: "We create robust static websites that are fast, secure, and easy to maintain, perfect for showcasing your business online.",
    image: service4,
    link: "/service-details",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    icon: MdTabletAndroid,
    title: "Android Development",
    description: "We develop innovative Android applications tailored to your needs, enhancing user engagement and business growth.",
    image: service5,
    link: "/service-details",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    icon: RiVideoLine,
    title: "Digital Marketing",
    description: "Our digital marketing strategies boost your online presence, driving traffic and conversions with targeted campaigns.",
    image: service6,
    link: "/service-details",
    gradient: "from-emerald-500 to-cyan-600",
  },
  {
    id: 4,
    icon: FaSearchengin,
    title: "Search Engine Optimization (SEO)",
    description: "We enhance your online visibility with expert SEO strategies, improving search rankings and driving organic traffic to your website.",
    image: service4,
    link: "/service-details",
    gradient: "from-orange-500 to-pink-600",
  },
  {
    id: 5,
    icon: BsDatabaseGear,
    title: "Backend & Database Development",
    description: "We build secure and scalable backend systems with optimized databases to ensure smooth and reliable operations for your applications.",
    image: service5,
    link: "/service-details",
    gradient: "from-cyan-500 to-indigo-600",
  },
  {
    id: 6,
    icon: PiPlugsConnectedBold,
    title: "Integration Services",
    description: "We connect your applications with third-party APIs and platforms to create seamless, efficient, and automated workflows across systems.",
    image: service6,
    link: "/service-details",
    gradient: "from-violet-500 to-fuchsia-600",
  },
  
];

// Optimized Service Card
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [-4, 4]); // Reduced rotation range
  const rotateY = useTransform(x, [-50, 50], [4, -4]);
  const [isHovered, setIsHovered] = useState(false);

  // Simple debounce for mouse move
  let lastUpdate = 0;
  const handleMouseMove = (e) => {
    const now = Date.now();
    if (now - lastUpdate < 16) return; // Limit to ~60fps
    lastUpdate = now;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPercent = (mouseX / width) * 2 - 1;
    const yPercent = (mouseY / height) * 2 - 1;
    x.set(xPercent * 15); // Reduced range for smoother effect
    y.set(yPercent * 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className="relative group will-change-transform"
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 800, // Reduced perspective
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      {/* Simplified Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${service.gradient}, transparent)`,
          filter: 'blur(10px)',
        }}
      />

      {/* Main Glass Card */}
      <motion.div
        className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300"
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Content Section */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <motion.div
              className="relative"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            >
              <service.icon className="w-10 h-10 text-white p-2 bg-gradient-to-r from-white/20 to-white/10 rounded-xl" />
            </motion.div>
            {/* <motion.a
              href={service.link}
              className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm hover:bg-white/20 transition-colors duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            >
              <span>Read More</span>
              <FaArrowRight className="ml-2 w-3 h-3" />
            </motion.a> */}
          </div>
          <motion.h3
            className="text-xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
          >
            <a href={service.link} className="hover:text-white/80 transition-colors">
              {service.title}
            </a>
          </motion.h3>
          <motion.p
            className="text-white/70 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.15 }}
          >
            {service.description}
          </motion.p>
        </div>

        {/* Image Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0.8 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:opacity-80 transition-opacity duration-300" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Simplified Section Header
const SectionHeader = () => (
  <motion.div
    className="text-center mb-12"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full mb-4">
      <span className="text-blue-400 font-semibold">Our Services</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Transform Your Business
    </h2>
    <p className="text-lg text-white/70 max-w-2xl mx-auto">
      Discover cutting-edge solutions designed to propel your business into the future.
    </p>
  </motion.div>
);

const ServicesSectiona = () => {
  return (
    <section className="relative py-16 w-full bg-gradient-to-br from-purple-950 to-purple-700">
      {/* Simplified Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgPattern}
          alt="Background pattern"
          className="w-full h-full object-cover opacity-15"
          loading="lazy"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader />

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>

          {/* Simplified CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center bg-white/10 border border-white/20 px-6 py-3 rounded-2xl text-white font-semibold hover:bg-white/20 transition-colors duration-300"
            >
              View All Services
              <FaArrowRight className="ml-3 w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSectiona;