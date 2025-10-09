import Gallery from "../models/seminarModel.js";
import cloudinary from "../utils/cloudinary.js";

// Create a new gallery image
export const createGalleryImage = async (req, res) => {
  try {
    const { title, category } = req.body;
    const thumbnail = req.file.path; // From Multer

    if (!title || !category || !thumbnail) {
      return res.status(400).json({ success: false, message: "All fields are required: title, category, thumbnail" });
    }

    const result = await cloudinary.uploader.upload(thumbnail, { folder: "gallery" });
    const galleryImage = new Gallery({
      title,
      thumbnail: result.secure_url,
      category,
    });

    await galleryImage.save();
    res.status(201).json({ success: true, galleryImage });
  } catch (err) {
    console.error("Error creating gallery image:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all gallery images
export const getGalleryImages = async (req, res) => {
  try {
    const galleryImages = await Gallery.find();
    res.status(200).json({ success: true, galleryImages });
  } catch (err) {
    console.error("Error fetching gallery images:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single gallery image by ID
export const getGalleryImageById = async (req, res) => {
  try {
    const galleryImage = await Gallery.findById(req.params.id);
    if (!galleryImage) return res.status(404).json({ success: false, message: "Gallery image not found" });
    res.status(200).json({ success: true, galleryImage });
  } catch (err) {
    console.error("Error fetching gallery image:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a gallery image
export const updateGalleryImage = async (req, res) => {
  try {
    const { title, category } = req.body;
    const thumbnail = req.file?.path;

    const galleryImage = await Gallery.findById(req.params.id);
    if (!galleryImage) return res.status(404).json({ success: false, message: "Gallery image not found" });

    if (title) galleryImage.title = title;
    if (category) galleryImage.category = category;
    if (thumbnail) {
      const result = await cloudinary.uploader.upload(thumbnail, { folder: "gallery" });
      galleryImage.thumbnail = result.secure_url;
    }

    await galleryImage.save();
    res.status(200).json({ success: true, galleryImage });
  } catch (err) {
    console.error("Error updating gallery image:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a gallery image
export const deleteGalleryImage = async (req, res) => {
  try {
    const galleryImage = await Gallery.findById(req.params.id);
    if (!galleryImage) return res.status(404).json({ success: false, message: "Gallery image not found" });

    const publicId = galleryImage.thumbnail.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId, { invalidate: true });
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Gallery image deleted successfully" });
  } catch (err) {
    console.error("Error deleting gallery image:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};