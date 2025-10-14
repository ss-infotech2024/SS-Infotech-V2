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

    const candidates = data.map((row) => ({
  fullName: row["fullName"] || "",
  phoneNumber: row["phoneNumber"] || "",
  emailAddress: row["emailAddress"] || "",
  currentLocation: row["currentLocation"] || "",
  dateOfBirth: row["dateOfBirth"] || null,
  postGraduationDegree: row["postGraduationDegree"] || "",
  underGraduationDegree: row["underGraduationDegree"] || "",
  diploma: row["diploma"] || "",
  iti: row["iti"] || "",
  twelfth: row["twelfth"] || "",
  currentEmploymentStatus: row["currentEmploymentStatus"] || "",
  experience: row["experience"] || "",
  techNonTechBoth: row["techNonTechBoth"] || "",
  resumeLink: row["resumeLink"] || "",
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
export const downloadExcel = async (req, res) => {
  try {
    // Fetch all candidates from the database
    const candidates = await Candidate.find();

    if (!candidates.length) {
      return res.status(404).json({ success: false, message: "No candidates found to download" });
    }

    // Transform candidates data into an array suitable for Excel
    const excelData = candidates.map((candidate) => ({
      fullName: candidate.fullName,
      phoneNumber: candidate.phoneNumber,
      emailAddress: candidate.emailAddress,
      currentLocation: candidate.currentLocation,
      dateOfBirth: candidate.dateOfBirth ? candidate.dateOfBirth.toISOString().split('T')[0] : "",
      postGraduationDegree: candidate.postGraduationDegree,
      underGraduationDegree: candidate.underGraduationDegree,
      diploma: candidate.diploma,
      iti: candidate.iti,
      twelfth: candidate.twelfth,
      currentEmploymentStatus: candidate.currentEmploymentStatus,
      experience: candidate.experience,
      techNonTechBoth: candidate.techNonTechBoth,
      resumeLink: candidate.resumeLink,
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

    // Generate buffer for the Excel file
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Set response headers for file download
    res.setHeader("Content-Disposition", "attachment; filename=candidates_export_" + new Date().toISOString().split('T')[0] + ".xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    // Send the file buffer as response
    res.send(buffer);
  } catch (err) {
    console.error("Excel download error:", err);
    res.status(500).json({ success: false, message: "Server error during Excel download" });
  }
};