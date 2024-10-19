// // const express = require("express");
// // const mongoose = require("mongoose");

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // const CONNECTION_STRING =
// //   "mongodb+srv://ayoubjdad1:O6sdnvt1j8MjIbqp@bigfocus.lx7trmo.mongodb.net/?retryWrites=true&w=majority&appName=bigFocus";
// // const DATABASENAME = "bigFocus";

// // // Connect to MongoDB
// // mongoose
// //   .connect(CONNECTION_STRING, {
// //     dbName: DATABASENAME,
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => console.log("Connected to MongoDB"))
// //   .catch((err) => console.error("Failed to connect to MongoDB", err));

// // app.get("/", (req, res) => {
// //   res.send("Hello World");
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 3000;

// const CONNECTION_STRING =
//   "mongodb+srv://ayoubjdad1:O6sdnvt1j8MjIbqp@bigfocus.lx7trmo.mongodb.net/?retryWrites=true&w=majority&appName=bigFocus";
// const DATABASENAME = "bigFocus";

// // CORS
// app.use(cors());

// // Middleware
// app.use(bodyParser.json({ limit: "50mb" })); // Increase limit to handle large PDFs

// // Connect to MongoDB
// mongoose
//   .connect(CONNECTION_STRING, {
//     dbName: DATABASENAME,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));

// // Invoice schema and model
// const invoiceSchema = new mongoose.Schema({
//   pdf: String, // Base64 string of the PDF
//   invoiceDetails_number: String,
//   customer_alias: String,
//   invoiceDetails_date: String,
//   invoiceDetails_ice: String,
//   items: Array,
// });

// const Invoice = mongoose.model("Invoice", invoiceSchema);

// // Route to save an invoice
// app.post("/api/invoices", async (req, res) => {
//   console.log(req.body); // Log the request body
//   try {
//     const {
//       pdf,
//       invoiceDetails_number,
//       customer_alias,
//       invoiceDetails_date,
//       invoiceDetails_ice,
//       items,
//     } = req.body;
//     const newInvoice = new Invoice({
//       pdf,
//       invoiceDetails_number,
//       customer_alias,
//       invoiceDetails_date,
//       invoiceDetails_ice,
//       items,
//     });
//     await newInvoice.save();
//     res.status(201).json({ message: "Invoice saved successfully" });
//   } catch (error) {
//     console.error(error); // Log the error
//     res.status(500).json({ error: "Failed to save invoice" });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
