// CirBranch.jsx
import React, { useState, useEffect, useRef } from "react";

export default function SsGbranch() {
  const [hovered, setHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const containerRef = useRef(null);

  const branches = [
    { label: "SS Educational Consultancy Services", icon: "/images/ss_group.png" },
    { label: "SS Infotech", icon: "/images/ss_infotech.png" },
    { label: "SS Overseas Education", icon: "/images/ss_overseas_education.png" },
    { label: "SS Career Counseling Centre", icon: "/images/s2s.png" },
    { label: "SS Foundation", icon: "/images/ss_foundation.png" },
  ];

  const angles = branches.map((_, i) => i * (360 / branches.length));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowHint(true);
            setTimeout(() => setShowHint(false), 3000);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center relative min-h-[510px]"
    >
      {/* Orbit animation */}
      <style>{`
        @keyframes spinSlow { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        .spin-slow { animation: spinSlow 12s linear infinite; }
      `}</style>

      <div className="relative w-screen h-[500px] flex items-center justify-center">
        {/* Orbit container */}
        <div className={`${hovered ? "spin-slow" : ""} absolute inset-0`}></div>

        {/* Orbiting branches with icons outside rectangles */}
        {angles.map((angle, idx) => {
          const distance = 220;
          const transformWhenHovered = `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px) rotate(-${angle}deg)`;
          const transformWhenIdle = `translate(-50%, -50%)`;

          return (
            <div
              key={idx}
              className={`absolute left-1/2 top-1/2 transition-all duration-700 ease-out 
                ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
              style={{ transform: hovered ? transformWhenHovered : transformWhenIdle }}
            >
              <div className="flex flex-col items-center">
                {/* Icon outside rectangle */}
                {branches[idx].icon && (
                  <img
                    src={branches[idx].icon}
                    alt={branches[idx].label}
                    className="w-16 h-16 object-contain mb-2"
                  />
                )}
                {/* Rectangle with label only */}
                <div className="px-3 py-1 rounded-xl shadow-md bg-white text-[#111827] font-semibold text-sm text-center">
                  {branches[idx].label}
                </div>
              </div>
            </div>
          );
        })}

        {/* Center circle */}
        <div className="relative z-20 flex items-center justify-center w-screen">
          <div
            className={`transition-all duration-500 ease-in-out 
            w-full h-96 flex items-center justify-center cursor-pointer select-none`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setHovered(false)}
          >
            {/* Inner dark circle with logo */}
            <div className="w-40 h-40 rounded-full bg-[#111827] flex items-center justify-center">
              <img
                src="/images/ss_group.png"
                alt="S S Group"
                className="w-28 h-28 object-contain rounded-full"
              />
            </div>  
          </div>
        </div>
      </div>

      {/* Popup hint */}
      {showHint && (
        <div className="absolute bottom-6 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-md animate-fadeIn">
          Hover or tap the circle to expand
        </div>
      )}
    </div>
  );
}
