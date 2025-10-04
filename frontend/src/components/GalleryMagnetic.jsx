// components/GalleryMagnetic.jsx
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export default function GalleryMagnetic({ 
  images = [], 
  title = "Seminars",
  description = "A glimpse into our engaging seminars where experts share knowledge, inspire ideas, and encourage innovation."
}) {
  const [activeCard, setActiveCard] = useState(null);

  const colors = {
    primary: "#6366F1",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    highlight: "#10B981",
    glow: "#F59E0B"
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      Nature: colors.highlight,
      Forest: colors.highlight,
      Ocean: colors.accent,
      Urban: colors.primary,
      Sunset: colors.glow,
      Winter: colors.accent,
      Desert: colors.glow,
      Aurora: colors.secondary,
      Beach: colors.accent,
      Mountains: colors.primary
    };
    return colorMap[category] || colors.primary;
  };

  const defaultImages = [
    {
      title: "Cosmic Mountains",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
      category: "Mountains"
    },
    {
      title: "Enchanted Forest",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      category: "Forest"
    },
    {
      title: "Ocean Depths",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=400&h=400&fit=crop",
      category: "Ocean"
    },
    {
      title: "Urban Dreams",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=350&fit=crop",
      category: "Urban"
    },
    {
      title: "Golden Sunset",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=450&fit=crop",
      category: "Sunset"
    },
    {
      title: "Winter Magic",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&h=320&fit=crop",
      category: "Winter"
    }
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 overflow-hidden">
      {/* Background stuff omitted for brevity ... */}

      <div className="container mx-auto px-40 relative z-10">
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent mb-6"
            animate={{ backgroundPosition: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            {title}
          </motion.h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {galleryImages.map((image, index) => (
            <MagneticCard
              key={image.title + index}
              image={image}
              index={index}
              isActive={activeCard === index}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              categoryColor={getCategoryColor(image.category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MagneticCard({ image, index, isActive, onHoverStart, onHoverEnd, categoryColor }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"]);
  const glowOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0.3, 0.7]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden border border-white/80 bg-white/80 backdrop-blur-xl p-6 shadow-2xl"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        {/* Glow effect bound directly */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: `0 0 40px ${categoryColor}40`,
            x: glowX,
            y: glowY,
            opacity: glowOpacity,
          }}
        />

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden mb-4">
          <motion.img
            src={image.thumbnail}
            alt={image.title}
            className="w-full h-64 object-cover rounded-2xl"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{image.title}</h3>
          <p className="text-gray-600 text-sm">Discover the beauty of this landscape</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
