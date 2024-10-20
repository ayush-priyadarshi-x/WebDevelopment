import Calendar from "@/app/components/Calendar";
import API from "../api/axios";
import { Fugaz_One } from "next/font/google";
import { useSelector } from "react-redux";
const Fugaz_One_Init = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

function getTodayDate() {
  const today = new Date();

  // Get components of the date
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months should be 1-indexed
  const day = String(today.getDate()).padStart(2, "0"); // Days are 1-indexed

  // Return the date in YYYY-MM-DD format
  return { year: year, month: month, day: day };
}

const Dashboard = () => {
  const moods = {
    Cry: "😭",
    Sad: "🥲",
    Existing: "😑",
    Good: "😀",
    Elated: "😍",
  };
  const isAuthenticate = useSelector((state) => state.logged.value);

  const data = useSelector((state) => state.data.value);

  const handleOnFeelingSet = async (moodIndex) => {
    const { year, month, day } = getTodayDate(); // Call getTodayDate function here
    const response = await API.post("/calendar/post", {
      User_Id: data._id,
      calendarData: [
        { year: year, month: month, day: day, mood: moodIndex + 1 },
      ],
    });
    console.log(response);
  };

  let date = new Date();
  const statuses = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: date.toDateString(),
  };

  return (
    <>
      <div className="flex flex-col flex-1 gap-10 sm:gap-11 md:gap-12">
        <div className="grid grid-cols-3 bg-indigo-50 ">
          {Object.keys(statuses).map((status, statusIndex) => {
            return (
              <div key={statusIndex} className="p-2 sm:p-4 ">
                <p
                  className={`uppercase font-medium text-indigo-400 p-2 sm:p-4 truncate`}
                >
                  {status.replaceAll("_", " ")}
                </p>
                <p
                  className={`font-bolder text-sm sm:text-lg text-indigo-600 p-2 sm:p-4 truncate ${Fugaz_One_Init.className}`}
                >
                  {statuses[status]}
                </p>
              </div>
            );
          })}
        </div>
        <h4
          className={`text-5xl sm:text-6xl md:text-7xl text-center ${Fugaz_One_Init.className}`}
        >
          How do you <span className="textGradient ">feel</span> today?{" "}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.keys(moods).map((mood, moodIndex) => {
            return (
              <button
                key={moodIndex}
                onClick={() => handleOnFeelingSet(moodIndex)} // Use an arrow function to pass moodIndex
                className={`p-4 hover:bg-[lavendar] duration-200 rounded-lg purpleShadow flex flex-col justify-center items-center gap-2  sm:gap-3 md:gap-4 ${
                  moodIndex === 4 && "col-span-2 sm:col-span-1"
                }`}
              >
                <p className="text-4xl sm:text-5xl md:text-6xl">
                  {moods[mood]}
                </p>
                <p
                  className={`${Fugaz_One_Init.className} text-indigo-600 font-black `}
                >
                  {mood}
                </p>
              </button>
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          {isAuthenticate && <Calendar />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
