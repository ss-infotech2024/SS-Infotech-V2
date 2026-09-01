import express from "express";

import {
  getAlbums,
  createAlbum,
  deleteAlbum,
  updateAlbum,
  addAlbumImages,
  replaceAlbumImage,
  deleteAlbumImage,
} from "../controllers/albumController.js";

import { images } from "../middleware/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Album CRUD
|--------------------------------------------------------------------------
*/

// Get all albums
router.get("/album-getall", getAlbums);

// Create album
router.post(
  "/album-post",
  images.array("images", 10),
  createAlbum
);

// Update album details / add images
router.patch(
  "/album/:id",
  images.array("images", 10),
  updateAlbum
);

// Delete complete album
router.delete(
  "/album/:id",
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
  images.array("images", 10),
  addAlbumImages
);

// Replace one specific photo
router.patch(
  "/album/:id/images/:imageIndex",
  images.single("image"),
  replaceAlbumImage
);

// Delete one specific photo
router.delete(
  "/album/:id/images/:imageIndex",
  deleteAlbumImage
);

export default router;