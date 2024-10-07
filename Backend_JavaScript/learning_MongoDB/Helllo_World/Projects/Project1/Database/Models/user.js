/*==================================Importing Dependencies=================================*/
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const bcrypt = require("bcrypt");
const { type } = require("os");
const { deflate } = require("zlib");
/*================================End Importing Dependencies===============================*/
/*=======================================Actual Code=======================================*/
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  voterNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  place: {
    type: String,
    required: true,
  },
  isVote: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["Voter", "Admin"],
    default: "Voter",
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", async function (next) {
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

userSchema.methods.correctPassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
const user = mongoose.model("user", userSchema);
module.exports = user;
