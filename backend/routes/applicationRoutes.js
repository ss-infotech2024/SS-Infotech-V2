import express from 'express';
import multer from 'multer';

import { createApplication, getApplications, deleteApplication, deleteAllApplications, downloadResume } from '../controllers/applicationController.js';
import { resumeUpload } from '../middleware/upload.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/fill-applications', (req, res, next) => {
  resumeUpload.single('resume')(req, res, (err) => {
    if (err) {
      console.error('Resume upload failed:', err.stack || err);
      const status = err instanceof multer.MulterError ? 400 : 502;
      const message =
        (typeof err === "string" && err) ||
        err?.message ||
        err?.error?.message ||
        "Resume upload failed. Please try again.";
      return res.status(status).json({
        success: false,
        message,
      });
    }
    createApplication(req, res, next);
  });
});
router.get('/recive-applications', adminAuth, getApplications);
router.get("/download/:publicId", adminAuth, downloadResume);

router.delete('/delete/:id', adminAuth, deleteApplication);
router.delete('/delete-all', adminAuth, deleteAllApplications);

export default router;
