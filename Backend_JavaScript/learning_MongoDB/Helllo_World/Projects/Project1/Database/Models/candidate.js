/*==================================Importing Dependencies=================================*/
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const bcrypt = require("bcrypt");
const { type } = require("os");
const { deflate } = require("zlib");
/*================================End Importing Dependencies===============================*/
/*=======================================Actual Code=======================================*/
const candidateSchema = new mongoose.Schema({
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
  party: {
    type: String,
    enum: ["BJP", "Congress", "AAP", "TMC"],
  },
  role: {
    type: String,
    enum: ["Head", "Member"],
    default: "Member",
  },
  password: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});
candidateSchema.pre("save", async function (next) {
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

candidateSchema.methods.correctPassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
const candidate = mongoose.model("candidate", candidateSchema);
module.exports = candidate;
