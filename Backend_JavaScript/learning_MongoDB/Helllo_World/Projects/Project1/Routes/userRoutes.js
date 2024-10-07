/*====================================Importing Dependencies===================================*/
const express = require("express");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const user = require("./../Database/Models/user");
/*==================================End Importing Dependencies=================================*/

/*==========================================Actual Code========================================*/
const router = express.Router();
router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = user(userData);
    const response = await newUser.save();
    const payload = {
      id: response.id,
      name: response.name,
      voterNumber: response.voterNumber,
      isVote: response.isVote,
      password: response.password,
    };
    const token = generateToken(payload);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json("User couldn't be saved");
  }
});
router.get();
/*=========================================End Actual Code=====================================*/

/*============================================Exporting========================================*/
module.exports = router;
/*==========================================End Exporting======================================*/
