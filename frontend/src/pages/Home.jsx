import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import CompanyGoal from "../components/CompanyGoal";
import SsGbranch from "../components/SsGbranch";
// import BoardAdvisory from "../components/BoardAdvisory";
// import OurTeam from "../components/OurTeam";
import LogoSlider from "../components/Logoslider";
import ContactForm from "../components/ContactForm";
import Services from "../components/Services";
import AnimatedBackground from '../components/AnimatedBackground';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      
      <AnimatedBackground/>

      {/* Floating Shapes Background */}
      <div className="floating-shapes">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      {/* Soft Gradient Overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient-x"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <section className="py-16 px-4 md:px-12">
          <About />
        </section>

        {/* Company Goal Section */}
        <section className="py-16 px-20 flex flex-col items-center justify-center text-center space-y-8">
          <CompanyGoal />
        </section>

        {/* Branches Section */}
        <section className="py-16 px-4 md:px-12 flex flex-col items-center justify-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#AB1EA9]">
            Our Branches
          </h2>
          <SsGbranch/>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 md:px-12">
          <Services />
        </section>

        {/* Client Logos */}
        <section className="py-16 px-4 md:px-12 flex flex-col items-center justify-center space-y-12">
          <LogoSlider />
        </section>

        {/* Contact Form */}
        <section className="px-4 md:px-12 flex flex-col items-center justify-center">
          <ContactForm />
        </section>
      </div>
    </div>
  );
};

export default Home;