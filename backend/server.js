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
// Fix __dirname and __filename
// ------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ------------------------
// Initialize Express
// ------------------------
const app = express();

// ------------------------
// Configure Cloudinary
// ------------------------
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ------------------------
// Start Server Function
// ------------------------
const startServer = async () => {
  try {
    // --- Connect to MongoDB ---
    await connectDB();
    console.log("MongoDB connected successfully");

    // --- Middleware ---
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

    // --- Static folders ---
    app.use("/Uploads", express.static(join(__dirname, "Uploads")));
    app.use("/public", express.static(join(__dirname, "public")));
    app.use("/resumes", express.static(join(__dirname, "public")));

    // --- API Routes (MUST COME BEFORE `app.get("*")`) ---
    app.use("/api/admin", adminRoutes);
    app.use("/api/joblistings", jobListingRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/applications", applicationRoutes);
    app.use("/api/slides", slideRoutes);
    app.use("/api/candidate", candidateRoutes);
    app.use("/api/albums", albumRoutes);

    // --- Health check ---
    app.get("/api/health", (req, res) => {
      res.status(200).json({ status: "OK", time: new Date().toISOString() });
    });

    // --- SERVE FRONTEND (PRODUCTION ONLY) ---
    if (process.env.NODE_ENV === "production") {
      const frontendPath = join(__dirname, "../frontend/dist");

      // Serve static assets
      app.use(express.static(frontendPath));

      // SPA Fallback: MUST BE LAST
      app.get("*", (req, res) => {
        res.sendFile(join(frontendPath, "index.html"));
      });
    }

    // --- Global Error Handler ---
    app.use((err, req, res, next) => {
      console.error("Error Stack:", err.stack);
      res
        .status(err.status || 500)
        .json({ message: err.message || "Something went wrong!" });
    });

    // --- Start Server ---
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} - ${new Date().toLocaleString(
          "en-IN",
          { timeZone: "Asia/Kolkata" }
        )}`
      );
    });
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
};

// ------------------------
// Start the App
// ------------------------
startServer();