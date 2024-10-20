const express = require("express");
const user = require("./../database/models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const person = req.body; // Use req.body directly
  try {
    // Check if the email already exists
    const existingUser = await user.findOne({ email: person.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." }); // Conflict
    }

    // Create a new user
    const newPerson = new user(person);
    await newPerson.save();

    return res
      .status(201)
      .json({ message: "User created successfully!", data: newPerson }); // Created
  } catch (error) {
    // Log the error for debugging
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ message: "The data couldn't be stored.", error: error.message });
  }
});

module.exports = router;
