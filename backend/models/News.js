const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    id: String,
    headline: String,
    subHeadline: String,
    category: String,
    content: String,
    date: Date,
    image: {
      src: String,
      srcset: String,
    },
    url: String,
    author: {
      name: String,
      profileUrl: String,
    },
    location: String,
    tags: [String],
    keywords: [String],
    comments: [
      {
        author: {
          name: String,
          profileUrl: String,
        },
        date: Date,
        content: String,
      },
    ],
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
