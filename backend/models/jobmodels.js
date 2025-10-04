import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    type: { type: String, enum: ["Full-time", "Part-time", "Internship"], required: true },
    skills: [{ type: String, required: true }],
    postedAt: { type: Date, default: Date.now },
    description: { type: String, required: true },
    salary: { type: String, required: true },
    category: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
