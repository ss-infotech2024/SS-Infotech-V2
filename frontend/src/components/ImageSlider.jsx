import React, { useState, useEffect } from "react";

const ImageSlider = () => {
  const images = [
    "/img/imag1.png",
    "/img/imag2.png",
    "/img/imag3.png",
    "/img/imag4.png",
    "/img/imag5.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full relative mb-8 h-[300px]">
      {/* Images with fade effect */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slider-${index}`}
          className={`rounded-2xl absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition ${
              index === currentIndex ? "bg-[#AB1EA9]" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
