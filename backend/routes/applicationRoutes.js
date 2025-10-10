import express from 'express';

import { createApplication, getApplications, deleteApplication,downloadResume } from '../controllers/applicationController.js';
import { resumeUpload } from '../middleware/upload.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Raw Request Body:', req.body);
  console.log('Raw Files:', req.files);
  next();
});

router.post('/fill-applications', resumeUpload.single('resume'), createApplication);
router.get('/recive-applications',  getApplications); // optional: protect listing
router.get("/download/:publicId", adminAuth, downloadResume);


// fix deletes
router.delete('/delete/:id', deleteApplication);
// router.delete('/delete-all', adminAuth, deleteAllApplications);

export default router;