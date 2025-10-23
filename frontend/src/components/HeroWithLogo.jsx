import React from "react";
import "../index.css";

const HeroWithLogo = () => {
  return (
    <section className="relative mx-10 md:mx-8 sm:mx-4 w-full   ">
      {/* Main Image Container with Wave */}
      <div className="relative">
        <img
          src="/office.jpg"
          alt="About Section"
          className="rounded-[0px] object-cover min-h-[200px] w-full  h-[750px]"
        />
        
        {/* Compressed Wave Under Image */}
        <div className="hero-wave"></div>
      </div>

      {/* Center Button Wrapper */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 translate-y-1/2">
        {/* Wrapper Background Shape */}
        <img
          src="assets/imgs/shape/shape-19.png"
          alt="Shape Background"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 transform max-w-[610px] 2xl:max-w-[450px] xl:max-w-[310px] sm:hidden"
        />

        {/* Circle Button */}
        <a
          href="about.html"
          className="relative flex items-center justify-center bg-theme text-white rounded-full w-[170px] h-[170px] 2xl:w-[140px] 2xl:h-[140px] xl:w-[100px] xl:h-[100px] hover:scale-105 transition-transform duration-300"
        >
          {/* Wave Rings */}
          <span className="wave-ring"></span>
          <span className="wave-ring"></span>
          <span className="wave-ring"></span>

          <img
            src="/logo.png"
            alt="Play Button"
            className="p-3 xl:p-2 rounded-full shadow-lg object-cover relative z-10"
          />
        </a>
      </div>
    </section>
  );
};

export default HeroWithLogo;