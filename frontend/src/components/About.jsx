import React, { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faStar, faLightbulb, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const About = () => {
  const [hovered, setHovered] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  
  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in ms
      easing: 'ease-out', // Smooth easing
      once: true, // Animate only once (better performance)
      offset: 100, // Trigger 100px before element enters viewport
      delay: 100, // Base delay for staggered effects
    });
  }, []);

  const cardDetails = {
    education: {
      title: "Education",
      desc: "We believe education drives growth. By empowering learners, we open doors to academic and professional excellence.",
      img: "/img/edu1.jpg",
      icon: faAward,
    },
    training: {
      title: "Training",
      desc: "Our training programs are designed to prepare individuals with hands-on skills and industry-ready expertise.",
      img: "/img/edu2.jpg",
      icon: faStar,
    },
    innovation: {
      title: "Innovation",
      desc: "We foster creativity and encourage innovation that aligns with modern business and technology needs.",
      img: "/img/edu3.jpg",
      icon: faLightbulb,
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/30">
<<<<<<< HEAD
      <div className="py-12 flex md:flex-row justify-between gap-12 max-w-7xl mx-auto">
=======
      <div className="px-12 py-12 md:px-24 flex md:flex-row justify-between gap-12 max-w-7xl mx-auto">
>>>>>>> af26607 ( Internship Offer Letter)
        {/* Left Div - Animate from left */}
        <div 
          className="md:w-1/2 flex flex-col justify-center transition-all duration-500 bg-white px-8 py-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md"
          data-aos="fade-right" // AOS: Fade in from right
          data-aos-duration="800"
        >
          {!hovered && (
            <div className="transition-opacity duration-500 ease-in-out">
              <div className="flex items-center gap-3 mb-6" data-aos="fade-up" data-aos-delay="0">
                <div className="w-2 h-10 bg-gradient-to-b from-[#AB1EA9] to-purple-600 rounded-full"></div>
                <h1 className="text-4xl font-bold text-[#111827]">About Us</h1>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-gray-700 text-justify" data-aos="fade-up" data-aos-delay="200">
                SS Infotech, where innovation meets excellence in the realm of IT solutions.
              </p>
              <p className="mb-8 text-gray-600 leading-relaxed text-justify" data-aos="fade-up" data-aos-delay="400">
                SS Infotech is a premier software organization with strategic presence in Pune and Nagpur, dedicated to delivering cutting-edge IT solutions and digital marketing services. We specialize in transforming business visions into digital reality through our comprehensive suite of services.
              </p>
              <button 
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#AB1EA9] to-purple-600 text-white font-medium rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 w-fit"
                data-aos="fade-up" 
                data-aos-delay="600"
              >
                Learn More
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="transform group-hover:translate-x-1 transition-transform duration-300" 
                  size="sm" 
                />
              </button>
            </div>
          )}

          {hovered && (
            <div 
              className="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl"
              data-aos="zoom-in" // AOS: Zoom in for the detailed card (enhances hover reveal)
              data-aos-duration="600"
            >
              <div className="w-full h-48 md:h-56 overflow-hidden">
                <img
                  src={cardDetails[hovered].img}
                  alt={cardDetails[hovered].title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col items-start">
                <div className="flex items-center gap-4 mb-4" data-aos="fade-left" data-aos-delay="100">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#AB1EA9]/10 to-purple-100 shadow-sm">
                    <FontAwesomeIcon icon={cardDetails[hovered].icon} size="lg" className="text-[#AB1EA9]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827]">
                    {cardDetails[hovered].title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4" data-aos="fade-up" data-aos-delay="200">
                  {cardDetails[hovered].desc}
                </p>
                <button 
                  className="flex items-center gap-2 text-[#AB1EA9] font-medium hover:text-purple-700 transition-colors duration-300 group"
                  data-aos="fade-up" 
                  data-aos-delay="300"
                >
                  Read more
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="transform group-hover:translate-x-1 transition-transform duration-300" 
                    size="sm" 
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Div - Animate from right */}
        <div 
          className="md:w-1/2 flex flex-col items-center bg-white px-6 py-8 rounded-3xl shadow-sm border border-gray-100"
          data-aos="fade-left" // AOS: Fade in from left
          data-aos-duration="800"
        >
          <div className="w-full mb-8" data-aos="fade-up" data-aos-delay="200">
            <ImageSlider />
          </div>
          
<<<<<<< HEAD
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-96 h-32">
=======
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
>>>>>>> af26607 ( Internship Offer Letter)
            {/* Education Card - Staggered fade-up */}
            <div
              onMouseEnter={() => setHovered("education")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActiveCard(activeCard === "education" ? null : "education")}
              className={`relative p-6 rounded-2xl shadow-sm border border-gray-200 group cursor-pointer overflow-hidden transition-all duration-300 ${
                hovered === "education" || activeCard === "education" 
                  ? "bg-gradient-to-br from-[#AB1EA9]/5 to-purple-50 border-[#AB1EA9]/30 shadow-md transform -translate-y-2" 
                  : "bg-white hover:bg-gray-50 hover:shadow-md hover:-translate-y-1"
              } flex flex-col items-center justify-center text-center`}
              data-aos="fade-up" // AOS: Fade up
              data-aos-delay="400" // Delay for staggering
            >
              <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${
                hovered === "education" || activeCard === "education" 
                  ? "bg-gradient-to-br from-[#AB1EA9] to-purple-600 shadow-lg" 
                  : "bg-gray-100"
              }`}>
                <FontAwesomeIcon 
                  icon={faAward} 
                  size="2x" 
                  className={hovered === "education" || activeCard === "education" ? "text-white" : "text-[#AB1EA9]"} 
                />
              </div>
              <h3 className={`font-semibold text-lg transition-colors duration-300 ${
                hovered === "education" || activeCard === "education" ? "text-[#AB1EA9]" : "text-[#111827]"
              }`}>
                Education
              </h3>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#AB1EA9] to-purple-600 transform origin-left transition-transform duration-300 ${
                hovered === "education" || activeCard === "education" ? "scale-x-100" : "scale-x-0"
              }`}></div>
            </div>

            {/* Training Card - Staggered fade-up */}
            <div
              onMouseEnter={() => setHovered("training")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActiveCard(activeCard === "training" ? null : "training")}
              className={`relative p-6 rounded-2xl shadow-sm border border-gray-200 group cursor-pointer overflow-hidden transition-all duration-300 ${
                hovered === "training" || activeCard === "training" 
                  ? "bg-gradient-to-br from-[#FFB347]/10 to-orange-50 border-[#FFB347]/30 shadow-md transform -translate-y-2" 
                  : "bg-white hover:bg-gray-50 hover:shadow-md hover:-translate-y-1"
              } flex flex-col items-center justify-center text-center`}
              data-aos="fade-up"
              data-aos-delay="600" // Increased delay for middle card
            >
              <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${
                hovered === "training" || activeCard === "training" 
                  ? "bg-gradient-to-br from-[#FFB347] to-orange-400 shadow-lg" 
                  : "bg-gray-100"
              }`}>
                <FontAwesomeIcon 
                  icon={faStar} 
                  size="2x" 
                  className={hovered === "training" || activeCard === "training" ? "text-white" : "text-[#FFB347]"} 
                />
              </div>
              <h3 className={`font-semibold text-lg transition-colors duration-300 ${
                hovered === "training" || activeCard === "training" ? "text-[#FFB347]" : "text-[#111827]"
              }`}>
                Training
              </h3>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFB347] to-orange-400 transform origin-left transition-transform duration-300 ${
                hovered === "training" || activeCard === "training" ? "scale-x-100" : "scale-x-0"
              }`}></div>
            </div>

            {/* Innovation Card - Staggered fade-up */}
            <div
              onMouseEnter={() => setHovered("innovation")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActiveCard(activeCard === "innovation" ? null : "innovation")}
              className={`relative p-6 rounded-2xl shadow-sm border border-gray-200 group cursor-pointer overflow-hidden transition-all duration-300 ${
                hovered === "innovation" || activeCard === "innovation" 
                  ? "bg-gradient-to-br from-[#AB1EA9]/5 to-purple-50 border-[#AB1EA9]/30 shadow-md transform -translate-y-2" 
                  : "bg-white hover:bg-gray-50 hover:shadow-md hover:-translate-y-1"
              } flex flex-col items-center justify-center text-center`}
              data-aos="fade-up"
              data-aos-delay="800" // Highest delay for last card (stagger effect)
            >
              <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${
                hovered === "innovation" || activeCard === "innovation" 
                  ? "bg-gradient-to-br from-[#AB1EA9] to-purple-600 shadow-lg" 
                  : "bg-gray-100"
              }`}>
                <FontAwesomeIcon 
                  icon={faLightbulb} 
                  size="2x" 
                  className={hovered === "innovation" || activeCard === "innovation" ? "text-white" : "text-[#AB1EA9]"} 
                />
              </div>
              <h3 className={`font-semibold text-lg transition-colors duration-300 ${
                hovered === "innovation" || activeCard === "innovation" ? "text-[#AB1EA9]" : "text-[#111827]"
              }`}>
                Innovation
              </h3>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#AB1EA9] to-purple-600 transform origin-left transition-transform duration-300 ${
                hovered === "innovation" || activeCard === "innovation" ? "scale-x-100" : "scale-x-0"
              }`}></div>
            </div>
          </div>

          {/* CTA Button - Fade up from below */}
          <button 
<<<<<<< HEAD
            className="mt-5 group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FFB347] to-orange-400 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 w-full max-w-xs justify-center"
=======
            className="mt-10 group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FFB347] to-orange-400 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 w-full max-w-xs justify-center"
>>>>>>> af26607 ( Internship Offer Letter)
            data-aos="fade-up"
            data-aos-delay="1000" // Delay after cards
          >
            Get Started
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="transform group-hover:translate-x-1 transition-transform duration-300" 
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;
