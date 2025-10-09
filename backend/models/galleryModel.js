import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true }, // URL to the thumbnail image
  category: { type: String, required: true, enum: ["Nature", "Forest", "Ocean", "Urban", "Sunset", "Winter", "Desert", "Aurora", "Beach", "Mountains"] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Gallery", gallerySchema);