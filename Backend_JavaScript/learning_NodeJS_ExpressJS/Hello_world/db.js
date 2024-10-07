const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/Students";
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Mongoose connected successfully.");
  // Perform a find operation
  Student.find({}, (err, students) => {
    if (err) {
      console.error("Error occurred during find operation:", err);
    } else {
      console.log("Found students:", students);
    }
  });
});
db.on("error", () => {
  console.log("There was an error.");
});
db.on("disconnected", () => {
  console.log("Mongoose disconnected.");
});

// Define a Mongoose schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = db;
