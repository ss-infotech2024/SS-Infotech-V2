import React, { useState } from 'react';

const SideToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <aside className={`fixed ${isOpen ? 'block' : 'hidden'} z-50`}>
        <div
          className={`side-info fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-purple-600 to-purple-700 shadow-2xl z-50 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="side-info-content p-6 h-full overflow-y-auto text-white">
            <div className="offset-widget offset-header flex justify-between items-center mb-8">
              <div className="offset-logo">
                <a href="/">
                  <img src="/assets/imgs/logo/logo.png" alt="site logo" className="h-8" />
                </a>
              </div>
              <button
                onClick={closeSidebar}
                className="side-info-close text-2xl text-white hover:text-purple-200 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="mobile-menu mb-8">
              <nav className="mobile-nav">
                <ul className="space-y-4">
                  <li>
                    <a
                      href="/"
                      className="block py-2 text-lg font-semibold text-white hover:text-purple-200 transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/pages"
                      className="block py-2 text-lg font-semibold text-white hover:text-purple-200 transition-colors"
                    >
                      Pages
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services"
                      className="block py-2 text-lg font-semibold text-white hover:text-purple-200 transition-colors"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog"
                      className="block py-2 text-lg font-semibold text-white hover:text-purple-200 transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="block py-2 text-lg font-semibold text-white hover:text-purple-200 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            
            <div className="offset-button mb-8">
              <a
                href="/contact"
                className="rr-btn inline-block bg-white text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-200 hover:text-purple-600 transition-colors"
              >
                <span className="btn-wrap">
                  <span className="text-one">Let's Talk</span>
                </span>
              </a>
            </div>
            
            <div className="offset-widget-box">
              <h2 className="title text-2xl font-bold text-white mb-6">Contact US</h2>
              <div className="contact-meta space-y-4">
                <div className="contact-item flex items-start space-x-3">
                  <span className="icon text-white mt-1">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                  <span className="text text-white">
                    1234 Elm Street, Suite 500 <br />
                    San Francisco, CA 94107
                  </span>
                </div>
                <div className="contact-item flex items-start space-x-3">
                  <span className="icon text-white mt-1">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <span className="text">
                    <a
                      href="mailto:synvo@gmail.com"
                      className="text-white hover:text-purple-200 transition-colors"
                    >
                      synvo@gmail.com
                    </a>
                  </span>
                </div>
                <div className="contact-item flex items-start space-x-3">
                  <span className="icon text-white mt-1">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <span className="text">
                    <a
                      href="tel:+1(555)123-4567"
                      className="text-white hover:text-purple-200 transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      <div
        className={`offcanvas-overlay fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      ></div>

      {/* Expose toggleSidebar for external use */}
      {/* {return { isOpen, toggleSidebar }} */}
    </>
  );
};

export default SideToggle;