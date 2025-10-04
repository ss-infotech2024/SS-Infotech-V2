import express from "express";
import { getJobListings, createJobListing, deleteJobListing } from "../controllers/jobListingController.js";
import {upload} from "../middleware/upload.js";

const router = express.Router();

router.get("/", getJobListings);
router.post("/posts-jobs", upload.single("image"), upload.array("files", 5), createJobListing);
router.delete('/delete-posts/:id', deleteJobListing);
export default router;