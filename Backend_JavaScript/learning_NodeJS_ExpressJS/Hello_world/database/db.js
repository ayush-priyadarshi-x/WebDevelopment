const mongoose = require("mongoose");
require("dotenv").config();
//----------------Define MongoURL
const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected Successfully");
});
db.on("disconnected", () => {
  console.log("Connection disconnected");
});
db.on("error", () => {
  console.log("Error");
});
module.exports = db;
