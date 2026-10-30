import express from "express";
import { getJobListings, createJobListing, deleteJobListing } from "../controllers/jobListingController.js";
import {upload} from "../middleware/upload.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getJobListings);
router.post("/posts-jobs", adminAuth, upload.single("image"), upload.array("files", 5), createJobListing);
router.delete('/delete-posts/:id', adminAuth, deleteJobListing);
export default router;
