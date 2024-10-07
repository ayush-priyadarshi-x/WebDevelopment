/*====================================Importing Dependencies===================================*/
const express = require("express");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const candidate = require("./../Database/Models/candidate");
/*==================================End Importing Dependencies=================================*/

/*==========================================Actual Code========================================*/
const router = express.Router();
router.get("/getCandidates", async (req, res) => {
  try {
    const candidates = await candidate
      .find({}, { _id: 0, name: 1, age: 1, place: 1, party: 1, role: 1 })
      .sort({ voteCount: -1 });
    res.status(200).json({ candidateName: candidates });
  } catch (error) {
    console.log(error);
    res.status(500).json("Couldn't find the candidates name.");
  }
});
router.post("/signup", async (req, res) => {
  try {
    const candidateData = req.body;
    const newCandidate = candidate(candidateData);
    const response = await newCandidate.save();
    const payload = {
      id: response.id,
      name: response.name,
      party: response.party,
      role: response.role,
      password: response.password,
    };
    const token = generateToken(payload);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json("User couldn't be saved");
  }
});
/*=========================================End Actual Code=====================================*/

/*============================================Exporting========================================*/
module.exports = router;
/*==========================================End Exporting======================================*/
