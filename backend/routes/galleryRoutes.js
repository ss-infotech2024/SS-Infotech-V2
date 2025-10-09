import express from 'express';
import { createGalleryImage, getGalleryImages, getGalleryImageById, updateGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { upload } from '../middleware/upload.js'; // Assuming single image upload

const router = express.Router();

// Routes
router.post('/gallery', upload.single('thumbnail'), createGalleryImage); // Create gallery image
router.get('/gallery-img', getGalleryImages); // Get all gallery images
router.get('/gallery/:id', getGalleryImageById); // Get single gallery image
router.put('/gallery/:id', upload.single('thumbnail'), updateGalleryImage); // Update gallery image
router.delete('/gallery/:id', deleteGalleryImage); // Delete gallery image

export default router;