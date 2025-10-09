<<<<<<< HEAD
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function GalleryParallax({
  title = "College Visits",
  description = "Capturing memorable moments from our college visits that inspire collaboration and knowledge sharing.",
=======
// components/GalleryParallax.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * GalleryParallax Component
 * @param {Object} props
 * @param {Array} props.images - Array of image objects {title, link, thumbnail, category}
 * @param {string} props.title - Section title
 * @param {string} props.description - Section description
 */
export default function GalleryParallax({ 
  images = [], 
  title = "Collage Visits",
  description = "Capturing memorable moments from our college visits that inspire collaboration and knowledge sharing."
>>>>>>> af26607 ( Internship Offer Letter)
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

<<<<<<< HEAD
  // Smooth horizontal scroll animation
  const xRange = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const xSpring = useSpring(xRange, { stiffness: 100, damping: 30 });

  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch images properly
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/gallery/gallery-img");
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        console.log("API Response:", data);

        // ✅ Normalize backend data
        const images =
          Array.isArray(data)
            ? data
            : Array.isArray(data.galleryImages)
            ? data.galleryImages
            : [];

        setGalleryImages(images);
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryImages();
  }, []);

  // ✅ Color palette for categories
  const colors = {
    primary: "#3B82F6",
    secondary: "#10B981",
    accent: "#F59E0B",
    highlight: "#EF4444",
    neutral: "#6B7280",
  };

  const getCategoryColor = (category, index) => {
    const map = {
=======
  // Enhanced parallax effects with smoother transitions
  const xRange = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const rotateRange = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.9, 1], [1, 0.9, 0.3]);
  const scaleRange = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);
  const yRange = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Interactive color palette
  const colors = {
    primary: "#3B82F6",    // Blue
    secondary: "#10B981",  // Emerald
    accent: "#F59E0B",     // Amber
    highlight: "#EF4444",  // Red
    neutral: "#6B7280"     // Gray
  };

  const getCategoryColor = (category, index) => {
    const colorMap = {
>>>>>>> af26607 ( Internship Offer Letter)
      Nature: colors.secondary,
      Forest: colors.secondary,
      Ocean: colors.primary,
      Urban: colors.neutral,
      Sunset: colors.accent,
<<<<<<< HEAD
    };
    return map[category] || [colors.primary, colors.secondary, colors.accent, colors.highlight][index % 4];
  };

  // ✅ Precompute Y-transforms (Fix Hook Order)
  const transforms = galleryImages.map((_, index) => {
    const isEven = index % 2 === 0;
    const yRange = useTransform(scrollYProgress, [0, 1], ["0%", `${isEven ? -5 : 5}%`]);
    const ySpring = useSpring(yRange, { stiffness: 100, damping: 30 });
    return { ySpring, isEven };
  });

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
=======
      Winter: colors.primary,
      Desert: colors.accent,
      Aurora: colors.primary,
      Beach: colors.accent,
      Mountains: colors.secondary
    };
    
    return colorMap[category] || [colors.primary, colors.secondary, colors.accent, colors.highlight][index % 4];
  };

  // Default images if none provided
  const defaultImages = [
    {
      title: "Mountain Landscape",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=320&h=240&fit=crop",
      category: "Nature"
    },
    {
      title: "Forest Pathway",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=320&h=240&fit=crop",
      category: "Forest"
    },
    {
      title: "Ocean View",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=320&h=240&fit=crop",
      category: "Ocean"
    },
    {
      title: "City Lights",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=320&h=240&fit=crop",
      category: "Urban"
    },
    {
      title: "Sunset Colors",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=320&h=240&fit=crop",
      category: "Sunset"
    },
    {
      title: "Winter Wonderland",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=320&h=240&fit=crop",
      category: "Winter"
    },
    {
      title: "Desert Dunes",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=320&h=240&fit=crop",
      category: "Desert"
    },
    {
      title: "Northern Lights",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=320&h=240&fit=crop",
      category: "Aurora"
    },
    {
      title: "Tropical Beach",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=320&h=240&fit=crop",
      category: "Beach"
    },
    {
      title: "Misty Mountains",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1464822759844-d62ed505c4ce?w=320&h=240&fit=crop",
      category: "Mountains"
    }
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  return (
    <section 
      ref={ref} 
      className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Background decorative elements with interactive colors */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div 
>>>>>>> af26607 ( Internship Offer Letter)
          className="text-center mb-12 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-600 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

<<<<<<< HEAD
        {/* Gallery */}
        <div className="relative h-80 lg:h-[450px] overflow-hidden">
          <motion.div
            className="flex gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2"
            style={{ x: xSpring }}
          >
            {loading ? (
              <p className="text-center text-gray-500">Loading images...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : galleryImages.length > 0 ? (
              galleryImages.map((image, index) => {
                const { ySpring, isEven } = transforms[index];
                const categoryColor = getCategoryColor(image.category, index);

                return (
                  <motion.div
                    key={image._id || index}
                    className="group relative block w-48 lg:w-56 h-60 lg:h-64 rounded-xl overflow-hidden transition-all duration-500 hover:z-20 shadow-lg hover:shadow-xl"
                    style={{ y: ySpring }}
                    whileHover={{
                      scale: 1.08,
                      rotate: 0,
                      transition: { type: "spring", stiffness: 150, damping: 20 },
                    }}
                    initial={{ opacity: 0, y: 60, rotate: isEven ? 2 : -2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: isEven ? 2 : -2 }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full h-2/3 overflow-hidden">
                      <motion.img
                        src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(to top, ${categoryColor}40, transparent 70%)`,
                        }}
                      />
                      <div className="absolute top-3 left-3 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span
                          className="text-xs font-semibold text-white px-2 py-1 rounded-full backdrop-blur-sm"
                          style={{ backgroundColor: `${categoryColor}CC` }}
                        >
                          {image.category}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-br from-slate-800 to-slate-900 p-3 flex items-center group-hover:bg-slate-700 transition-colors duration-300">
                      <h3 className="text-white font-semibold text-sm lg:text-base leading-tight group-hover:text-white/90 transition-colors duration-300">
                        {image.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">No images found</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
=======
        {/* Parallax Gallery Container */}
        <div className="relative h-80 lg:h-[450px]">
          <motion.div
            className="flex gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2"
            style={{
              x: xRange,
              scale: scaleRange,
              y: yRange,
            }}
          >
            {galleryImages.map((image, index) => {
              const categoryColor = getCategoryColor(image.category, index);
              const isEven = index % 2 === 0;
              
              return (
                <motion.a
                  key={image.title + index}
                  href={image.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block w-48 lg:w-56 h-60 lg:h-64 rounded-xl overflow-hidden transition-all duration-500 hover:z-20 shadow-lg hover:shadow-xl"
                  style={{ 
                    rotate: rotateRange, 
                    opacity: opacityRange,
                    rotate: isEven ? 2 : -2
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    rotate: 0,
                    transition: { 
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  initial={{ opacity: 0, y: 60, rotate: isEven ? 5 : -5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: isEven ? 2 : -2 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.08,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-2/3 overflow-hidden">
                    <motion.img
                      src={image.thumbnail}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, ${categoryColor}40, transparent 70%)`
                      }}
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span 
                        className="text-xs font-semibold text-white px-2 py-1 rounded-full backdrop-blur-sm"
                        style={{ backgroundColor: `${categoryColor}CC` }}
                      >
                        {image.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div 
                    className="absolute bottom-0 w-full h-1/3 bg-gradient-to-br from-slate-800 to-slate-900 p-3 flex items-center group-hover:bg-slate-700 transition-colors duration-300"
                  >
                    <h3 className="text-white font-semibold text-sm lg:text-base leading-tight group-hover:text-white/90 transition-colors duration-300">
                      {image.title}
                    </h3>
                  </div>

                  {/* Interactive Border Glow */}
                  <div 
                    className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"
                    style={{
                      boxShadow: "inset 0 0 0 1px transparent"
                    }}
                  />
                  
                  {/* Hover Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${categoryColor}20, transparent 70%)`,
                      boxShadow: `0 0 40px ${categoryColor}40`
                    }}
                  />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            View Full Gallery
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
>>>>>>> af26607 ( Internship Offer Letter)
