import express from "express";

import {
  getAlbums,
  getAlbumById,
  createAlbum,
  deleteAlbum,
  updateAlbum,
  addAlbumImages,
  replaceAlbumImage,
  deleteAlbumImage,
} from "../controllers/albumController.js";

import { images } from "../middleware/upload.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Album CRUD
|--------------------------------------------------------------------------
*/

// Get all albums
router.get("/album-getall", getAlbums);
router.get("/album/:id", getAlbumById);

// Create album
router.post(
  "/album-post",
  adminAuth,
  images.array("images", 10),
  createAlbum
);

// Update album details / add images
router.patch(
  "/album/:id",
  adminAuth,
  images.array("images", 10),
  updateAlbum
);

// Delete complete album
router.delete(
  "/album/:id",
  adminAuth,
  deleteAlbum
);


/*
|--------------------------------------------------------------------------
| Individual Photo CRUD
|--------------------------------------------------------------------------
*/

// Add photos to existing album
router.post(
  "/album/:id/images",
  adminAuth,
  images.array("images", 10),
  addAlbumImages
);

// Replace one specific photo
router.patch(
  "/album/:id/images/:imageIndex",
  adminAuth,
  images.single("image"),
  replaceAlbumImage
);

// Delete one specific photo
router.delete(
  "/album/:id/images/:imageIndex",
  adminAuth,
  deleteAlbumImage
);

export default router;
