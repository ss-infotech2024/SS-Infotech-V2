import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PiRocketLaunchLight } from "react-icons/pi";
import { FaBriefcase, FaLaptopCode, FaGlobe, FaBolt, FaBuilding } from "react-icons/fa";
import { GiTargetDummy } from "react-icons/gi";
import { MdOutlineCastForEducation, MdTrendingUp } from "react-icons/md";


const services = [
  { id: 1, title: "REAL TIME PROJECT DEVELOPMENT", description: "Build live projects with mentorship.", icon: <PiRocketLaunchLight /> },
  { id: 2, title: "JOBS CONSULTANT", description: "Placement guidance and resume review.", icon: <FaBriefcase /> },
  { id: 3, title: "CAREER CONSULTANT", description: "Career path planning and interview prep.", icon: <GiTargetDummy /> },
  { id: 4, title: "SOFTWARE DEVELOPMENT", description: "Custom software solutions & consulting.", icon: <FaLaptopCode /> },
  { id: 5, title: "WEBS & APP DEVELOPMENT", description: "Full-stack web & mobile apps.", icon: <FaGlobe /> },
  { id: 6, title: "DIGITAL MARKETING", description: "SEO, Ads, and growth strategies.", icon: <MdTrendingUp /> },
  { id: 7, title: "ILETS/GRE/TOFEL TRAINING", description: "Exam coaching and mock tests.", icon: <MdOutlineCastForEducation /> },
  { id: 8, title: "CAMPUS HIRING PROGRAM", description: "Drive campus recruitment events.", icon: <FaBuilding /> },
  { id: 9, title: "TRAINING PROGRAM", description: "Skill bootcamps and workshops.", icon: <FaBolt /> },
];


const ServiceCard = ({ service, animation }) => {
  return (
    <div
      data-aos={animation.type}
      data-aos-duration="600"
      data-aos-easing="ease-out"
      data-aos-delay={animation.delay}
      className="group relative bg-white rounded-2xl border-4 border-[#F3F4F6] p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.04) translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 30px rgba(171, 30, 169, 0.18)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.08)';
      }}
    >
      {/* subtle overlay */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[#AB1EA9]" />

      {/* Flex Row Layout */}
      <div className="flex items-center gap-6 relative z-10">
        {/* Icon on Left */}
        <div className="text-6xl text-[#AB1EA9] transition-transform duration-300  group-hover:scale-110">
          {service.icon}
        </div>

        {/* Text on Right */}
        <div>
          <h3 className="text-2xl font-bold text-[#111827] mb-3 transition-colors duration-300 group-hover:text-[#AB1EA9]">
            {service.title}
          </h3>
          <p className="text-[#111827]/80 leading-relaxed text-base transition-colors duration-300 group-hover:text-[#5B21B6]">
            {service.description}
          </p>
        </div>
      </div>
    </div>

  );
};

const Services = () => {
  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 50,
      delay: 0,
      mirror: false,
    });

    // Refresh AOS when component mounts
    AOS.refresh();
  }, []);

  // Define animations for each card position
  const getCardAnimation = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    
    // Left column cards (0, 3, 6) - animate from left to right
    if (col === 0) {
      return { type: 'fade-right', delay: 200 + (row * 100) };
    }
    // Right column cards (2, 5, 8) - animate from right to left
    else if (col === 2) {
      return { type: 'fade-left', delay: 200 + (row * 100) };
    }
    // Center column cards (1, 4, 7) - animate from bottom to top
    else {
      return { type: 'fade-up', delay: 200 + (row * 100) };
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6] relative overflow-hidden px-4 sm:px-6 lg:px-40">
      {/* Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#AB1EA9]/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#AB1EA9]/20 rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div 
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
        >
          <h2
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#AB1EA9] to-[#8B1E99] bg-clip-text text-transparent mb-6"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            SERVICES
          </h2>
          <p
            className="text-lg md:text-xl text-[#111827]/70 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="300"
          >
            Embark on your journey to success with <span className="font-semibold text-[#AB1EA9]">SS Infotech</span>,
            where we offer a comprehensive range of services to propel you towards your goals.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-40">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              animation={getCardAnimation(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div 
          className="text-center mt-20"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="500"
        >
          <a
            href="/services"
            className="inline-block bg-[#AB1EA9] text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#8B1E99]"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(171, 30, 169, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.08)';
            }}
          >
            Explore All Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;