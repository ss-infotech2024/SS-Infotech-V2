import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { message } from 'antd'; // ✅ fixed import

// Focus trap helper for modals
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

const AdminGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    fullTitle: '',
    color: '',
    images: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewAlbum, setViewAlbum] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // Fetch albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://ssinfotech-backend-k03q.onrender.com/api/albums/album-getall');
        setAlbums(response.data);
      } catch (err) {
        message.error('Failed to load albums. Please try again.');
      }
    };
    fetchAlbums();
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && viewAlbum) closeModal();
    };
    if (viewAlbum) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [viewAlbum]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKey = (e) => {
      if (!viewAlbum) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    if (viewAlbum) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [viewAlbum, currentImageIndex]);

  // Trap focus in modal
  useFocusTrap(modalRef, !!viewAlbum);

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  // File input handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setError('Maximum 10 images allowed');
      message.error('Maximum 10 images allowed');
      return;
    }
    if (!isEditing && files.length < 5) {
      setError('Minimum 5 images required for new albums');
      message.error('Minimum 5 images required for new albums');
      return;
    }
    setFormData((prev) => ({ ...prev, images: files }));
    setError('');
  };

  // Form submission (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('fullTitle', formData.fullTitle);
    data.append('color', formData.color);
    formData.images.forEach((file) => data.append('images', file));

    try {
      if (isEditing) {
        const response = await axios.patch(`https://ssinfotech-backend-k03q.onrender.com/api/albums/album/${editId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setAlbums((prev) => prev.map((album) => (album._id === editId ? response.data.album : album)));
        message.success('Album updated successfully!');
      } else {
        const response = await axios.post('https://ssinfotech-backend-k03q.onrender.com/api/albums/album-post', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setAlbums((prev) => [...prev, response.data.album]);
        message.success('Album created successfully!');
      }

      setFormData({ title: '', fullTitle: '', color: '', images: [] });
      setIsEditing(false);
      setEditId(null);
      fileInputRef.current.value = '';
      setError('');
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to save album';
      setError(errMsg);
      message.error(errMsg);
    }
  };

  // Edit album
  const handleEdit = (album) => {
    setIsEditing(true);
    setEditId(album._id);
    setFormData({
      title: album.title,
      fullTitle: album.fullTitle,
      color: album.color,
      images: [],
    });
    setError('');
    message.info(`Editing album: ${album.title}`);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Delete album
  const handleDelete = async (_id) => {
    if (!confirm('Are you sure you want to delete this album?')) return;
    try {
      await axios.delete(`https://ssinfotech-backend-k03q.onrender.com/api/albums/album/${_id}`);
      setAlbums((prev) => prev.filter((album) => album._id !== _id));
      message.success('Album deleted successfully!');
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to delete album';
      setError(errMsg);
      message.error(errMsg);
    }
  };

  // View album modal
  const openModal = (album, index = 0) => {
    setViewAlbum(album);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setViewAlbum(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!viewAlbum) return;
    setCurrentImageIndex((i) => (i + 1) % viewAlbum.images.length);
  };

  const prevImage = () => {
    if (!viewAlbum) return;
    setCurrentImageIndex((i) => (i - 1 + viewAlbum.images.length) % viewAlbum.images.length);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6" ref={formRef}>
          <h2 className="text-2xl font-semibold mb-6">{isEditing ? 'Update Album' : 'Create New Album'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="fullTitle" className="block text-sm font-medium text-gray-700">Full Title</label>
              <input
                type="text"
                name="fullTitle"
                value={formData.fullTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color (Tailwind Gradient)</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images (5–10)</label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                required={!isEditing}
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-[#552586] text-white rounded-md hover:bg-[#6a34a0]"
              >
                {isEditing ? 'Update Album' : 'Create Album'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditId(null);
                    setFormData({ title: '', fullTitle: '', color: '', images: [] });
                    fileInputRef.current.value = '';
                    setError('');
                    message.info('Edit canceled');
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Album List */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Albums</h2>
          {albums.length === 0 ? (
            <p className="text-gray-500">No albums found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {albums.map((album) => (
                    <tr key={album._id}>
                      <td className="px-6 py-4">{album.title}</td>
                      <td className="px-6 py-4">{album.fullTitle}</td>
                      <td className="px-6 py-4">{album.color}</td>
                      <td className="px-6 py-4">{album.images.length}</td>
                      <td className="px-6 py-4 space-x-3">
                        <button onClick={() => openModal(album)} className="text-indigo-600 hover:underline">View</button>
                        <button onClick={() => handleEdit(album)} className="text-yellow-600 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(album._id)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* View Album Modal */}
      <AnimatePresence>
        {viewAlbum && (
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
              className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-white/50">
                <h3 className="text-xl font-bold">{viewAlbum.fullTitle}</h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full"
                  aria-label="Close gallery modal"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 overflow-auto max-h-[calc(95vh-140px)]">
                <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                  <motion.img
                    key={currentImageIndex}
                    src={viewAlbum.images[currentImageIndex]}
                    alt="album"
                    className="w-full h-[60vh] object-contain"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow"
                  >
                    ›
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;
