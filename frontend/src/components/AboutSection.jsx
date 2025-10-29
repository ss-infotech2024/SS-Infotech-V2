import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import '../index.css';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const floatingRef = useRef(null);
  const bgRevealRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const floatingEl = floatingRef.current;
    
    if (!sectionEl || !floatingEl) return;

    let started = false;
    let animationFrameId;
    

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !started) {
          started = true;
          setIsRevealed(true);
        }
      },
      { root: null, threshold: 0.3 }
    );
    io.observe(sectionEl);

    const factor = 0.2;
    const onScroll = () => {
      if (!started) return;
      
      animationFrameId = requestAnimationFrame(() => {
        const rect = sectionEl.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate how far through the section we've scrolled
        const scrollProgress = Math.max(0, Math.min(1, 
          (windowHeight - sectionTop) / (windowHeight + sectionHeight)
        ));
        
        // Apply parallax effect - moves up when scrolling down
        const parallaxY = scrollProgress * 100;
        floatingEl.style.transform = `translateY(${parallaxY}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial call
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-area py-20 lg:py-28 relative overflow-hidden bg-white px-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="about-area-inner grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Background Photo with Reveal Animation */}
          <motion.div 
            className="about-image-side relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Image Container with Reveal */}
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              {/* Background Image with Clip Path Reveal */}
              <motion.div 
                className="w-full h-full lg:h-[600px] bg-gray-200 relative overflow-hidden"
                initial={{ clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' }}
                animate={isRevealed ? { 
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                } : {}}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut",
                  delay: 0.3 
                }}
              >
                <img
                  src="/employe.jpg"
                  alt="About our company"
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-30"></div>
              </motion.div>

              {/* Experience Badge Overlay */}
              <motion.div 
                className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              >
                {/* <div className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-blue-600">25</span>
                    <div>
                      <p className="text-lg font-bold text-gray-900">Years Of</p>
                      <p className="text-blue-600 font-semibold">Experience</p>
                    </div>
                  </div>
                </div> */}
              </motion.div>
            </div>

            {/* Floating Image with Parallax */}
            <motion.div
              ref={floatingRef}
              className="absolute -bottom-8 -right-8 w-48 h-48 lg:w-56 lg:h-56 border-8 border-white rounded-2xl shadow-2xl overflow-hidden z-20 will-change-transform mb-[20px]"
              initial={{ scale: 0, rotate: 10, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3, 
                delay: 0.9,
                type: "spring",
                stiffness: 100
              }}
              
            >
              <img
                src="/director.jpg"
                alt="Business consulting"
                className="w-full h-full object-cover"
              />
              
              {/* Trust Badge */}
              <motion.div 
                className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.6 }}
              >
                Trusted
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-xl"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
            <motion.div 
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-600/10 rounded-full blur-xl"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
            />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Heading */}
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Make Sure Your Objectives<br />
              <span className="text-gradient-to-r from-purple-600 to-purple-700">Improves Profit</span> Drivers
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We envision a future where our clients are at the forefront of their industries, 
              setting new standards of excellence through the transformative power of our 
              consulting services.
            </motion.p>

            {/* Features */}
            <div className="space-y-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
                  Improving Your Business Planning
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We envision a future where our clients are at the forefront of their industries, 
                  setting new standards of excellence.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
                  Make Sure You Can Evaluate Success
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We envision a future where our clients are at the forefront of their industries, 
                  setting new standards of excellence.
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.a
                href="/services"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#2563eb'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Take Our Service
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Additional Background Elements */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-20 w-60 h-60 bg-purple-600/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
    </section>
  );
};

export default AboutSection;