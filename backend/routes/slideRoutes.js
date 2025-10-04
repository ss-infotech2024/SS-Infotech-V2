import express from "express";
import { getSlides, createSlide } from "../controllers/slideController.js";
import { upload } from '../middleware/upload.js'; // Keep using upload for images/videos

const router = express.Router();

router.get("/", getSlides); // GET /api/slides
router.post('/', upload.single('url'), createSlide); // Changed to 'url' to match your request

export default router;