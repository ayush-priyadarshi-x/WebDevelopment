const express = require("express");
const user = require("./../database/models/user");
const Calendar = require("./../database/models/calendar");

const router = express.Router();

router.post("/get", async (req, res) => {
  const { email } = req.body;
  try {
    const userRecord = await user.findOne({ email: email });
    if (!userRecord) {
      return res.status(404).json({ message: "User not found." });
    }

    const userId = userRecord._id;
    let userData = await Calendar.findOne({ User_Id: userId });

    if (!userData) {
      userData = new Calendar({
        User_Id: userId,
        calendarArray: [],
      });
      await userData.save(); // Save the new calendar
      return res.status(200).json({
        message: "There was no data, now it has been created.",
        data: userData,
      });
    }

    res.status(200).json({
      message: "The data was successfully retrieved.",
      data: userData.calendarArray,
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error on the server.",
      error: error.message,
    });
  }
});

router.post("/post", async (req, res) => {
  const { User_Id, calendarData } = req.body;

  try {
    const person = await user.findOne({ _id: User_Id });
    if (!person) {
      return res.status(404).json({ message: "User does not exist." });
    }

    let existingCalendar = await Calendar.findOne({ User_Id });

    if (existingCalendar) {
      existingCalendar.calendarArray.push(...calendarData);
    } else {
      existingCalendar = new Calendar({
        User_Id,
        calendarArray: calendarData,
      });
    }

    await existingCalendar.save();

    return res.status(200).json({
      message: "Calendar data updated successfully",
      data: existingCalendar,
    });
  } catch (error) {
    console.error("Error saving calendar data:", error);
    return res.status(500).json({
      message: "An error occurred while saving calendar data.",
      error: error.message,
    });
  }
});

module.exports = router;
