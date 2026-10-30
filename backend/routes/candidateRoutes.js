// routes/candidateRoutes.js
import express from "express";
import { uploadExcel, getCandidates, deleteCandidate, deleteAllCandidates,downloadExcel } from "../controllers/candidateController.js";
import { excelUpload } from "../middleware/upload.js";
import multer from "multer";
import { adminAuth } from "../middleware/adminAuth.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// 👇 IMPORTANT: the argument to .single() defines the expected field name
router.post("/upload-excel", adminAuth, excelUpload.single("file"), uploadExcel);
router.get("/candidates", adminAuth, getCandidates);
router.delete("/candidate/:id", adminAuth, deleteCandidate);
router.delete("/candidates", adminAuth, deleteAllCandidates);
router.get("/download-excel", adminAuth, downloadExcel);

export default router;
