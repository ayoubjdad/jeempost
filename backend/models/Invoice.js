const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  customer_address: String,
  customer_alias: String,
  invoiceDetails_date: Date,
  invoiceDetails_ice: String,
  invoiceDetails_number: Number,
  items: Array,
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
