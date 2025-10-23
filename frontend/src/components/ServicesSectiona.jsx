import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaArrowRight, FaShieldAlt, FaCloud, FaHeadset } from 'react-icons/fa';

// Import images (adjust paths as needed)
import bgPattern from '../../public/service/service/bg.png'
import service4 from '../../public/service/service/service-1.png';
import service5 from '../../public/service/service/service-2.png';
import service6 from '../../public/service/service/service-3.png';
// import icon1 from '../../public/icon/icon/icon-1.webp';
// import icon20 from '../../public/icon/icon/icon-2.webp';
// import icon21 from '../../public/icon/icon/icon-3.webp';

// Enhanced services data with gradient colors
const services = [
  {
    id: 1,
    icon: FaShieldAlt,
    title: "Managed IT Services",
    description: "Comprehensive IT management solutions to keep your business running smoothly and securely.",
    image: service4,
    link: "/service-details",
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    glow: "from-blue-500/20 via-blue-400/10 to-indigo-500/20"
  },
  {
    id: 2,
    icon: FaCloud,
    title: "Cloud Computing Services",
    description: "Scalable cloud solutions that grow with your business and enhance collaboration.",
    image: service5,
    link: "/service-details",
    gradient: "from-purple-500 via-purple-600 to-pink-600",
    glow: "from-purple-500/20 via-purple-400/10 to-pink-500/20"
  },
  {
    id: 3,
    icon: FaHeadset,
    title: "Technical Support & Help Desk",
    description: "24/7 expert technical support to resolve issues quickly and minimize downtime.",
    image: service6,
    link: "/service-details",
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
    glow: "from-emerald-500/20 via-teal-400/10 to-cyan-500/20"
  },
   {
    id: 4,
    icon: FaShieldAlt,
    title: "Managed IT Services",
    description: "Comprehensive IT management solutions to keep your business running smoothly and securely.",
    image: service4,
    link: "/service-details",
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    glow: "from-blue-500/20 via-blue-400/10 to-indigo-500/20"
  },
   {
    id: 5,
    icon: FaShieldAlt,
    title: "Managed IT Services",
    description: "Comprehensive IT management solutions to keep your business running smoothly and securely.",
    image: service4,
    link: "/service-details",
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    glow: "from-blue-500/20 via-blue-400/10 to-indigo-500/20"
  },
   {
    id: 6,
    icon: FaShieldAlt,
    title: "Managed IT Services",
    description: "Comprehensive IT management solutions to keep your business running smoothly and securely.",
    image: service4,
    link: "/service-details",
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    glow: "from-blue-500/20 via-blue-400/10 to-indigo-500/20"
  },
];

// Enhanced Service Card with Mirror Transparency
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [-8, 8]);
  const rotateY = useTransform(x, [-100, 100], [8, -8]);
  const opacity = useTransform(y, [-100, 100], [0.8, 1]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPercent = (mouseX / width) * 2 - 1;
    const yPercent = (mouseY / height) * 2 - 1;
    x.set(xPercent * 25);
    y.set(yPercent * 25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative group"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mirror Reflection Layer */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} blur-sm rounded-3xl`}></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent rounded-b-3xl"></div>
      </div>

      {/* Main Glass Card */}
      <motion.div
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ 
          y: -10, 
          scale: 1.02,
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.25)`
        }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      >
        {/* Floating Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
        
        {/* Content Section with Glass Effect */}
        <div className="content relative z-10 p-8">
          <div className="flex justify-between items-start mb-8">
            {/* Animated Icon with Glow */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className={`absolute -inset-2 bg-gradient-to-r ${service.gradient} rounded-full blur-xl opacity-30`}></div>
              <service.icon className="w-16 h-16 text-white p-3 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl backdrop-blur-sm shadow-lg relative z-10" />
            </motion.div>

            {/* Animated Read More Button */}
            <motion.a
              href={service.link}
              className="group/btn flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white font-medium hover:bg-white/20 transition-all duration-300"
              whileHover={{ x: 8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">Read More</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FaArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.a>
          </div>
          
          {/* Title with Gradient Text */}
          <motion.h3 
            className="text-2xl font-bold mb-4 text-white drop-shadow-lg leading-tight"
            whileHover={{ color: 'white' }}
          >
            <a href={service.link} className="bg-gradient-to-r bg-clip-text text-transparent from-white via-white/90 to-white/70 hover:from-white hover:to-white/50 transition-all duration-300">
              {service.title}
            </a>
          </motion.h3>
          
          {/* Description */}
          <p className="text-white/80 leading-relaxed text-sm backdrop-blur-sm">
            {service.description}
          </p>
        </div>

        {/* Enhanced Image Section with Mirror Effect */}
        <div className="relative overflow-hidden">
          {/* Top gradient bar */}
          <div className={`h-1 bg-gradient-to-r ${service.gradient}`}></div>
          
          {/* Image with glass overlay */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            {/* Glass overlay with mirror effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-b-3xl"></div>
            
            {/* Mirror reflection effect */}
            <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent transform scale-y-[-1] opacity-60 blur-sm"></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Glow Effect */}
        <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-t ${service.glow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full`}></div>
      </motion.div>

      {/* Floating Particles */}
      <motion.div 
        className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: 0.5
        }}
      />
    </motion.div>
  );
};

// Enhanced Section Header
const SectionHeader = () => (
  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <motion.div
      className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/10 mb-6"
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-blue-400 font-semibold">Our Services</span>
    </motion.div>
    <motion.h2 
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4"
      whileInView={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 1, yoyo: Infinity, repeatDelay: 3 }}
    >
      Transform Your Business
    </motion.h2>
    <motion.p 
      className="text-xl text-white/70 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      Discover cutting-edge solutions designed to propel your business into the future with seamless technology integration.
    </motion.p>
  </motion.div>
);

const ServicesSectiona = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-purple-950 via-purple-950 to-purple-700">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgPattern}
          alt="Background pattern"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/20"></div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/50 to-purple-950/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/50 to-purple-950/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/50 to-purple-950/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <SectionHeader />

          <motion.div
            className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </motion.div>

          {/* Enhanced CTA */}
          <motion.div
            className="text-center mt-24"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="/contact"
              className="group relative inline-flex items-center bg-white/10 backdrop-blur-xl border border-white/20 px-10 py-4 rounded-3xl font-semibold text-white text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.15)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Services</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
              <FaArrowRight className="ml-3 w-5 h-5 relative z-10" />
            </motion.a>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default ServicesSectiona;