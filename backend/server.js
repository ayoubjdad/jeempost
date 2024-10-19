const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const userRoutes = require("./routes/users");
const articlesRoutes = require("./routes/articles");
const invoiceRoutes = require("./routes/invoices");

const app = express();
const PORT = process.env.PORT || 3000;

const CONNECTION_STRING =
  "mongodb+srv://ayoubjdad1:O6sdnvt1j8MjIbqp@bigfocus.lx7trmo.mongodb.net/?retryWrites=true&w=majority&appName=bigFocus";
const DATABASENAME = "bigFocus";

app.use(cors()); // Add CORS middleware
app.use(bodyParser.json()); // Add body parser middleware to parse JSON

// Connect to MongoDB
mongoose
  .connect(CONNECTION_STRING, {
    dbName: DATABASENAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// app.use("/users", userRoutes);
app.use("/articles", articlesRoutes);
app.use("/invoices", invoiceRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
