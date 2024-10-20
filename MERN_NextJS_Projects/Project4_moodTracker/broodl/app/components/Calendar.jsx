"use client";
import API from "../api/axios";
import React, { useState, useEffect } from "react";
import { Fugaz_One } from "next/font/google";
import { useSelector } from "react-redux";

const Fugaz_One_Init = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

function getTodayDate() {
  const today = new Date();

  // Get components of the date
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0"); // Days are 1-indexed

  // Return the date in YYYY-MM-DD format
  return { year: year, month: month, day: day };
}

async function getColor(data, setCalendarArr) {
  try {
    const response = await API.post(
      "/calendar/get",
      {
        data: data,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      console.log("Calendar Data: ", response.data);
      const { data } = response.data;
      setCalendarArr(data);
    } else {
      console.log("There was some error.");
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

function convertMonth(input) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (typeof input === "number") {
    if (input < 1 || input > 12) {
      return "Invalid month number. Please enter a number between 1 and 12.";
    }
    return months[input - 1];
  } else if (typeof input === "string") {
    const monthIndex = months.findIndex(
      (month) => month.toLowerCase() === input.toLowerCase()
    );
    if (monthIndex === -1) {
      return "Invalid month name. Please enter a valid month name.";
    }
    return monthIndex + 1;
  } else {
    return "Invalid input. Please enter a month as a number (1-12) or a string.";
  }
}

function getMonthInfo(month, year) {
  const firstDate = new Date(year, month - 1, 1);
  const numDays = new Date(year, month, 0).getDate();
  const firstDayOfWeek = firstDate.getDay();

  return {
    days: numDays,
    firstDay: firstDayOfWeek,
  };
}

const Calendar = () => {
  const data = useSelector((state) => state.data.value);

  const [calendarArr, setCalendarArr] = useState([]);
  const [date, setDate] = useState(getTodayDate());
  const [monthDetails, setMonthDetails] = useState({
    numDays: 30,
    firstDay: 1,
  });

  useEffect(() => {
    const { year, month } = getTodayDate();
    setDate({ year: year, month: parseInt(month) });
    if (data) {
      getColor(data, setCalendarArr);
      console.log("User Data: ", data);
      console.log("Email Data: ", data.email);
    }
  }, [data]);

  useEffect(() => {
    const { year, month } = date;
    const { days, firstDay } = getMonthInfo(month, year);
    setMonthDetails({ numDays: days, firstDay: firstDay });
  }, [date]);

  function handleOnDecrement() {
    const { year, month } = date;
    let newMonth = month - 1;
    if (newMonth < 1) {
      setDate({ year: year - 1, month: 12 });
    } else {
      setDate({ year: year, month: newMonth });
    }
  }

  function handleOnIncrement() {
    const { year, month } = date;
    let newMonth = month + 1;

    if (newMonth > 12) {
      setDate({ year: year + 1, month: 1 });
    } else {
      setDate({ year: year, month: newMonth });
    }
  }

  return (
    <>
      <div className="w-full max-w-[1000px]">
        <div>
          <h1
            className={`text-indigo-600 font-black text-center text-2xl my-5 ${Fugaz_One_Init.className}`}
          >
            {convertMonth(date.month)} {date.year}
          </h1>
        </div>
        <div className="flex justify-between w-full my-5">
          <button
            className="rounded-lg bg-indigo-100 font-black text-xl p-3 max-h-[50px]"
            onClick={handleOnDecrement}
          >
            {"<"}
          </button>
          <button
            className="rounded-lg bg-indigo-100 font-black text-xl p-3 max-h-[50px]"
            onClick={handleOnIncrement}
          >
            {">"}
          </button>
        </div>
        <div className="grid grid-rows-6 grid-cols-7 gap-4">
          <div className="text-indigo-300 truncate text-sm sm:text-lg md:text-xl text-center">
            Sunday
          </div>
          <div className="text-indigo-300 truncate text-sm sm:text-lg md:text-xl text-center">
            Monday
          </div>
          <div className="text-indigo-300 truncate text-sm sm:text-lg md:text-xl text-center">
            Tuesday
          </div>
          <div className="text-indigo-300 truncate text-sm sm:text-lg md:text-xl text-center">
            Wednesday
          </div>
          <div className="text-indigo-300 truncate text-sm sm:text-lg md:text-xl text-center">
            Thursday
          </div>
          <div className="text-indigo-300 truncate text-sm sm:text-lg md:text-xl text-center">
            Friday
          </div>
          <div className="text-indigo-300 truncate text-sm sm:text-lg md:text-xl text-center">
            Saturday
          </div>
          {Array.from({
            length: monthDetails.numDays + monthDetails.firstDay,
          }).map((_, dayNum) => {
            const { year, month, day } = getTodayDate();
            const dayIndex = dayNum - monthDetails.firstDay + 1;
            let isToday =
              year == date.year && month == date.month && day == dayIndex;

            const colorDate = {
              year: date.year,
              month: date.month,
              day: dayIndex,
            };

            const dayData = calendarArr.find(
              (element) =>
                element.year === colorDate.year &&
                element.month === colorDate.month &&
                element.day === colorDate.day
            );

            let mood;
            if (dayData) {
              switch (dayData.mood) {
                case 1:
                  mood = " bg-indigo-100 ";
                  break;
                case 2:
                  mood = " bg-indigo-200 ";
                  break;
                case 3:
                  mood = " bg-indigo-300";
                  break;
                case 4:
                  mood = " bg-indigo-400 ";
                  break;
                case 5:
                  mood = " bg-indigo-500 ";
                  break;
                default:
                  mood = " bg-indigo-500 ";
              }
            } else {
              mood = " bg-indigo-50 ";
            }

            console.log("Calendar Array: ", calendarArr);

            return dayIndex > 0 && dayIndex <= monthDetails.numDays ? (
              <div
                key={dayNum}
                className={`rounded-lg p-2 text-center text-xl font-bold ${
                  isToday
                    ? "bg-orange-200 text-red-600"
                    : `${mood} text-indigo-600`
                }`}
              >
                {dayIndex}
              </div>
            ) : (
              <div key={dayNum} className="rounded-lg p-2"></div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Calendar;
