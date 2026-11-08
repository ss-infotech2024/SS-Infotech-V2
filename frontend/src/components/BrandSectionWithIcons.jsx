import React from "react";
import { RiReactjsLine, RiTailwindCssFill } from "react-icons/ri";
import { FaNode, FaPython, FaJava, FaFigma } from "react-icons/fa";
import { SiExpress, SiMongodb, SiSpringboot } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { DiPostgresql } from "react-icons/di";
import { DiVisualstudio } from "react-icons/di";
import { FaChartColumn, FaDatabase, FaMagnifyingGlass, FaFileExcel } from "react-icons/fa6";
import { TbBrandReactNative } from "react-icons/tb";
import {
  SiGit,
  SiKalilinux,
  SiUbuntu,
  SiAmazonwebservices,
  SiWebgl,
  SiMeta,
  SiIntellijidea,
  SiGnometerminal,
  SiWireshark,
  SiOracle,
  SiVirtualbox,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiGooglechrome,
  SiGithub,
  SiSalesforce,
  SiAndroid,
  SiOllama,
  SiTensorflow,
  SiNumpy,
  SiPandas,
} from "react-icons/si";

const AzureMark = () => (
  <svg className="h-10 w-10 md:h-12 md:w-12" viewBox="0 0 24 24" role="img" aria-label="Microsoft Azure logo">
    <path fill="#0078D4" d="M8.1 3.2h5.1L5.6 20.8H1.2L8.1 3.2Z" />
    <path fill="#0078D4" d="M13.3 3.2 22.8 20.8H8.3l2.2-4.1h5.2L13.3 8.9l-2.2 4.2-2.1-4.2 2.3-5.7Z" />
  </svg>
);

const BrandSectionWithIcons = () => {
  const technologies = [
    {
      name: "React JS",
      icon: (
        <RiReactjsLine
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#61DBFB"
        />
      ),
    },
    {
      name: "Node JS",
      icon: (
        <FaNode
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#3C873A"
        />
      ),
    },
    {
      name: "Express JS",
      icon: (
        <SiExpress
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#000000"
        />
      ),
    },
    {
      name: "MongoDB",
      icon: (
        <SiMongodb
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#47A248"
        />
      ),
    },
    {
      name: "Tailwind CSS",
      icon: (
        <RiTailwindCssFill
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#06B6D4"
        />
      ),
    },
    {
      name: "MySQL",
      icon: (
        <GrMysql
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#00758F"
        />
      ),
    },

    {
      name: "ServiceNow",
      icon: (
        <img
          src="/servicenow.png"
          alt="ServiceNow"
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
          onError={(e) => {
            console.error("ServiceNow image not found:", e.currentTarget.src);
          }}
        />
      ),
    },

    {
      name: "PostgreSQL",
      icon: (
        <DiPostgresql
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#336791"
        />
      ),
    },
    {
      name: "Python",
      icon: (
        <FaPython
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#FFD43B"
        />
      ),
    },
    {
      name: "Java",
      icon: (
        <FaJava
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#007396"
        />
      ),
    },
    {
      name: "Spring Boot",
      icon: (
        <SiSpringboot
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#6DB33F"
        />
      ),
    },
    {
      name: "React Native",
      icon: (
        <TbBrandReactNative
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#61DBFB"
        />
      ),
    },
    {
      name: "Figma",
      icon: (
        <FaFigma
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          color="#F24E1E"
        />
      ),
    },
    { name: "Git", icon: <SiGit className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#F05032" /> },
    { name: "Kali Linux", icon: <SiKalilinux className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#557C94" /> },
    { name: "Ubuntu", icon: <SiUbuntu className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#E95420" /> },
    { name: "AWS", icon: <SiAmazonwebservices className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#232F3E" /> },
    { name: "Azure", icon: <AzureMark /> },
    { name: "VS Code", icon: <DiVisualstudio className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#007ACC" /> },
    { name: "WebGL", icon: <SiWebgl className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#990000" /> },
    { name: "Meta AI", icon: <SiMeta className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#0668E1" /> },
    { name: "IntelliJ IDEA", icon: <SiIntellijidea className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#FE315D" /> },
    { name: "Terminal", icon: <SiGnometerminal className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#4EAA25" /> },
    { name: "Nmap", icon: <FaMagnifyingGlass className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#345C8C" /> },
    { name: "Wireshark", icon: <SiWireshark className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#1679A7" /> },
    { name: "Oracle Solaris", icon: <SiOracle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#F80000" /> },
    { name: "Autopsy", icon: <FaMagnifyingGlass className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#44546A" /> },
    { name: "Oracle VirtualBox", icon: <SiVirtualbox className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#183A68" /> },
    { name: "JDBC", icon: <FaDatabase className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#E76F00" /> },
    { name: "Django", icon: <SiDjango className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#092E20" /> },
    { name: "Flask", icon: <SiFlask className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#333333" /> },
    { name: "FastAPI", icon: <SiFastapi className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#009688" /> },
    { name: "Power BI", icon: <FaChartColumn className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#F2C811" /> },
    { name: "Chromium", icon: <SiGooglechrome className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#4285F4" /> },
    { name: "GitHub", icon: <SiGithub className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#181717" /> },
    { name: "Salesforce", icon: <SiSalesforce className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#00A1E0" /> },
    { name: "Android", icon: <SiAndroid className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#3DDC84" /> },
    { name: "Excel", icon: <FaFileExcel className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#217346" /> },
    { name: "Ollama", icon: <SiOllama className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#111111" /> },
    { name: "TensorFlow", icon: <SiTensorflow className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#FF6F00" /> },
    { name: "NumPy", icon: <SiNumpy className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#013243" /> },
    { name: "Pandas", icon: <SiPandas className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" color="#150458" /> },
  ];

  // Keep enough unique cards in each row so a repeated logo never shares the viewport.
  const midpoint = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, midpoint);
  const row2 = technologies.slice(midpoint);

  return (
    <section className="section-spacing w-3/4 md:w-10/12 mt-10 md:mt-[70px] mb-10 md:mb-[70px]">
      <div className=" mx-auto  px-0 sm:px-2 animate-fade-in">
        <div className="border border-blue-500 rounded-2xl md:rounded-[30px] bg-[#EBEDF5] p-4 sm:p-6 md:p-10 lg:p-16">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Technologies We Work With
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
              We build powerful and scalable solutions using modern technologies
              and frameworks — from front-end to back-end.
            </p>
          </div>

<<<<<<< Updated upstream
          {/* === Infinite Scroll Rows === */}
          <div className="overflow-hidden space-y-3 md:space-y-4">
            {[row1, row2].map((row, i) => (
              <div
                key={i}
                className={`flex w-full gap-3 sm:gap-4 md:gap-6 ${
                  i % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"
                }`}
              >
                {row.concat(row).map((tech, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center text-center bg-white p-3 sm:p-4 md:p-5 rounded-lg md:rounded-[15px] shadow-sm min-w-[80px] sm:min-w-[100px] md:min-w-[120px] flex-shrink-0"
                  >
                    {tech.icon}
                    <div className="mt-1 md:mt-2 font-medium text-gray-800 text-xs sm:text-sm md:text-base">
                      {tech.name}
                    </div>
=======
          <div className="technology-marquees overflow-hidden space-y-3 md:space-y-4">
            {[row1, row2].map((row, i) => (
              <div
                key={i}
                className={`technology-track flex w-max ${i % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"}`}
              >
                {[0, 1].map((copy) => (
                  <div key={copy} className="technology-group flex w-max gap-3 pr-3 sm:gap-4 sm:pr-4 md:gap-6 md:pr-6" aria-hidden={copy === 1}>
                    {row.map((tech) => (
                      <div key={tech.name} className="flex min-h-[96px] min-w-[118px] shrink-0 flex-col items-center justify-center rounded-xl bg-white px-3 py-4 text-center shadow-sm sm:min-w-[132px] md:min-h-0 md:min-w-[120px] md:rounded-[15px] md:p-5 [&_svg]:h-10 [&_svg]:w-10 [&_img]:h-10 [&_img]:w-10 md:[&_svg]:h-12 md:[&_svg]:w-12 md:[&_img]:h-12 md:[&_img]:w-12">
                        {tech.icon}
                        <div className="mt-2 text-xs font-medium leading-tight text-gray-800 sm:text-sm md:text-base">{tech.name}</div>
                      </div>
                    ))}
>>>>>>> Stashed changes
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

        .technology-track {
          will-change: transform;
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
        .technology-marquees:hover .technology-track {
          animation-play-state: paused;
        }

        /* Slower animation for mobile */
        @media (max-width: 768px) {
          .animate-marquee-left, .animate-marquee-right { animation-duration: 35s; }
        }

        @media (prefers-reduced-motion: reduce) {
          .technology-track { animation: none !important; }
          .technology-group[aria-hidden="true"] { display: none; }
        }
      `}</style>
    </section>
  );
};

export default BrandSectionWithIcons;
