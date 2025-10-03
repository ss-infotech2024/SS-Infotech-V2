import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    // { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact" },
    { path: "/serach-jobs", label: "Careers" },
    // { path: "/training", label: "Training" },
    // { path: "/placements", label: "Placements" }
     { path: "/gallary", label: "Gallary" }

  ];

  return (
  // border-[#1E245C]( 
    <nav className="bg-white text-[#1E245C] px-4 sm:px-6 lg:px-8 py-3 border-b-2  sticky top-0 z-50 shadow-md"> 
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img
            src="/public/logo.png"
            alt="SS Infotech Logo"
            className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 xl:h-32 object-contain max-w-[200px] sm:max-w-[250px] lg:max-w-[300px]"
            onError={(e) => (e.target.style.display = "none")} // Hide broken image
          />
          
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-4 xl:space-x-6">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#1E245C] text-white"
                      : "text-[#1E245C] hover:bg-[#1E245C] hover:text-white border border-transparent hover:border-[#1E245C]"
                  }`
                }
                aria-label={link.label}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md bg-[#1E245C] text-white hover:bg-[#3B4A9F] transition-colors duration-200"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white border-t border-[#1E245C]/20 px-4 py-6">
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#1E245C] text-white"
                        : "text-[#1E245C] hover:bg-[#1E245C] hover:text-white border border-[#1E245C]/20 hover:border-[#1E245C]"
                    }`
                  }
                  aria-label={link.label}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;