import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaRocket,
  FaShieldAlt,
  FaMobileAlt,
  FaBrain,
  FaHeadset,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#4B0082] to-[#6A0DAD] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-16 h-16 bg-orange-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-blue-400 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-10 h-10 bg-purple-400 rounded-full blur-md"></div>
      </div>

      {/* Newsletter Section */}
      <div className="border-y border-[#201F3D] relative z-10">
        <div className="container mx-auto max-w-[1410px] grid lg:grid-cols-[1fr_400px] gap-x-8 gap-y-4 py-12 px-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] rounded-full flex items-center justify-center sm:w-14 sm:h-14 animate-pulse">
              <FaRocket className="hover:bg-[#8A2BE2] text-xl text-white" />
            </div>
            <div className="mt-1">
              <h3 className="text-2xl sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Stay Ahead With Our Updates
              </h3>
              <p className="mt-2 text-gray-300 text-sm max-w-md">
                Subscribe to our newsletter and be the first to know about cutting-edge 
                tech solutions and industry insights
              </p>
            </div>
          </div>

          {/* <form className="bg-white/10 backdrop-blur-lg rounded-2xl p-1 sm:p-2 flex gap-2 sm:gap-3 items-center border border-white/10 shadow-2xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 outline-none px-4 py-2 rounded-xl text-white bg-transparent placeholder-gray-400 text-sm"
            />
            <button
              type="submit"
              className="bg-gradient-to-r  from-[#6A0DAD] to-[#9B59B6]  text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 text-sm"
            >
              Subscribe
            </button>
          </form> */}
        </div>
      </div>

      {/* Widgets Section */}
      <div className="border-y border-[#201F3D] relative z-10">
        <div className="container mx-auto max-w-[1410px] grid lg:grid-cols-4 md:grid-cols-2 gap-8 py-12 px-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <a href="/" className="block">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] rounded-lg flex items-center justify-center">
                  <FaRocket className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  SS Infotech
                </span>
              </div>
            </a>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering businesses with innovative technology solutions that drive growth.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <ul className="space-y-2 text-sm">
              {[ 
                { icon: FaLocationDot, text: "Plot No.26, Khandwekar Bunglow, 2nd Floor,Near Lendra park, Nagpur - 440012 Maharashtra, Indi" },
                { icon: FaPhone, text: "+91 77199 27774", href: "+91 77199 27774" },
                { icon: FaEnvelope, text: "hr@ssinfotech.com", href: "hr@ssinfotech.com" },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <item.icon className="text-[#FF6B35] mt-1" />
                  {item.href ? (
                    <a href={item.href} className="text-gray-300 hover:text-white text-sm">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-300 text-sm">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Services
            </h2>
            <ul className="space-y-1 text-sm">
              {["Website Developments", "Mobile App Development", "App Development", "Machine LearninDigital Marketing", "Integration Services"].map((service, index) => (
                <li key={index}>
                  <p href="#" className="text-gray-300 hover:text-white">{service}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Posts */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              From Our Blog
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Why Your Business Needs AI", "Small Business Essentials"].map((post, index) => (
                <li key={index} className="hover:text-white">{post}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto max-w-[1410px] flex flex-col sm:flex-row justify-between items-center gap-2 py-4 px-4 text-gray-400 text-xs relative z-10">
        <p className="text-center sm:text-left">
          © 2025 <span className="text-white font-semibold">SS Infotech</span>. All rights reserved.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          {["Privacy Policy", "Terms of Service"].map((item, index) => (
            <a key={index} href="#" className="hover:text-white text-xs">{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
