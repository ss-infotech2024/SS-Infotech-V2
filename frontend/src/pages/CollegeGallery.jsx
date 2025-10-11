// CollegeGallery.jsx
// Updated with correct API endpoints

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// API service functions
const apiService = {
  // Get all albums
  async getAlbums() {
    const response = await fetch('http://localhost:3000/api/albums/album-getall');
    if (!response.ok) throw new Error('Failed to fetch albums');
    return response.json();
  },

  // Get album by ID
  async getAlbumById(id) {
    const response = await fetch(`/api/album/${id}`);
    if (!response.ok) throw new Error('Failed to fetch album');
    return response.json();
  },

  // Create album (for future use)
  async createAlbum(albumData) {
    const formData = new FormData();
    Object.keys(albumData).forEach(key => {
      if (key === 'images') {
        albumData.images.forEach(image => formData.append('images', image));
      } else {
        formData.append(key, albumData[key]);
      }
    });

    const response = await fetch('/api/album-post', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create album');
    return response.json();
  },

  // Update album (for future use)
  async updateAlbum(id, albumData) {
    const formData = new FormData();
    Object.keys(albumData).forEach(key => {
      if (key === 'images') {
        albumData.images.forEach(image => formData.append('images', image));
      } else {
        formData.append(key, albumData[key]);
      }
    });

    const response = await fetch(`/api/album/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update album');
    return response.json();
  },

  // Delete album (for future use)
  async deleteAlbum(id) {
    const response = await fetch(`/api/album/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete album');
    return response.json();
  }
};

// Focus trap helper for modal
const useFocusTrap = (ref, isOpen) => {
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();

    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [ref, isOpen]);
};

const CollegeGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef(null);

  // Fetch albums on component mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getAlbums();
        setAlbums(data);
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError(err.message);
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedAlbum) {
        closeModal();
      }
    };
    if (selectedAlbum) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedAlbum]);

  // Keyboard navigation for modal (arrows)
  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedAlbum) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    if (selectedAlbum) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [selectedAlbum, currentImageIndex]);

  // Trap focus in modal
  useFocusTrap(modalRef, !!selectedAlbum);

  const openModal = (album, index = 0) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedAlbum) return;
    setCurrentImageIndex((i) => (i + 1) % selectedAlbum.images.length);
  };

  const prevImage = () => {
    if (!selectedAlbum) return;
    setCurrentImageIndex((i) => (i - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-lg text-gray-600">Loading college galleries...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Galleries</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="space-y-2 text-sm text-red-700">
              <p>Please check:</p>
              <ul className="list-disc list-inside text-left">
                <li>Backend server is running</li>
                <li>API endpoint: /api/album-getall</li>
                <li>Network connectivity</li>
              </ul>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            College Visits
          </motion.h1>

          <div className="space-y-16">
            {albums.map((album) => (
              <AlbumSection 
                key={album.id} 
                album={album} 
                onExploreMore={(index) => openModal(album, index)} 
              />
            ))}
          </div>

          {albums.length === 0 && !loading && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Albums Found</h3>
              <p className="text-gray-500">There are no college visit albums to display.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={handleOverlayClick}
            ref={modalRef}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden border border-white/20"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedAlbum.title} image gallery`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-white/50">
                <h3 className="text-xl font-bold text-gray-900">{selectedAlbum.fullTitle || selectedAlbum.title}</h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Close gallery modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Image Viewer */}
              <div className="p-6 overflow-auto max-h-[calc(95vh-140px)]">
                <div className="mb-8 relative bg-gray-100/50 rounded-xl overflow-hidden shadow-inner">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedAlbum.images[currentImageIndex]}
                      alt={`${selectedAlbum.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-[60vh] sm:h-[70vh] object-contain select-none rounded-lg"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={600}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.1}
                      onDragEnd={(e, info) => {
                        if (info.offset.x > 100) prevImage();
                        else if (info.offset.x < -100) nextImage();
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Index Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentImageIndex + 1} / {selectedAlbum.images.length}
                  </div>
                </div>

                {/* Thumbnails Grid */}
                {selectedAlbum.images && selectedAlbum.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {selectedAlbum.images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative rounded-xl overflow-hidden shadow-md transition-all border-2 ${
                          index === currentImageIndex
                            ? 'border-blue-500 ring-2 ring-blue-200/50 bg-blue-50'
                            : 'border-transparent hover:border-gray-300 hover:shadow-lg'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        aria-label={`Jump to image ${index + 1}`}
                      >
                        <img
                          src={image}
                          alt={`${selectedAlbum.title} - Thumbnail ${index + 1}`}
                          className="w-full h-24 object-cover"
                          loading="lazy"
                          decoding="async"
                          width={150}
                          height={100}
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// AlbumSection component (same as before)
const AlbumSection = ({ album, onExploreMore }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [itemWidth, setItemWidth] = useState(280);
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);

  const gap = 16;
  const total = album.images?.length || 0;
  const autoplayDelay = 2500;

  // Responsive measurement
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerW = containerRef.current.clientWidth;
      let w = 256;
      if (containerW >= 1024) w = 320;
      else if (containerW >= 768) w = 288;
      else if (containerW >= 640) w = 256;
      setItemWidth(w);
      const count = Math.max(1, Math.floor(containerW / (w + gap)));
      setVisibleCount(Math.min(count, total));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [total]);

  // Autoplay logic
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!isHovered && !isInteracting && total > visibleCount) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % total);
      }, autoplayDelay);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isHovered, isInteracting, total, visibleCount, autoplayDelay]);

  // Auto-resume after interaction pause
  useEffect(() => {
    if (isInteracting) {
      const timeoutId = setTimeout(() => {
        setIsInteracting(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [isInteracting]);

  const next = () => {
    setIsInteracting(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIndex((i) => (i + 1) % total);
  };

  const prev = () => {
    setIsInteracting(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIndex((i) => (i - 1 + total) % total);
  };

  const shouldCenter = total <= visibleCount;
  const maxLeadingIndex = Math.max(0, total - visibleCount);
  const leadingIndex = Math.min(index, maxLeadingIndex);
  const translateX = -(leadingIndex * (itemWidth + gap));

  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, [itemWidth, visibleCount]);

  const centerOffset = shouldCenter 
    ? (containerWidth - total * itemWidth - (total - 1) * gap) / 2 
    : 0;

  // If no images, don't render the section
  if (!album.images || album.images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header with title and controls */}
      <div className="flex sm:flex-row lg:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${album.color || 'from-gray-500 to-gray-700'} bg-clip-text text-transparent`}>
          {album.title}
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={prev}
            aria-label={`Previous image in ${album.title} gallery`}
            className="px-3 sm:px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-1"
          >
            <span className="text-m">‹</span>
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            onClick={next}
            aria-label={`Next image in ${album.title} gallery`}
            className="px-3 sm:px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="text-lg">›</span>
          </button>

          <button
            onClick={() => onExploreMore(leadingIndex)}
            className={`hidden sm:inline px-4 sm:px-6 py-2 rounded-full font-semibold bg-gradient-to-r ${album.color || 'from-gray-500 to-gray-700'} text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2`}
            aria-label={`Explore full ${album.title} gallery`}
          >
            <span className="hidden sm:inline">Explore More</span>
          </button>
        </div>
      </div>

      {/* Scroller Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg border border-white/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="region"
        aria-label={`${album.title} image carousel`}
      >
        <motion.div
          ref={trackRef}
          className={`flex ${shouldCenter ? 'justify-center' : 'justify-start'} items-center transition-colors duration-300`}
          style={{
            gap: `${gap}px`,
            width: total > visibleCount ? `${total * (itemWidth + gap)}px` : 'auto',
            transform: shouldCenter ? `translateX(${centerOffset}px)` : undefined,
          }}
          animate={{
            x: shouldCenter ? centerOffset : translateX,
          }}
          transition={{
            type: 'tween',
            duration: 0.5,
            ease: 'easeInOut',
          }}
          drag={total > visibleCount ? 'x' : false}
          dragConstraints={
            total > visibleCount
              ? { left: -(maxLeadingIndex * (itemWidth + gap)), right: 0 }
              : { left: 0, right: 0 }
          }
          dragElastic={0.1}
          onDragStart={() => setIsInteracting(true)}
          onDragEnd={(e, info) => {
            if (total <= visibleCount) return;
            const threshold = 50;
            if (info.offset.x < -threshold) {
              next();
            } else if (info.offset.x > threshold) {
              prev();
            } else {
              setIndex(leadingIndex);
            }
            setIsHovered(false);
          }}
        >
          {album.images.map((img, i) => (
            <motion.div
              key={`${album.id}-${i}`}
              className="flex-shrink-0 rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                width: `${itemWidth}px`,
                height: '200px',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onExploreMore(i)}
              role="button"
              tabIndex={0}
              aria-label={`View full size of image ${i + 1} from ${album.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onExploreMore(i);
                }
              }}
            >
              <img
                src={img}
                alt={`${album.title} - Campus image ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={itemWidth}
                height={200}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Pause indicator if interacting/hovering */}
        {(isHovered || isInteracting) && total > visibleCount && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/20 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
              Paused
            </div>
          </div>
        )}
      </div>

      {/* Image count indicator */}
      {total > 0 && (
        <p className="text-center text-sm text-gray-600">
          Showing {Math.min(visibleCount, total)} of {total} images • Auto-advances every {autoplayDelay / 1000}s
        </p>
      )}
    </div>
  );
};

export default CollegeGallery;