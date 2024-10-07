const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/Students";
mongoose.connect(mongoURL, {});
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Mongoose connected successfully.");
});
db.on("error", () => {
  console.log("There was an error.");
});
db.on("disconnected", () => {
  console.log("Mongoose disconnected.");
});
module.exports = db;
