const express = require("express");
const User = require("./../database/models/user"); // Consider renaming for clarity

const router = express.Router();

router.post("/", async (req, res) => {
  // Specify endpoint
  const data = req.body;

  try {
    // Check if the user exists by email
    const person = await User.findOne({ email: data.email });

    if (!person) {
      return res.status(404).json({ message: "The person doesn't exist." });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await person.correctPassword(data.password); // Compare with req.body.password

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." }); // 401 for unauthorized
    }

    // Password matched, send back user data (excluding sensitive info if necessary)
    return res.status(200).json({
      message: "Login successful.",
      data: person,
    });
  } catch (error) {
    // Handle any errors
    console.error("Login error:", error); // Log error for debugging
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
