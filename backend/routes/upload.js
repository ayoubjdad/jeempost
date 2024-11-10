const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Image upload route
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ fileUrl });
});

module.exports = router;
