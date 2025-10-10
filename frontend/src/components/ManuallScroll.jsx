"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_HEIGHT = 180; // px
const GAP = 20; // px
const AUTOPLAY_MS = 2500;
const AUTOPLAY_RESUME_DELAY = 3000;


export default function ManualScroll() {

  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);


  // Enhanced active event detection
  const updateActiveEvent = () => {
    const container = scrollRef.current;

    if (!container || events.length === 0) return;

    
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const scrollMiddle = scrollTop + containerHeight / 2;
    let cumulativeHeight = 0;

    for (let i = 0; i < events.length; i++) {
      const eventHeight = events[i].images.length * (IMAGE_HEIGHT + GAP);
      cumulativeHeight += eventHeight;
      
      if (scrollMiddle < cumulativeHeight) {
        setActiveEventIndex(i);
        return;
      }
    }
    setActiveEventIndex(events.length - 1);
  };

  // Enhanced scroll listener
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    updateActiveEvent();

    const onScroll = () => {
      updateActiveEvent();
      isPausedRef.current = true;
      
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, AUTOPLAY_RESUME_DELAY);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);

  }, [events]);


  // Enhanced autoplay
  useEffect(() => {
    const container = scrollRef.current;

    if (!container || events.length === 0) return;


    intervalRef.current = setInterval(() => {
      if (isPausedRef.current || isHovered) return;

      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      
      if (isAtBottom) {
        container.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ top: IMAGE_HEIGHT + GAP, behavior: "smooth" });
      }
    }, AUTOPLAY_MS);

    return () => clearInterval(intervalRef.current);

  }, [isHovered, events]);

  const scrollToEvent = (index) => {
    const container = scrollRef.current;
    if (!container || events.length === 0) return;


    let targetScroll = 0;
    for (let i = 0; i < index; i++) {
      targetScroll += events[i].images.length * (IMAGE_HEIGHT + GAP);
    }

    container.scrollTo({ top: targetScroll, behavior: "smooth" });
    setActiveEventIndex(index);
    isPausedRef.current = true;
    
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, AUTOPLAY_RESUME_DELAY);
  };


  if (loading) return <div className="text-center py-10 text-gray-600">Loading events...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 120 + 30,
              height: Math.random() * 120 + 30,
              background: `linear-gradient(45deg, ${
                ['#FECACA', '#FDE68A', '#BBF7D0', '#BFDBFE'][i % 4]
              }, ${
                ['#FCA5A5', '#FCD34D', '#86EFAC', '#93C5FD'][i % 4]
              })`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Floating Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute opacity-10"
            style={{
              width: Math.random() * 80 + 20,
              height: Math.random() * 80 + 20,
              background: `linear-gradient(45deg, ${
                ['#FDBA74', '#C4B5FD', '#6EE7B7', '#93C5FD'][i % 4]
              }, ${
                ['#FB923C', '#A78BFA', '#34D399', '#60A5FA'][i % 4]
              })`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: i % 2 === 0 ? '50%' : '20%',
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          />
        ))}

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(45deg, #FEF3C7, #FECACA)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-5"
          style={{
            background: 'linear-gradient(45deg, #DBEAFE, #D1FAE5)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full opacity-30"
            style={{
              backgroundColor: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent mb-4"
            animate={{ 
              backgroundPosition: ["0%", "100%"] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Cultural Events
          </motion.h1>
          <p className="text-xl text-amber-700/80 max-w-2xl mx-auto">
            Explore the vibrant tapestry of our cultural celebrations through stunning visuals
          </p>
        </motion.div>

        <div className="flex lg:flex-row gap-8">
          {/* Left: Event Navigation & Info */}
          <div className="lg:w-2/5 space-y-6">
            {/* Event Navigation */}
            <motion.div 
              className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Events</h3>
              <div className="space-y-3">
                {events.map((event, index) => (
                  <motion.button
                    key={event.name}
                    onClick={() => scrollToEvent(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      activeEventIndex === index 
                        ? 'bg-white shadow-lg border-2' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      borderColor: activeEventIndex === index ? event.color : 'transparent',
                      color: activeEventIndex === index ? event.color : '#4B5563'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{event.name}</span>
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: event.color }}
                        animate={{ 
                          scale: activeEventIndex === index ? [1, 1.2, 1] : 1 
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.images.length} photos</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Active Event Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEventIndex}
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2 
                  className="text-3xl font-bold mb-2"
                  style={{ color: events[activeEventIndex].color }}
                >
                  {events[activeEventIndex].name}
                </motion.h2>
                <p className="text-gray-700 mb-4">
                  {events[activeEventIndex].description}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{events[activeEventIndex].images.length} Photos</span>
                  <span>•</span>
                  <span>Scroll to explore</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Scrollable Gallery */}
          <div className="lg:w-3/5">
            <motion.div
              ref={scrollRef}
              className="relative h-[600px] overflow-y-auto rounded-2xl bg-white/60 backdrop-blur-lg border border-white/50 shadow-xl p-6 scrollbar-hide"
              style={{ scrollBehavior: "smooth" }}
              onMouseEnter={() => {
                setIsHovered(true);
                isPausedRef.current = true;
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
                resumeTimeoutRef.current = setTimeout(() => { 
                  isPausedRef.current = false; 
                }, 500);
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-5">
                {events.map((event, eventIndex) =>
                  event.images.map((img, imgIndex) => {
                    const globalIndex = events
                      .slice(0, eventIndex)
                      .reduce((acc, ev) => acc + ev.images.length, 0) + imgIndex;
                    
                    return (
                      <motion.div
                        key={`${event.name}-${imgIndex}`}
                        className="relative rounded-2xl overflow-hidden group cursor-pointer transform-gpu shadow-lg"
                        style={{ height: `${IMAGE_HEIGHT}px` }}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: globalIndex * 0.1,
                          ease: "easeOut"
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {/* Image */}
                        <motion.img 
                          src={img} 
                          alt={event.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(to top, ${event.color}40, transparent 70%)`
                          }}
                        />
                        
                        {/* Event Name Overlay */}
                        <div className="absolute bottom-4 left-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span 
                            className="text-white text-sm font-semibold px-3 py-1 rounded-full backdrop-blur-md border border-white/20"
                            style={{ backgroundColor: `${event.color}CC` }}
                          >
                            {event.name}
                          </span>
                        </div>

                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.8 }}
                        />
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Scroll Progress Indicator */}
              <motion.div 
                className="fixed bottom-8 right-8 bg-white/80 backdrop-blur-lg rounded-full p-3 border border-white/50 shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="text-amber-600 text-xs text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Controls */}
            <div className="flex justify-center mt-6 space-x-4">
              <motion.button
                onClick={() => {
                  const container = scrollRef.current;
                  if (container) {
                    container.scrollBy({ top: -(IMAGE_HEIGHT + GAP), behavior: "smooth" });
                  }
                }}
                className="bg-white/80 hover:bg-white text-gray-800 px-6 py-3 rounded-xl backdrop-blur-lg border border-white/50 shadow-lg transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ↑ Previous
              </motion.button>
              
              <motion.button
                onClick={() => {
                  const container = scrollRef.current;
                  if (container) {
                    container.scrollBy({ top: IMAGE_HEIGHT + GAP, behavior: "smooth" });
                  }
                }}
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white px-6 py-3 rounded-xl backdrop-blur-lg border border-amber-300 shadow-lg transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Next ↓
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}