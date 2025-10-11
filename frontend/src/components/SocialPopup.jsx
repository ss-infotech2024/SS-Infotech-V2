import React from "react";
import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";

export default function SocialPopup() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram size={28} color="#E1306C" />,
      url: "https://www.instagram.com/ss.infotech_?igsh=MTJvNHVqdGZ0aXM2bA==",
      label: "SS Infotech Instagram",
      color: "#E1306C", // Instagram pink
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={28} color="#25D366" />,
      url: "https://wa.link/rck1ie",
      label: "SS Infotech WhatsApp",
      color: "#25D366", // WhatsApp green
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={28} color="#0077B5" />,
      url: "https://www.linkedin.com/company/ss-infotech-co/",
      label: "SS Infotech LinkedIn",
      color: "#0077B5", // LinkedIn blue
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[999]">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300"
        >
          {social.icon}

          {/* Tooltip */}
          <span
            className="absolute right-full mr-3 hidden group-hover:flex whitespace-nowrap bg-white text-sm px-3 py-1 rounded-lg shadow-lg"
            style={{ color: social.color }}
          >
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
}
