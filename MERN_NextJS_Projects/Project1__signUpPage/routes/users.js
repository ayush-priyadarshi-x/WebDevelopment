/* ============================== Importing Dependencies ============================= */
const express = require("express");
const person = require("./../Database/modles/person");
/* ============================ End Importing Dependencies =========================== */

/* ==================================== Actual Code ================================== */
const router = express.Router();
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", async (req, res) => {
  try {
    const data = await req.body;
    if (data.password != data.confirmPassword) {
      return res.send("<h1>Password Doesn't Match</h1>");
    }
    const newPerson = new person(data);
    await newPerson.save();
    res.redirect("/users/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Data couldn't be saved" });
  }
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", async (req, res) => {
  const data = await req.body;
  console.log(data);
  try {
    if (!data) {
      return res.send("<h1>Please Enter the data</h1>");
    }
    const personData = await person.findOne({ email: data.email });
    const isPasswordMatch = await personData.correctPassword(data.password);
    if (!isPasswordMatch) {
      return res.send("<h1>Password is incorrect</h1>");
    }
    const name = personData.name;
    res.render("dashboard", { name: name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Data couldn't be found" });
  }
});
/* ================================= End Actual Code ================================= */
module.exports = router;
