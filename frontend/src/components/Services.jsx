import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PiRocketLaunchLight } from "react-icons/pi";
import { FaBriefcase, FaLaptopCode, FaGlobe, FaBolt, FaBuilding } from "react-icons/fa";
import { GiTargetDummy } from "react-icons/gi";
import { MdOutlineCastForEducation, MdTrendingUp } from "react-icons/md";

const services = [
  { id: 1, title: "REAL TIME PROJECT DEVELOPMENT", description: "Build live projects with mentorship.", icon: <PiRocketLaunchLight />, color: "from-blue-400 to-cyan-400" },
  { id: 2, title: "JOBS CONSULTANT", description: "Placement guidance and resume review.", icon: <FaBriefcase />, color: "from-emerald-400 to-teal-400" },
  { id: 3, title: "CAREER CONSULTANT", description: "Career path planning and interview prep.", icon: <GiTargetDummy />, color: "from-violet-400 to-purple-400" },
  { id: 4, title: "SOFTWARE DEVELOPMENT", description: "Custom software solutions & consulting.", icon: <FaLaptopCode />, color: "from-orange-400 to-amber-400" },
  { id: 5, title: "WEBS & APP DEVELOPMENT", description: "Full-stack web & mobile apps.", icon: <FaGlobe />, color: "from-rose-400 to-pink-400" },
  { id: 6, title: "DIGITAL MARKETING", description: "SEO, Ads, and growth strategies.", icon: <MdTrendingUp />, color: "from-indigo-400 to-blue-400" },
  { id: 7, title: "ILETS/GRE/TOFEL TRAINING", description: "Exam coaching and mock tests.", icon: <MdOutlineCastForEducation />, color: "from-cyan-400 to-blue-400" },
  { id: 8, title: "CAMPUS HIRING PROGRAM", description: "Drive campus recruitment events.", icon: <FaBuilding />, color: "from-lime-400 to-green-400" },
  { id: 9, title: "TRAINING PROGRAM", description: "Skill bootcamps and workshops.", icon: <FaBolt />, color: "from-purple-400 to-pink-400" },
];

const ServiceCard = ({ service, animation }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-aos={animation.type}
      data-aos-duration="800"
      data-aos-easing="ease-out"
      data-aos-delay={animation.delay}
      className="group relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:shadow-lg border border-gray-100 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Subtle Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
      
      {/* Animated Border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-all duration-500 blur-sm`}></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Icon Container */}
        <div className="mb-5">
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:scale-110`}>
            <div className="text-2xl text-white">
              {service.icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight transition-colors duration-300 group-hover:text-gray-900">
            {service.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm transition-colors duration-300 group-hover:text-gray-700">
            {service.description}
          </p>
        </div>

        {/* Subtle Hover Indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center`}>
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Very Subtle Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>
    </div>
  );
};

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 50,
      delay: 0,
      mirror: false,
    });

    AOS.refresh();
  }, []);

  const getCardAnimation = (index) => {
    const animations = ['fade-up', 'fade-up', 'fade-up'];
    return { 
      type: animations[index % 3], 
      delay: 100 + (index * 100) 
    };
  };

  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Very Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float-soft"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200/15 rounded-full blur-3xl animate-float-soft-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-100/10 rounded-full blur-3xl animate-pulse-very-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">What We Offer</span>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Services</span>
          </h2>
          
          <div 
            className="max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              Embark on your journey to success with{" "}
              <span className="font-semibold text-blue-500">SS Infotech</span>
              , where we offer comprehensive services to propel you towards your goals.
            </p>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              animation={getCardAnimation(index)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <a
              href="/services"
              className="group relative inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-sm transition-all duration-500 hover:shadow-md hover:scale-105 border border-gray-200 hover:border-blue-200"
            >
              <span>Explore All Services</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              
              {/* Very subtle hover background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10"></div>
            </a>
            
            <p className="text-gray-500 text-sm max-w-md">
              Join thousands of successful students and professionals who transformed their careers with us
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for subtle animations */}
      <style jsx>{`
        @keyframes float-soft {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-10px) scale(1.02); 
          }
        }
        
        @keyframes float-soft-delayed {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(8px) scale(1.01); 
          }
        }
        
        @keyframes pulse-very-slow {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.15; 
            transform: scale(1.05); 
          }
        }
        
        .animate-float-soft {
          animation: float-soft 8s ease-in-out infinite;
        }
        
        .animate-float-soft-delayed {
          animation: float-soft-delayed 10s ease-in-out infinite;
        }
        
        .animate-pulse-very-slow {
          animation: pulse-very-slow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Services;