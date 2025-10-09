import express from 'express';
import { createGalleryImage, getGalleryImages, getGalleryImageById, updateGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { upload } from '../middleware/upload.js'; // Assuming single image upload

const router = express.Router();

// Routes
router.post('/magnetic-images', upload.single('thumbnail'), createGalleryImage); // Create gallery image
router.get('/magnetic-images', getGalleryImages); // Get all gallery images
router.get('/magnetic-images/:id', getGalleryImageById); // Get single gallery image
router.put('/magnetic-images/:id', upload.single('thumbnail'), updateGalleryImage); // Update gallery image
router.delete('/magnetic-images/:id', deleteGalleryImage); // Delete gallery image

export default router;