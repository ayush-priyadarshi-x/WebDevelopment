const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    enum: ["chef", "owner", "waiter"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
const person = mongoose.model("Person", personSchema);
module.exports = person;
