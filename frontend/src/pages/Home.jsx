import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import CompanyGoal from "../components/CompanyGoal";
import SsGbranch from "../components/SsGbranch";
import BoardAdvisory from "../components/BoardAdvisory";
import OurTeam from "../components/OurTeam";
import LogoSlider from "../components/Logoslider";
import ContactForm from "../components/ContactForm";
import Services from "../components/Services";

const Home = () => {
  return (
    <div className="bg-white text-[#111827]">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="py-16 px-4 md:px-12">
        <About />
      </section>

      {/* Company Goal Section (Optional) */}
      <section className="py-16 px-20 bg-gray-50 flex flex-col items-center justify-center text-center space-y-8">
        <CompanyGoal />
      </section>

      {/* Branches Section */}
      <section className="py-16 px-4 md:px-12 bg-gray-50 flex flex-col items-center justify-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#AB1EA9]">
          Our Branches
        </h2>
        <SsGbranch/>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-12">
        <Services />
      </section>

      {/* Team & Advisory Section (Optional) */}
      {/* <section className="py-16 bg-gray-50 flex flex-col items-center justify-center text-center space-y-12">
        <OurTeam />
        <BoardAdvisory />
      </section> */}

      {/* Client Logos */}
      <section className="py-16 px-4 md:px-12 flex flex-col items-center justify-center space-y-12">
        {/* <h2 className="text-3xl md:text-4xl font-bold text-[#AB1EA9]">
          Our Clients
        </h2> */}
        <LogoSlider />
      </section>

      {/* Contact Form */}
      <section className="px-4 md:px-12 bg-gray-50 flex flex-col items-center justify-center">
        {/* <h2 className="text-3xl md:text-4xl font-bold text-[#AB1EA9] mb-8 text-center">
          Get in Touch
        </h2> */}
        <ContactForm />
      </section>
    </div>
  );
};

export default Home;
