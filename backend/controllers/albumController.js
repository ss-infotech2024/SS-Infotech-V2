import Album from "../models/albumModel.js";
import cloudinary from "../utils/cloudinary.js";

/*
|--------------------------------------------------------------------------
| Helper: Delete image from Cloudinary
|--------------------------------------------------------------------------
*/

const deleteCloudinaryImage = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    const url = new URL(imageUrl);

    const pathParts = url.pathname.split("/");

    const uploadIndex = pathParts.indexOf("upload");

    if (uploadIndex === -1) {
      console.warn("Invalid Cloudinary URL:", imageUrl);
      return;
    }

    /*
     * Example:
     *
     * /cloudinary/image/upload/v123/ss-infotech/photo.jpg
     *
     * We need:
     *
     * ss-infotech/photo
     */

    let publicIdParts = pathParts.slice(uploadIndex + 1);

    // Remove version e.g. v123456
    if (
      publicIdParts.length > 0 &&
      /^v\d+$/.test(publicIdParts[0])
    ) {
      publicIdParts.shift();
    }

    // Remove file extension
    const lastIndex = publicIdParts.length - 1;

    publicIdParts[lastIndex] = publicIdParts[lastIndex].replace(
      /\.[^/.]+$/,
      ""
    );

    const publicId = publicIdParts.join("/");

    await cloudinary.uploader.destroy(publicId);

    console.log("Cloudinary image deleted:", publicId);
  } catch (error) {
    console.error(
      "Cloudinary delete error:",
      error.message
    );
  }
};


/*
|--------------------------------------------------------------------------
| Get all albums
|--------------------------------------------------------------------------
*/

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().sort({
      createdAt: -1,
    });

    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| Create new album
|--------------------------------------------------------------------------
*/

export const createAlbum = async (req, res) => {
  try {
    const {
      title,
      fullTitle,
      color,
    } = req.body;

    if (!title || !fullTitle || !color) {
      return res.status(400).json({
        error:
          "All fields (title, fullTitle, color) are required",
      });
    }

    if (
      !req.files ||
      req.files.length < 5 ||
      req.files.length > 10
    ) {
      return res.status(400).json({
        error: "Must upload between 5 and 10 images",
      });
    }

    const imageUrls = req.files.map(
      (file) => file.path
    );

    const newAlbum = new Album({
      title,
      fullTitle,
      color,
      images: imageUrls,
    });

    const savedAlbum = await newAlbum.save();

    res.status(201).json({
      message: "Album created successfully",
      album: savedAlbum,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| Update album
|--------------------------------------------------------------------------
|
| Existing functionality:
| - title
| - fullTitle
| - color
| - append new images
|
|--------------------------------------------------------------------------
*/

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      fullTitle,
      color,
    } = req.body;

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({
        error: "Album not found",
      });
    }

    if (title) {
      album.title = title;
    }

    if (fullTitle) {
      album.fullTitle = fullTitle;
    }

    if (color) {
      album.color = color;
    }

    /*
     * Existing images + new images
     * Maximum 10 images
     */

    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map(
        (file) => file.path
      );

      if (
        album.images.length + newImageUrls.length >
        10
      ) {
        return res.status(400).json({
          error:
            `Album can contain maximum 10 images. ` +
            `Currently ${album.images.length} images exist.`,
        });
      }

      album.images = [
        ...album.images,
        ...newImageUrls,
      ];
    }

    const updatedAlbum = await album.save();

    res.status(200).json({
      message: "Album updated successfully",
      album: updatedAlbum,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| Add photos to existing album
|--------------------------------------------------------------------------
|
| POST /api/albums/album/:id/images
|
|--------------------------------------------------------------------------
*/

export const addAlbumImages = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({
        error: "Album not found",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: "Please select at least one image",
      });
    }

    if (
      album.images.length + req.files.length >
      10
    ) {
      return res.status(400).json({
        error:
          `You can have maximum 10 images. ` +
          `Current images: ${album.images.length}`,
      });
    }

    const newImageUrls = req.files.map(
      (file) => file.path
    );

    album.images = [
      ...album.images,
      ...newImageUrls,
    ];

    const updatedAlbum = await album.save();

    res.status(200).json({
      message: "Photos added successfully",
      album: updatedAlbum,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add photos",
      details: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| Replace individual photo
|--------------------------------------------------------------------------
|
| PATCH /api/albums/album/:id/images/:imageIndex
|
|--------------------------------------------------------------------------
*/

export const replaceAlbumImage = async (req, res) => {
  try {
    const {
      id,
      imageIndex,
    } = req.params;

    const index = Number(imageIndex);

    if (!Number.isInteger(index) || index < 0) {
      return res.status(400).json({
        error: "Invalid image index",
      });
    }

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({
        error: "Album not found",
      });
    }

    if (index >= album.images.length) {
      return res.status(404).json({
        error: "Image not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Please select a replacement image",
      });
    }

    /*
     * Store old image URL
     * before replacing it
     */

    const oldImageUrl = album.images[index];

    /*
     * Replace image URL
     */

    album.images[index] = req.file.path;

    const updatedAlbum = await album.save();

    /*
     * Delete old image from Cloudinary
     * after database update
     */

    await deleteCloudinaryImage(
      oldImageUrl
    );

    res.status(200).json({
      message: "Photo replaced successfully",
      album: updatedAlbum,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to replace photo",
      details: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| Delete individual photo
|--------------------------------------------------------------------------
|
| DELETE /api/albums/album/:id/images/:imageIndex
|
|--------------------------------------------------------------------------
*/

export const deleteAlbumImage = async (req, res) => {
  try {
    const {
      id,
      imageIndex,
    } = req.params;

    const index = Number(imageIndex);

    if (!Number.isInteger(index) || index < 0) {
      return res.status(400).json({
        error: "Invalid image index",
      });
    }

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({
        error: "Album not found",
      });
    }

    if (index >= album.images.length) {
      return res.status(404).json({
        error: "Image not found",
      });
    }

    /*
     * Get image URL
     */

    const imageUrl = album.images[index];

    /*
     * Remove image from MongoDB array
     */

    album.images.splice(index, 1);

    await album.save();

    /*
     * Delete image from Cloudinary
     */

    await deleteCloudinaryImage(
      imageUrl
    );

    res.status(200).json({
      message: "Photo deleted successfully",
      album,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete photo",
      details: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| Delete complete album
|--------------------------------------------------------------------------
*/

export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({
        error: "Album not found",
      });
    }

    /*
     * Delete every image from Cloudinary
     */

    for (const imageUrl of album.images) {
      await deleteCloudinaryImage(
        imageUrl
      );
    }

    /*
     * Delete album from MongoDB
     */

    await album.deleteOne();

    res.status(200).json({
      message:
        "Album and associated images deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete album",
      details: error.message,
    });
  }
};