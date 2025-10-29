// ------------------------
// Load environment variables
// ------------------------
import dotenv from "dotenv";
dotenv.config();

// ------------------------
// Core dependencies
// ------------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

// ------------------------
// Initialize app
// ------------------------
const app = express();

// ------------------------
// Middleware
// ------------------------
app.use(cors());
app.use(express.json());

// ------------------------
// MongoDB Connection
// ------------------------
const MONGODB_URI = process.env.MONGODB_URI || "your-mongodb-connection-string";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// ------------------------
// Path setup for frontend
// ------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Point to frontend build folder
const frontendPath = join(__dirname, "../frontend/dist");

// Serve static frontend files
app.use(express.static(frontendPath));

// ------------------------
// Health check route
// ------------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", time: new Date().toISOString() });
});

// ------------------------
// Catch-all route (for React Router)
// ------------------------
app.get("*", (req, res) => {
  res.sendFile(join(frontendPath, "index.html"));
});

// ------------------------
// Global Error Handler
// ------------------------
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ------------------------
// Start Server
// ------------------------
const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT} - ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}`
      );
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
};

startServer();
