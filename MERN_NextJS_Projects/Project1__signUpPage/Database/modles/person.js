/* ============================== Importing Dependencies ============================= */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/* ============================ End Importing Dependencies =========================== */

/* ==================================== Actual Code ================================== */
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
/*-------------- Hashing Password --------------*/
personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(person.password, salt);
    person.password = hashedPass;
    next();
  } catch (error) {
    return next(error);
  }
});
/*-------------- Checking Password --------------*/

personSchema.methods.correctPassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
/* ================================= End Actual Code ================================= */

const person = mongoose.model("loggers", personSchema);
module.exports = person;
