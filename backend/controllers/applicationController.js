import Application from "../models/applicationModel.js";
import cloudinary from "../utils/cloudinary.js"; // Import pre-configured Cloudinary

// Create Application
export const createApplication = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);
  console.log("Request headers:", req.headers);

  try {
    const { jobId, name, email, phone } = req.body;

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

    // Use the Cloudinary URL and public_id directly from req.file (uploaded by multer-storage-cloudinary)
    const resumePath = req.file.path; // Cloudinary URL
    const resume = req.file.filename || req.file.public_id; // Use filename or public_id

    // Create new application
    const application = new Application({
      jobId,
      name,
      email,
      phone,
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
    console.error("Error creating application:", err.stack); // Log full stack trace
    res.status(500).json({
      success: false,
      message: err instanceof multer.MulterError ? err.message : "Something went wrong on the server",
      error: err.message,
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

// Get applications for a specific job
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