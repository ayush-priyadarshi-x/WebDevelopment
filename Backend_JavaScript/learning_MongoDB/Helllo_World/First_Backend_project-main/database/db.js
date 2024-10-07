const mongoose = require("mongoose");

//----------------Define MongoURL
const mongoUrl = "mongodb+srv://ante0076:3691@cluster0.afp2mvx.mongodb.net/";
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
