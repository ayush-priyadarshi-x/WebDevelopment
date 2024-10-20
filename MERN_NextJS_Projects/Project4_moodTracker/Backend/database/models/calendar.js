const mongoose = require("mongoose");

// Schema for each entry in the calendar
const calendarEntrySchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  mood: {
    type: Number, // Mood for the day, ranging from 1 to 5
    required: true,
    min: 1,
    max: 5, // Enforcing that mood is between 1 and 5
  },
});

// Schema for the overall calendar data
const calendarDataSchema = new mongoose.Schema({
  User_Id: {
    type: String, // User identifier
    required: true,
  },
  calendarArray: {
    type: [calendarEntrySchema], // An array of calendar entries (days with mood)
    required: true,
  },
});

const Calendar = mongoose.model("Calendar", calendarDataSchema);
module.exports = Calendar;
