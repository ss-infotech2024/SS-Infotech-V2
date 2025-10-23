import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaBars, FaPhone } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

// Data-driven approach for menu structure
const menuItems = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'About Us',
    link: '/about'
  },
  {
    title: 'Services',
    link: '/services'
  },
  {
    title: 'Contact',
    link: '/contact'
  },
  {
    title: 'Careers',
    link: '/serach-jobs'
  },
  {
    title: 'Gallery',
    link: '/gallary'
  }
];

const socialLinks = [
  {
    name: 'Facebook',
    icon: FaFacebook,
    href: 'https://www.facebook.com/',
    color: 'hover:text-blue-400'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    href: 'https://x.com/',
    color: 'hover:text-blue-400'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/',
    color: 'hover:text-blue-400'
  }
];

// Reusable Social Link Component
const SocialLink = ({ social }) => {
  const IconComponent = social.icon;
  return (
    <motion.a
      href={social.href}
      className={`flex items-center space-x-2 transition-colors text-sm ${social.color}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Visit our ${social.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconComponent className="w-4 h-4" />
      <span className="font-semibold">{social.name}</span>
    </motion.a>
  );
};

// Navigation Item Component
const MotionNavLink = motion(NavLink);

const NavItem = ({ item }) => (
  <li className="relative">
    <MotionNavLink
      to={item.link}
      className={({ isActive }) =>
        `font-semibold transition-colors py-2 block ${isActive ? 'text-purple-600' : 'text-gray-800 hover:text-purple-600'}`
      }
      whileHover={{ color: '#7c3aed', scale: 1.02 }}
    >
      {item.title}
    </MotionNavLink>
  </li>
);

// Top Bar Component
const TopBar = () => (
  <motion.div 
    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 lg:px-6 rounded-b-full shadow-lg"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-full px-4 lg:px-6 py-2">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        {/* <div className="header-note flex items-center space-x-3">
          <motion.span 
            className="title font-bold text-purple-200 bg-purple-800 px-3 py-1 rounded-full text-xs"
            whileHover={{ scale: 1.05 }}
          >
            Update:
          </motion.span>
          <p className="text-sm text-white/90">
            Sign Up and Receive up to 20% bonus discount on checkout
          </p>
        </div> */}
        <div className="header-social flex space-x-6">
          {socialLinks.map((social, index) => (
            <SocialLink key={social.name} social={social} />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Mobile Menu Toggle Component
const MobileMenuToggle = ({ onClick }) => (
  <motion.button
    className="lg:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    aria-label="Toggle mobile menu"
  >
    <FaBars className="w-6 h-6" />
  </motion.button>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Top Bar (non-sticky) */}
      <TopBar />

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <motion.div 
          className="bg-white px-4 lg:px-6 border-b border-gray-100"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="w-full px-4 lg:px-6">
            <div className="flex justify-between items-center py-3">
              
              {/* Logo */}
              <motion.div 
                className="header-logo"
                whileHover={{ scale: 1.05 }}
              >
                <NavLink to="/" className="block">
                  <img 
                    src="/public/logo.png" 
                    alt="SS Infotech Logo" 
                    className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 xl:h-32 object-contain max-w-[200px] sm:max-w-[250px] lg:max-w-[300px]"
                    loading="eager"
                  />
                </NavLink>
              </motion.div>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:block py-2">
                <ul className="flex space-x-8 xl:space-x-10">
                  {menuItems.map((item, index) => (
                    <NavItem
                      key={item.title}
                      item={item}
                    />
                  ))}
                </ul>
              </nav>
              
              {/* CTA Section */}
              <div className="hidden md:flex items-center space-x-6">
                <motion.div 
                  className="call-box flex items-center space-x-2 text-gray-700"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaPhone className="w-4 h-4 text-purple-600" />
                  <span>
                    Call us: {' '}
                    <a 
                      href="tel:+25862323258" 
                      className="font-semibold hover:text-purple-600 transition-colors"
                    >
                      +91 93993 45989
                    </a>
                  </span>
                </motion.div>
                
                {/* <motion.button
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button> */}
              </div>
              
              {/* Mobile Menu Toggle */}
              <MobileMenuToggle onClick={toggleMobileMenu} />
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-gray-200 shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {menuItems.map((item, index) => (
                  <div key={item.title} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <NavLink
                      to={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `font-semibold text-gray-800 text-lg hover:text-purple-600 transition-colors block ${isActive ? 'text-purple-600' : ''}`
                      }
                    >
                      {item.title}
                    </NavLink>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;