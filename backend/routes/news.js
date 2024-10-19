const express = require("express");
const router = express.Router();
const News = require("../models/News");

// * Get all news ====================================================================
router.get("/", async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send("Error fetching news");
  }
});

// * Create a new article ====================================================================
router.post("/news/create", async (req, res) => {
  try {
    const {
      id,
      headline,
      subHeadline,
      category,
      content,
      date,
      image: { src, srcset },
      url,
      author: { name, profileUrl },
      location,
      tags,
      keywords,
      comments,
      // : [{ name: authorName, date: commentDate, content: commentContent }],
    } = req.body;

    const article = new News({
      id,
      headline,
      subHeadline,
      category,
      content,
      date,
      image: { src, srcset },
      url,
      author: { name, profileUrl },
      location,
      tags,
      keywords,
      comments,
      // : [{ name: authorName, date: commentDate, content: commentContent }],
    });
    await article.save();
    res.status(201).send("News created");
  } catch (error) {
    res.status(500).send("Error creating new");
  }
});

// // Edit an existing new
// router.put("/edit/:id", async (req, res) => {
//   try {
//     const { id, alias, email, phone, logo, ice } = req.body;

//     const updatedNew = await News.findByIdAndUpdate(
//       req.params.id,
//       {
//         id,
//         alias,
//         email,
//         phone,
//         logo,
//         ice,
//       },
//       { new: true }
//     );

//     if (!updatedNew) {
//       return res.status(404).send("News not found");
//     }

//     res.status(200).send("News updated");
//   } catch (error) {
//     res.status(500).send("Error updating new");
//   }
// });

// // Delete an existing new
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const deletedNew = await News.findByIdAndDelete(req.params.id);

//     if (!deletedNew) {
//       return res.status(404).send("News not found");
//     }

//     res.status(200).send("News deleted");
//   } catch (error) {
//     res.status(500).send("Error deleting new");
//   }
// });

module.exports = router;
