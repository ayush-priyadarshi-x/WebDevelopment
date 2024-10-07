const express = require("express");
const router = express.Router();
const person = require("./../database/models/person");
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updateData = req.body;
    const response = await person.findByIdAndUpdate(personId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Person not found." });
    }
    console.log("Data Uploaded");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(response);
  }
});
module.exports = router;
