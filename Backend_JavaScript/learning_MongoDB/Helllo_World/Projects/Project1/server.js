/*====================================Importing Dependencies===================================*/
const db = require("./Database/db");
const passport = require("./auth");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/userRoutes");
const candidateRoutes = require("./Routes/candidateRoutes");
require("dotenv").config();
/*==================================End Importing Dependencies=================================*/
/*==========================================Actual Code========================================*/
const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
const PORT = process.env.PORT || 3000;
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);
app.listen(PORT, () => {
  console.log("Listening to the port number 8000");
});
/*=========================================End Actual Code=====================================*/
/*============================================Exporting========================================*/
/*==========================================End Exporting======================================*/
