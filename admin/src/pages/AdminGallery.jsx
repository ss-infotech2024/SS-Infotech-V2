import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImagePlus, Trash2, Upload } from "lucide-react";

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all gallery items
  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/gallery");
      setGalleryItems(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      toast.error("Failed to load gallery");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file first!");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://localhost:3000/api/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("File uploaded successfully!");
      setFile(null);
      fetchGallery();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/gallery/${id}`);
      toast.success("Deleted successfully");
      fetchGallery();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Gallery Admin</h2>

      {/* Upload Section */}
      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-2xl shadow-md"
      >
        <label className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-400 p-4 rounded-xl cursor-pointer hover:bg-gray-100 transition">
          <ImagePlus className="w-8 h-8 text-gray-600" />
          <span className="text-gray-700">
            {file ? file.name : "Click or drag file to upload"}
          </span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
        >
          <Upload className="w-5 h-5" />
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Gallery Grid */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item._id}
            className="relative group rounded-xl overflow-hidden shadow-lg"
          >
            {item.type.startsWith("image") ? (
              <img
                src={item.url}
                alt="gallery"
                className="w-full h-48 object-cover group-hover:scale-105 transition"
              />
            ) : (
              <video
                src={item.url}
                controls
                className="w-full h-48 object-cover"
              ></video>
            )}
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
