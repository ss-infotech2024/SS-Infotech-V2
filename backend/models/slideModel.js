import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["video", "image"] },
  url: { type: String, required: true }, // Stores Cloudinary URL
  title: { type: String, required: true },
  subtitle: { type: String },
  cta: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Slide", slideSchema);