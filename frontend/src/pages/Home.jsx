import React from "react";
import Hero from "../components/Hero";
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
      <div className="relative z-10 min-w-0">
        {/* Hero Section */}
        <Hero />

        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <ServicesSection />
        </section>

        <section>
          <AboutSection />
        </section>

        <section>
          <HeroWithLogo/>
        </section>

        <section>
          <WhyChooseUs />
        </section>

        {/* Client Logos */}
        {/* <section className="py-0 px-4 md:px-12 flex flex-col items-center justify-center space-y-12">
          <LogoSlider />
        </section> */}

        {/* Contact Form */}
        <section className="px-3 sm:px-4 md:px-12 flex flex-col items-center justify-center">
          <BrandSectionWithIcons />
        </section>
      </div>
    </div>
  );
};

export default Home;