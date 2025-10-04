import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: { type: String, required: true },
  resumePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", applicationSchema);