/* ============================== Importing Dependencies ============================= */
const path = require("path");
const express = require("express");
const db = require("./Database/db");
const expressLayout = require("express-ejs-layouts");
const users = require("./routes/users");
const indexPage = require("./routes/index");
const bodyParser = require("body-parser");

require("dotenv").config();
/* ============================ End Importing Dependencies =========================== */

/* ==================================== Actual Code ================================== */
//Ejs
const app = express(); /*--------- Initializing Express --------*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// app.use("/", (req, res) => [res.render("welcome")]);
app.use("/", indexPage);
app.use("/users", users);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening to the port number: ${PORT}`);
});
/* ================================= End Actual Code ================================= */
