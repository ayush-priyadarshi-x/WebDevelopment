const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const mongoURL = process.env.MONGOURL || "mongodb://localhost:27017/test";
mongoose.connect(mongoURL);

const db = mongoose.connection;
db.on("connected", () => {
  console.log("MongoDB connected successfully");
});
db.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});
db.on("error", (error) => {
  console.log("MongoDB connected successfully", error);
});

module.exports = db;
