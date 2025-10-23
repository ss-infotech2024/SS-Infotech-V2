import React from "react";
import { RiReactjsLine, RiTailwindCssFill } from "react-icons/ri";
import { FaNode, FaPython, FaJava, FaFigma } from "react-icons/fa";
import { SiExpress, SiMongodb, SiSpringboot } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { DiPostgresql } from "react-icons/di";
import { TbBrandReactNative } from "react-icons/tb";

const BrandSectionWithIcons = () => {
  const technologies = [
    { name: "React JS", icon: <RiReactjsLine size={48} color="#61DBFB" /> },
    { name: "Node JS", icon: <FaNode size={48} color="#3C873A" /> },
    { name: "Express JS", icon: <SiExpress size={48} color="#000000" /> },
    { name: "MongoDB", icon: <SiMongodb size={48} color="#47A248" /> },
    { name: "Tailwind CSS", icon: <RiTailwindCssFill size={48} color="#06B6D4" /> },
    { name: "MySQL", icon: <GrMysql size={48} color="#00758F" /> },
    { name: "PostgreSQL", icon: <DiPostgresql size={48} color="#336791" /> },
    { name: "Python", icon: <FaPython size={48} color="#FFD43B" /> },
    { name: "Java", icon: <FaJava size={48} color="#007396" /> },
    { name: "Spring Boot", icon: <SiSpringboot size={48} color="#6DB33F" /> },
    { name: "React Native", icon: <TbBrandReactNative size={48} color="#61DBFB" /> },
    { name: "Figma", icon: <FaFigma size={48} color="#F24E1E" /> },
  ];

  // Split array into 2 for alternate rows
  const row1 = technologies.slice(0, 6);
  const row2 = technologies.slice(6);

  return (
    <section className="section-spacing bg-[#F8F9FC] mb-[70px]">
      <div className="container mx-auto max-w-[1410px] px-4 animate-fade-in">
        <div className="border border-blue-500 rounded-[30px] bg-[#EBEDF5] p-6 sm:p-10 md:p-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Technologies We Work With
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We build powerful and scalable solutions using modern technologies and frameworks — from front-end to back-end.
            </p>
          </div>

          {/* === Infinite Scroll Rows === */}
          <div className="overflow-hidden space-y-4">
            {[row1, row2].map((row, i) => (
              <div
                key={i}
                className={`flex w-full gap-6 animate-marquee-${i % 2 === 0 ? "left" : "right"}`}
              >
                {row.concat(row).map((tech, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center text-center bg-white p-5 rounded-[15px] shadow-sm min-w-[120px] flex-shrink-0"
                  >
                    {tech.icon}
                    <div className="mt-2 font-medium text-gray-800 text-sm md:text-base">{tech.name}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .animate-marquee-left {
          display: flex;
          animation: marquee-left 20s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          animation: marquee-right 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BrandSectionWithIcons;
