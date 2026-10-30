import express from "express";

import { getSlides, createSlide,deleteSlide } from "../controllers/slideController.js";

import { upload } from '../middleware/upload.js'; // Keep using upload for images/videos
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getSlides); // GET /api/slides
router.post('/', adminAuth, upload.single('url'), createSlide);



router.delete("/delete/:id", adminAuth, deleteSlide)

export default router;
