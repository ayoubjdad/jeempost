require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const path = require("path");

const uploadRoutes = require("./routes/upload"); // Assuming upload.js contains the upload route
const newsRoutes = require("./routes/news");

const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DATABASENAME = process.env.DATABASENAME;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(CONNECTION_STRING, {
    dbName: DATABASENAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Routes
app.use("/news", newsRoutes);
app.use("/api", uploadRoutes); // This mounts the upload routes under "/api/upload"

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
