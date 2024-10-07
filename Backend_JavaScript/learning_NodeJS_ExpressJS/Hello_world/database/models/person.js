const mongoose = require("mongoose");

//------------Defining the Schema of the person
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
    enum: ["chef", "waiter", "manager"],
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
});
const person = mongoose.model("person", personSchema);
module.exports = person;
