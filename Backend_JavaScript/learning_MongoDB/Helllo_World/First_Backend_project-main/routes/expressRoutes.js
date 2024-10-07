const express = require("express");
require("dotenv").config();
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const router = express.Router();
const person = require("./../database/models/person");
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Directly accessing the request body
    const newPerson = new person(data); // Creating a new person object
    const response = await newPerson.save(); // Saving the new person object
    const payload = {
      id: response.id,
      name: response.name,
      age: response.age,
      email: response.email,
    };
    const token = generateToken(payload);
    res
      .status(200)
      .json({ response: response, payload: payload, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Data couldn't be saved." });
  }
});
router.get("/", async (req, res) => {
  try {
    const wholeData = await person.find();
    res.status(200).json(wholeData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Data couldn't be found." });
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (["chef", "waiter", "manager"].includes(workType)) {
      const response = await person.find({ profession: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "There is no data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't find" });
  }
});

module.exports = router;
