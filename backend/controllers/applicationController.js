import Application from "../models/applicationModel.js";
import cloudinary from "../utils/cloudinary.js"; // Import pre-configured Cloudinary
import multer from "multer";
import { unlink } from "fs/promises";

function cloudinaryErrorMessage(err) {
  if (!err) return "";
  if (typeof err === "string") return err;
  return (
    err.message ||
    err.error?.message ||
    (typeof err.error === "string" ? err.error : "") ||
    ""
  );
}

// Create Application
export const createApplication = async (req, res) => {
  try {
    const { jobId, name, email, phone, title, college } = req.body;

    // Validate required fields
    if (!jobId || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: jobId, name, email, phone",
      });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only PDF, DOC, and DOCX files are allowed",
      });
    }

    const filename = req.file.filename;
    let resume = filename;
    let resumePath = `${req.protocol}://${req.get("host")}/Uploads/resumes/${filename}`;

    try {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "resumes",
        resource_type: "raw",
        access_mode: "public",
        use_filename: true,
        unique_filename: true,
      });
      resume = uploaded.public_id;
      resumePath = uploaded.secure_url;
      await unlink(req.file.path).catch(() => {});
    } catch (uploadErr) {
      console.error(
        "Cloudinary resume upload failed, keeping the local file:",
        cloudinaryErrorMessage(uploadErr) || uploadErr
      );
    }

    // Create new application
    const application = new Application({
      jobId,
      jobTitle: title || "",
      name,
      email,
      phone,
      college: college || "",
      resume,
      resumePath,
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error("Error creating application:", err.stack || err);
    res.status(500).json({
      success: false,
      message: err instanceof multer.MulterError ? err.message : "Application could not be saved. Please try again.",
    });
  }
};

// Get all applications (e.g., for admin)

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




// Delete all applications
export const deleteAllApplications = async (req, res) => {
  try {
    await Application.deleteMany({});
    res.json({ success: true, message: "All applications deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete all applications" });
  }
};



export const getApplicationsByJob = async (req, res) => {
  try {
    const { id } = req.params;
    const applications = await Application.find({ jobId: id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    console.error("Error fetching applications by job:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

};

// 🔹 Delete all applications
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Application.findByIdAndDelete(id);
    if (!app) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    try {
      if (app.resume) {
        await cloudinary.uploader.destroy(app.resume, { resource_type: "raw" });
      }
    } catch (e) {
      console.warn("Cloudinary delete warning:", e.message);
    }

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete application" });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application || !application.resumePath) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    // Return the direct Cloudinary URL
    res.json({
      success: true,
      resumePath: application.resumePath,
      filename: `${application.name.replace(/\s+/g, "_")}_resume.pdf`,
    });
  } catch (err) {
    console.error("Error fetching resume URL:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get resume",
      error: err.message,
    });
  }
};

