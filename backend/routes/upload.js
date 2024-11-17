const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// * Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // * Unique filename
  },
});

const upload = multer({ storage });

// Endpoint to list all uploaded images
router.get("/images", (req, res) => {
  const uploadsDir = path.join(__dirname, "uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).json({ error: "Could not retrieve images" });
    }

    // Return a list of image URLs
    const imageUrls = files.map((file) => `/uploads/${file}`);
    res.json({ images: imageUrls });
  });
});

// * Define the route for uploading an image
router.post("/upload/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
