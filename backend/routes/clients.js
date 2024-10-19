const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// router.post("/create", async (req, res) => {
//   try {
//     const { id, alias, email, phone, logo, ice } = req.body;

//     const newClient = new Client({
//       id,
//       alias,
//       email,
//       phone,
//       logo,
//       ice,
//     });
//     await newClient.save();
//     res.status(201).send("Client created");
//   } catch (error) {
//     res.status(500).send("Error creating client");
//   }
// });

// Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find(); // Fetch all clients from the database
    res.status(200).json(clients); // Respond with the clients in JSON format
  } catch (error) {
    console.error("❌", error);
    res.status(500).send("Error fetching clients");
  }
});

// // Edit an existing client
// router.put("/edit/:id", async (req, res) => {
//   try {
//     const { id, alias, email, phone, logo, ice } = req.body;

//     const updatedClient = await Client.findByIdAndUpdate(
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

//     if (!updatedClient) {
//       return res.status(404).send("Client not found");
//     }

//     res.status(200).send("Client updated");
//   } catch (error) {
//     res.status(500).send("Error updating client");
//   }
// });

// // Delete an existing client
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const deletedClient = await Client.findByIdAndDelete(req.params.id);

//     if (!deletedClient) {
//       return res.status(404).send("Client not found");
//     }

//     res.status(200).send("Client deleted");
//   } catch (error) {
//     res.status(500).send("Error deleting client");
//   }
// });

module.exports = router;
