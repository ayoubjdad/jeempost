const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find(); // Fetch all articles from the database
    res.status(200).json(articles); // Respond with the articles in JSON format
  } catch (error) {
    res.status(500).send("Error fetching articles");
  }
});

// Create an article
router.post("/create", async (req, res) => {
  try {
    const { title, content, category, date, image, author } = req.body;

    const newArticle = new Article({
      title,
      content,
      category,
      date,
      image,
      author,
    });
    await newArticle.save();
    res.status(201).send("Article created");
  } catch (error) {
    res.status(500).send("Error creating article");
  }
});

// Edit an existing article
router.put("/edit/:id", async (req, res) => {
  try {
    const { id, alias, email, phone, logo, ice } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        id,
        alias,
        email,
        phone,
        logo,
        ice,
      },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).send("Article not found");
    }

    res.status(200).send("Article updated");
  } catch (error) {
    res.status(500).send("Error updating article");
  }
});

// Delete an existing article
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).send("Article not found");
    }

    res.status(200).send("Article deleted");
  } catch (error) {
    res.status(500).send("Error deleting article");
  }
});

module.exports = router;
