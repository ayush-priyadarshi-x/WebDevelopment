/* --------------Dependencies------------- */
const express = require("express");
const app = express();
const db = require("./database/db");
const personRoutes = require("./routes/expressRoutes.js");
const updateData = require("./routes/update.js");
const deleteData = require("./routes/delete.js");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json()); //Body Parser
app.use("/person", personRoutes);
app.use("/update", updateData);
app.use("/delete", deleteData);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Successfully created.");
});
