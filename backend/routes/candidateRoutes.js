// routes/candidateRoutes.js
import express from "express";
import { uploadExcel, getCandidates, deleteCandidate, deleteAllCandidates } from "../controllers/candidateController.js";
import { excelUpload } from "../middleware/upload.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// 👇 IMPORTANT: the argument to .single() defines the expected field name
router.post("/upload-excel", upload.single("file"), uploadExcel);
router.get("/candidates", getCandidates);
router.delete("/candidate/:id", deleteCandidate);
router.delete("/candidates", deleteAllCandidates);

export default router;
