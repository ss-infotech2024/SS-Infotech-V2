// --- Load environment variables ---
import dotenv from 'dotenv';
dotenv.config(); // Always load .env first

// --- Import dependencies ---
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cloudinary from 'cloudinary';

// --- Import local modules ---
import connectDB from './config/db.js';
import jobListingRoutes from './routes/jobListingRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import slideRoutes from './routes/slideRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import albumRoutes from './routes/albumRoutes.js';

// --- Fix __dirname and __filename for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- Initialize Express app ---
const app = express();

// --- Configure Cloudinary ---
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Connect to MongoDB ---
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    // --- Middleware ---
    app.use(cors({
      origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : ['http://localhost:5173', 'http://localhost:5174'],
      credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // --- Static folders ---
    app.use("/Uploads", express.static(join(__dirname, "Uploads")));
    app.use("/public", express.static(join(__dirname, "public")));
    app.use("/resumes", express.static(join(__dirname, "public")));

    // --- API Routes ---
    app.use("/api/admin", adminRoutes);
    app.use("/api/joblistings", jobListingRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/applications", applicationRoutes);
    app.use("/api/slides", slideRoutes);
    app.use("/api/candidate", candidateRoutes);
    app.use("/api/albums", albumRoutes);

    // --- Serve frontend (React/Vite build) ---
    if (process.env.NODE_ENV === "production") {
      const frontendPath = join(__dirname, "frontend", "dist");
      app.use(express.static(frontendPath));

      app.get("*", (req, res) => {
        res.sendFile(join(frontendPath, "index.html"));
      });
    }

    // --- Start server ---
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT} at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
      );
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
};

startServer();

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});