const express = require("express");
const log = require("./routes/login");
const sign = require("./routes/signin");
const path = require("path");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");

const app = express();
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/", (req, res) => {
  res.render("layout");
});
app.use("/login", log);
app.use("/login", sign);
app.listen(3000, () => {
  console.log("Listening to the port number 8000");
});
