const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next(); // Only hash if the password is new or modified
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(person.password, salt);
    person.password = hashedPass; // Set the hashed password
    next(); // Call next after setting the hashed password
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

// Method to compare the entered password with the stored hashed password
userSchema.methods.correctPassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch; // Return whether the passwords match
  } catch (error) {
    throw error; // Throw error if comparison fails
  }
};

const user = mongoose.model("loggers", userSchema);
module.exports = user;
