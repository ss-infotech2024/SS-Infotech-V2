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

router.post("/add-jobs", createJob);        // Create job
router.get("/show-jobs", getJobs);           // Get all jobs
// router.get("//:id", getJobById);     // Get single job
router.put("/update-jobs/:id", updateJob);      // Update job
router.delete("/delete-jobs/:id", deleteJob);   // Delete job

export default router;

