import Event from "../models/eventModel.js";
import cloudinary from "../utils/cloudinary.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    const images = req.files;

    // Validate required fields
    if (!name || !description || !color || !images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, description, color, images",
      });
    }

    // Get Cloudinary URLs from uploaded files
    const imageUrls = images.map((file) => file.path);

    const event = new Event({
      name,
      description,
      images: imageUrls,
      color,
    });

    await event.save();
    res.status(201).json({ success: true, event });
  } catch (err) {
    console.error("Error creating event:", err.stack);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, events });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.status(200).json({ success: true, event });
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    const images = req.files;

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    if (name) event.name = name;
    if (description) event.description = description;
    if (color) event.color = color;

    if (images && images.length > 0) {
      // Get new image URLs
      const newImageUrls = images.map((file) => file.path);
      event.images = [...event.images, ...newImageUrls]; // Append new images
    }

    await event.save();
    res.status(200).json({ success: true, event });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    // Optionally delete images from Cloudinary
    for (const imageUrl of event.images) {
      const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0]; // Extract public_id from URL
      await cloudinary.uploader.destroy(publicId, { invalidate: true }).catch(err => console.error('Error deleting image:', err));
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};