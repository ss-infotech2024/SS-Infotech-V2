// controllers/candidateController.js
import XLSX from "xlsx";
import fs from "fs";
import Candidate from "../models/candidateModel.js";
import cloudinary from "../utils/cloudinary.js";



export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data.length) {
      fs.unlinkSync(req.file.path); // remove file
      return res.status(400).json({ success: false, message: "Excel file is empty" });
    }

    const candidates = data.map((row, i) => ({
      fullName: row["Full Name"] || "",
      phoneNumber: row["Phone Number"] || "",
      emailAddress: row["Email Address"] || "",
      currentLocation: row["Current Location (City, State)"] || "",
      dateOfBirth: row["Date of Birth / Age"] || "",
      postGraduationDegree: row["Post Graduation Degree"] || "",
      underGraduationDegree: row["Under Graduation Degree"] || "",
      diploma: row["Diploma"] || "",
      iti: row["ITI"] || "",
      twelfth: row["12th"] || "",
      currentEmploymentStatus: row["Current Employment Status"] || "",
      experience: row["Experience (if any)"] || "",
      techType: row["Tech / Non Tech / Both"] || "",
      resumeLink: row["Upload Resume Link"] || "",
    }));

    // Save all candidates
    await Candidate.insertMany(candidates);

    // Delete temp file
    fs.unlinkSync(req.file.path);

    return res.status(200).json({ success: true, count: candidates.length });
  } catch (err) {
    console.error("Excel upload error:", err);
    return res.status(500).json({ success: false, message: "Server error during Excel upload" });
  }
};


// Get all candidates
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch candidates" });
  }
};

// Delete a candidate
export const deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Candidate deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete candidate" });
  }
};

// Delete all candidates
export const deleteAllCandidates = async (req, res) => {
  try {
    await Candidate.deleteMany({});
    res.status(200).json({ success: true, message: "All candidates deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete all candidates" });
  }
};
