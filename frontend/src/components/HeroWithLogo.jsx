import React from "react";
import "../index.css";

const HeroWithLogo = () => {
  return (
    <section className="relative w-full max-w-full pb-10 sm:pb-16">
      <div className="relative overflow-hidden">
        <img
          src="/office.png"
          alt="SS Infotech office"
          className="w-full h-[220px] sm:h-[360px] md:h-[480px] lg:h-[620px] object-cover object-center"
        />
        <div className="hero-wave"></div>
      </div>

      <div className="absolute bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 translate-y-1/2">
        {/* Wrapper Background Shape */}
        <img
          src="assets/imgs/shape/shape-19.png"
          alt="Shape Background"
          className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 max-w-[280px] lg:max-w-[360px]"
        />

        {/* Circle Button */}
        <a
          href="/about"
          className="relative flex items-center justify-center bg-theme text-white rounded-full w-[84px] h-[84px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px] hover:scale-105 transition-transform duration-300"
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