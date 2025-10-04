import express from 'express';
import { createApplication, getApplications, getApplicationsByJob } from '../controllers/applicationController.js';
import { resumeUpload } from '../middleware/upload.js';

const router = express.Router();

// Middleware to log raw request body and files
router.use((req, res, next) => {
  console.log('Raw Request Body:', req.body);
  console.log('Raw Files:', req.files); // Should be undefined until Multer processes
  next();
});

// Routes
router.post('/fill-applications', resumeUpload.single('resume'), createApplication);
router.get('/recive-applications', getApplications);
router.get('/applications/:id', getApplicationsByJob);

export default router;