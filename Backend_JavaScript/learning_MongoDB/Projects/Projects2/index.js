const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1/shop";
mongoose.connect(uri);
// Creating Schema
const products = mongoose.schema();
