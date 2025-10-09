import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  fullName: { type: String},
  phoneNumber: { type: String},
  emailAddress: { type: String },
  currentLocation: { type: String}, // City, State
  dateOfBirth: { type: Date},       // Store as Date
  postGraduationDegree: { type: String },
  underGraduationDegree: { type: String },
  diploma: { type: String },
  iti: { type: String },
  twelfth: { type: String },
  currentEmploymentStatus: { type: String },        // Employed / Unemployed / Student
  experience: { type: String },                     // e.g., "2 years in Java"
  techNonTechBoth: { type: String },               // Tech / Non Tech / Both
  resumeLink: { type: String },    // URL to resume (Cloudinary)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Candidate", candidateSchema);
