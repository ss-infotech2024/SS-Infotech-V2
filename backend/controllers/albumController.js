import Album from "../models/albumModel.js";
import cloudinary from "../utils/cloudinary.js";

// ✅ Get all albums
export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// ✅ Create new album
export const createAlbum = async (req, res) => {
  try {
    const { title, fullTitle, color } = req.body;

    if (!title || !fullTitle || !color) {
      return res
        .status(400)
        .json({ error: "All fields (title, fullTitle, color) are required" });
    }

    if (!req.files || req.files.length < 5 || req.files.length > 10) {
      return res
        .status(400)
        .json({ error: "Must upload between 5 and 10 images" });
    }

    const imageUrls = req.files.map((file) => file.path);

    const newAlbum = new Album({
      title,
      fullTitle,
      color,
      images: imageUrls,
    });

    const savedAlbum = await newAlbum.save();
    res
      .status(201)
      .json({ message: "Album created successfully", album: savedAlbum });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// ✅ Update album
export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, fullTitle, color } = req.body;

    const album = await Album.findById(id);
    if (!album) return res.status(404).json({ error: "Album not found" });

    if (title) album.title = title;
    if (fullTitle) album.fullTitle = fullTitle;
    if (color) album.color = color;

    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map((file) => file.path);
      album.images = [...album.images, ...newImageUrls].slice(0, 10);
    }

    const updatedAlbum = await album.save();
    res
      .status(200)
      .json({ message: "Album updated successfully", album: updatedAlbum });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// ✅ Delete album
export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);

    if (!album) return res.status(404).json({ error: "Album not found" });

    for (const imageUrl of album.images) {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`ss-infotech/${publicId}`);
    }

    await album.deleteOne();
    res
      .status(200)
      .json({ message: "Album and associated images deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
