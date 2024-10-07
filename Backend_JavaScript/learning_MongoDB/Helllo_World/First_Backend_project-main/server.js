/* --------------Dependencies------------- */
const express = require("express");
const app = express();
const db = require("./database/db");
const personRoutes = require("./routes/expressRoutes.js");
const updateData = require("./routes/update.js");
const deleteData = require("./routes/delete.js");
const bodyParser = require("body-parser");
const passport = require("./auth.js");
app.use(bodyParser.json()); //Body Parser

app.use(passport.initialize());
/* ---------------MiddleWare--------------- */
const logrequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}]: At this time the URL ${req.originalURL}`
  );
  next();
};
/*----------------------------------------- */
app.use(logrequest);
app.get("/", passport.authenticate("local", { session: false }), (req, res) => {
  res.send("Welcome to our Services.");
});
app.use("/person", personRoutes);
app.use("/update", updateData);
app.use("/delete", deleteData);

app.listen(8000, () => {
  console.log("Server Successfully created.");
});
