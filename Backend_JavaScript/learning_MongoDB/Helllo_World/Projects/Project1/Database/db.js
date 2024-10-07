/*====================================Importing Dependencies===================================*/
const mongoose = require("mongoose");
require("dotenv").config();
/*==================================End Importing Dependencies=================================*/
/*==========================================Actual Code========================================*/
const mongoUrl = process.env.MONGOURL;
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("MongoDB server connected successfully.");
});
db.on("disconnected", () => {
  console.log("MongoDB server disconnected.");
});
db.on("error", () => {
  console.log("MongoDB server couldn't be connected.");
});
/*=========================================End Actual Code=======================================*/
/*============================================Exporting==========================================*/
module.exports = db;
/*==========================================End Exporting========================================*/
