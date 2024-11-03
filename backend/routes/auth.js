// routes/auth.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "User invalid" });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "User invalid" });
    }

    // Generate a token or create a session here (optional)
    // For example: const token = jwt.sign({ id: user._id }, 'your_jwt_secret');

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// User Registration Route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      password, // Password will be hashed in the User model
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
