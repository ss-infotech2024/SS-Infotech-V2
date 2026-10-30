import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import {
  createJob,
  getJobs,
  // getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Routes

router.post("/add-jobs", adminAuth, createJob);        // Create job
router.get("/show-jobs", getJobs);           // Get all jobs
// router.get("//:id", getJobById);     // Get single job
router.put("/update-jobs/:id", adminAuth, updateJob);      // Update job
router.delete("/delete-jobs/:id", adminAuth, deleteJob);   // Delete job

export default router;

