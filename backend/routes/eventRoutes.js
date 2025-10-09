import express from 'express';
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { upload } from '../middleware/upload.js'; // Use upload middleware for multiple images

const router = express.Router();

// Routes
router.post('/evn-img', upload.array('images', 10), createEvent); // Create event with multiple images (max 10)
router.get('/evn-img', getEvents); // Get all events
router.get('/:id', getEventById); // Get single event
router.put('/:id', upload.array('images', 10), updateEvent); // Update event, optionally add new images
router.delete('/evn-delete/:id', deleteEvent); // Delete event

export default router;