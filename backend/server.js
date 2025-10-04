import dotenv from 'dotenv';
dotenv.config(); // Load .env variables at the top

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/db.js';
import jobListingRoutes from './routes/jobListingRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import slideRoutes from './routes/slideRoutes.js';
import cloudinary from 'cloudinary'; // Import Cloudinary

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/Uploads", express.static(join(__dirname, "Uploads")));
app.use("/public", express.static(join(__dirname, "public")));

app.use("/api/joblistings", jobListingRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/slides", slideRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`);
});