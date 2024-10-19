const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

module.exports = router;
