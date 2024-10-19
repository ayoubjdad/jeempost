const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");

// Get all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find(); // Fetch all invoices from the database
    res.status(200).json(invoices); // Respond with the invoices in JSON format
  } catch (error) {
    res.status(500).send("Error fetching invoices");
  }
});

// Create an article
router.post("/create", async (req, res) => {
  try {
    const {
      customer_address,
      customer_alias,
      invoiceDetails_date,
      invoiceDetails_ice,
      invoiceDetails_number,
      items,
    } = req.body;

    const newInvoice = new Invoice({
      customer_address,
      customer_alias,
      invoiceDetails_date,
      invoiceDetails_ice,
      invoiceDetails_number,
      items,
    });
    await newInvoice.save();
    res.status(201).send("Invoice created");
  } catch (error) {
    res.status(500).send("Error creating invoice");
  }
});

// Edit an existing invoice
router.put("/edit/:id", async (req, res) => {
  try {
    const {
      customer_address,
      customer_alias,
      invoiceDetails_date,
      invoiceDetails_ice,
      invoiceDetails_number,
      items,
    } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        customer_address,
        customer_alias,
        invoiceDetails_date,
        invoiceDetails_ice,
        invoiceDetails_number,
        items,
      },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).send("Invoice not found");
    }

    res.status(200).send("Invoice updated");
  } catch (error) {
    res.status(500).send("Error updating invoice");
  }
});

// Delete an existing invoice
router.delete("/delete/:invoiceDetails_number", async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(
      req.params.invoiceDetails_number
    );

    if (!deletedInvoice) {
      return res.status(404).send("Invoice not found");
    }

    res.status(200).send("Invoice deleted");
  } catch (error) {
    res.status(500).send("Error deleting invoice");
  }
});

module.exports = router;
