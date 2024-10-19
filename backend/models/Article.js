const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    date: Date,
    image: String,
    author: String,
  }
  // { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
