// Backend/src/controller/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// paths are relative to src/controller/
const connectDB = require("../config/db");
const corsConfig = require("../config/corsConfig");
const noteRoutes = require("../routes/noteRoutes");

dotenv.config();

const app = express();

// CORS + body parsing
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/notes", noteRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Server error",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
