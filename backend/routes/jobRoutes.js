import express from "express";
import {
  createJob,
  getJobs,
  // getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Routes
router.post("/add-job", createJob);        // Create job
router.get("/show-job", getJobs);           // Get all jobs
// router.get("//:id", getJobById);     // Get single job
router.put("/update-job/:id", updateJob);      // Update job
router.delete("/delete-job/:id", deleteJob);   // Delete job

export default router;
