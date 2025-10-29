// ------------------------
// Load environment variables
// ------------------------
import dotenv from "dotenv";
dotenv.config();

// ------------------------
// Core dependencies
// ------------------------
import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

// ------------------------
// Local modules
// ------------------------
import connectDB from "./config/db.js";
import jobListingRoutes from "./routes/jobListingRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import slideRoutes from "./routes/slideRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";

// ------------------------
// Fix __dirname
// ------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ------------------------
// Initialize Express
// ------------------------
const app = express();

// ------------------------
// Cloudinary
// ------------------------
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ------------------------
// Start Server
// ------------------------
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    // Middleware
    app.use(
      cors({
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URL
            : ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
      })
    );
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Static
    app.use("/Uploads", express.static(join(__dirname, "Uploads")));
    app.use("/public", express.static(join(__dirname, "public")));
    app.use("/resumes", express.static(join(__dirname, "public")));

    // API Routes
    app.use("/api/admin", adminRoutes);
    app.use("/api/joblistings", jobListingRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/applications", applicationRoutes);
    app.use("/api/slides", slideRoutes);
    app.use("/api/candidate", candidateRoutes);
    app.use("/api/albums", albumRoutes);

    // Health
    app.get("/api/health", (req, res) => {
      res.json({ status: "OK", time: new Date().toISOString() });
    });

    // ------------------------------
    // PRODUCTION: Serve Frontend
    // ------------------------------
    if (process.env.NODE_ENV === "production") {
      const frontendPath = join(__dirname, "../frontend/dist"); // ← CORRECT

      // Serve static files
      app.use(express.static(frontendPath));

      // SPA fallback (MUST BE LAST)
      app.get("/*", (req, res) => {
        res.sendFile(join(frontendPath, "index.html")); // ← FIXED: No nested /index.html
      });
    }

    // Error Handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(err.status || 500).json({ message: err.message || "Error" });
    });

    // Start
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

startServer();