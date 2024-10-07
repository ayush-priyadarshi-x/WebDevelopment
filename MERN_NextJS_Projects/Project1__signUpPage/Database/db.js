/* ============================== Importing Dependencies ============================= */
const mongoose = require("mongoose");
require("dotenv").config();
/* ============================ End Importing Dependencies =========================== */
const mongoUrl = process.env.MONGOURL || "mongodb://localhost:27017/test";
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("MongoDB connected Successfully");
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
db.on("error", () => {
  console.log("MongoDB couldn't be connected");
});
module.exports = db; /*---------- Exporting db ----------*/
