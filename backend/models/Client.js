const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  id: String,
  alias: String,
  email: String,
  phone: String,
  logo: String,
  ice: String,
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
