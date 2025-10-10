import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import { extname } from "path";

//
// 📌 Image / Video Upload Storage
//
const mediaStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    const isVideo = ["mp4", "webm"].includes(fileExtension);

    return {
      folder: "ss-infotech",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4", "webm"],
      public_id: `${Date.now()}-${file.originalname}`,
      resource_type: isVideo ? "video" : "image",
    };
  },
});

export const upload = multer({
  storage: mediaStorage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB limit
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|mp4|webm/;
    const extnameValid = filetypes.test(file.originalname.split(".").pop().toLowerCase());
    const mimetypeValid = filetypes.test(file.mimetype);

    if (extnameValid && mimetypeValid) {
      return cb(null, true);
    }
    cb(new Error("Only images (JPG, PNG, JPEG, WEBP) and videos (MP4, WEBM) are allowed"));
  },
});

//
// 📌 Resume Upload Storage (PDF, DOC, DOCX)
//

// const resumeStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "resumes",
//       allowed_formats: ["pdf", "doc", "docx"],
//       public_id: `${Date.now()}-${file.originalname}`,
//       resource_type: "raw", // required for non-image/video files
//     };
//   },
// });
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const safeName = file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\.-]/g, "");

    return {
      folder: "resumes",
      resource_type: "raw",
      type: "upload",         // ensure it's a standard uploaded file
      access_mode: "public",  // make it public
      use_filename: true,     // let Cloudinary keep original name (optional)
      unique_filename: false, // prevent random IDs
      allowed_formats: ["pdf", "doc", "docx"],
      public_id: `${Date.now()}-${safeName}`,

    };
  },
});




export const resumeUpload = multer({
  storage: resumeStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const ext = extname(file.originalname).toLowerCase().slice(1);
    const mimetypeValid = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.mimetype);

    if (filetypes.test(ext) && mimetypeValid) {
      return cb(null, true);
    }
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  },
});

// ✅ Multer setup for Excel file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

export const excelUpload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
      return cb(new Error("Only Excel files are allowed"));
    }
    cb(null, true);
  },
});

