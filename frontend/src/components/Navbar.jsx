import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaPhone } from 'react-icons/fa';
import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  { title: 'Home', link: '/' },
  { title: 'About Us', link: '/about' },
  { title: 'Services', link: '/services' },
  { title: 'Contact', link: '/contact' },
  { title: 'Careers', link: '/serach-jobs' },
  { title: 'Gallery', link: '/gallary' }
];

const MotionNavLink = motion(NavLink);

const NavItem = ({ item }) => {
  const location = useLocation();
  const isActive =
    item.link === "/"
      ? location.pathname === "/"
      : location.pathname === item.link;

  return (
    <li className="relative">
      <MotionNavLink
        to={item.link}
        className={`font-semibold transition-colors py-2 block ${
          isActive
            ? "text-purple-600"
            : "text-gray-800 hover:text-purple-600"
        }`}
        whileHover={{ scale: 1.02 }}
      >
        {item.title}
      </MotionNavLink>
    </li>
  );
};

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
  const location = useLocation();
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [barHeight, setBarHeight] = useState(72);
  const lastY = useRef(0);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setBarHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (isMobileMenuOpen || y < 40) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobileMenuOpen]);

  return (
    <>
    <div style={{ height: barHeight }} aria-hidden="true" />
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div ref={headerRef} className="bg-white px-4 lg:px-6 border-b border-gray-100 shadow-sm">
        <div className="w-full px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center py-2">
            <NavLink to="/" className="block shrink-0">
              <img
                src="/logo.png"
                alt="SS Infotech"
                className="h-14 w-auto sm:h-16 md:h-20 lg:h-24 object-contain max-w-[180px] sm:max-w-[220px] lg:max-w-[260px]"
                loading="eager"
              />
            </NavLink>

            <nav className="hidden lg:block py-2">
              <ul className="flex space-x-8 xl:space-x-10">
                {menuItems.map((item) => (
                  <NavItem key={item.title} item={item} />
                ))}
              </ul>
            </nav>

            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaPhone className="w-4 h-4 text-purple-600 scale-x-[-1]" />
                <span>
                  Call us:{" "}
                  <a
                    href="tel:+918262908256"
                    className="font-semibold hover:text-purple-600 transition-colors"
                  >
                    +91 82629 08256
                  </a>
                </span>
              </div>
            </div>

            <MobileMenuToggle onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>

      <style>{`
        .phone-menu-glass {
          background: linear-gradient(180deg, rgba(255,255,255,0.62), rgba(237,233,254,0.42));
          backdrop-filter: blur(18px) saturate(1.7);
          -webkit-backdrop-filter: blur(18px) saturate(1.7);
          border-top: 1px solid rgba(255,255,255,0.75);
          box-shadow: 0 18px 40px rgba(88, 28, 135, 0.16);
        }
      `}</style>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="phone-menu-glass lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-3 py-3 space-y-1">
              {menuItems.map((item) => {
                const isActive =
                  item.link === "/"
                    ? location.pathname === "/"
                    : location.pathname === item.link;
                return (
                  <NavLink
                    key={item.title}
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-semibold text-lg transition-colors block rounded-xl px-3 py-3 ${
                      isActive
                        ? "bg-white/75 text-purple-600 shadow-sm"
                        : "text-gray-800 hover:bg-white/45 hover:text-purple-600"
                    }`}
                  >
                    {item.title}
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
};

export default Navbar;
