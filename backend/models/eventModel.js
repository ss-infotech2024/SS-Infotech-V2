import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }], // Array of Cloudinary URLs
    color: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);