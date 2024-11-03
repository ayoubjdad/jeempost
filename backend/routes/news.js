const express = require("express");
const News = require("../models/news"); // Adjust the path as needed
const router = express.Router();

// Route to get all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Route to get a single news article by ID
router.get("/:id", async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: "News article not found" });
    }
    res.status(200).json(newsItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news article" });
  }
});

// Route to post a new news article
router.post("/", async (req, res) => {
  const newsData = req.body;
  try {
    const news = new News(newsData);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to create news article" });
  }
});

module.exports = router;
