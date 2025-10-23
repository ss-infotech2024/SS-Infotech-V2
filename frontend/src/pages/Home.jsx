import React from "react";
import Hero from "../components/Hero";
import SsGbranch from "../components/SsGbranch";
// import BoardAdvisory from "../components/BoardAdvisory";
// import OurTeam from "../components/OurTeam";
import LogoSlider from "../components/Logoslider";
import ContactForm from "../components/ContactForm";
import Services from "../components/Services";
// import AnimatedBackground from '../components/AnimatedBackground';
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import HeroWithLogo from "../components/HeroWithLogo";
import WhyChooseUs from "../components/WhyChooseUs";
import BrandSectionWithIcons from "../components/BrandSectionWithIcons";
const Home = () => {
  return (
    <div className="relative min-h-screen">
      
    
      
      {/* Soft Gradient Overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient-x"></div>
      
      {/* Content */}
      <div className="relative z-10 ">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <section className=" px-4 mx-[-16px]   md:px-12  bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ">
          <ServicesSection />
        </section>

        {/* Company Goal Section */}
        <section className="py-0 px-20 flex flex-col items-center justify-center text-center space-y-8  ">
          <AboutSection />
        </section>

        {/* Branches Section */}
        <section className="py-0 mx-[-16px] px-4 md:px-12 flex flex-col items-center justify-center space-y-12 ">
         
          <HeroWithLogo/>
        </section>

        {/* Services Section */}
        <section className="py-0 px-4 md:px-12 mx-[-16px]">
          <WhyChooseUs />
        </section>

        {/* Client Logos */}
        <section className="py-0 px-4 md:px-12 flex flex-col items-center justify-center space-y-12">
          <LogoSlider />
        </section>

        {/* Contact Form */}
        <section className="px-4 md:px-12 flex flex-col items-center justify-center">
          <BrandSectionWithIcons />
        </section>
      </div>
    </div>
  );
};

export default Home;