"use client"; // Make sure this is the first line
import { useState, useEffect } from "react";

const Client = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("The current count is: " + count);
  }, [count]);

  return (
    <>
      <button
        className="rounded-lg bg-indigo-600 text-white"
        onClick={() => {
          setCount((prevCount) => prevCount + 1); // Use functional update
        }}
      >
        +
      </button>
      <p className="font-black text-indigo-600">Counter: {count}</p>
      <button
        className="rounded-lg bg-indigo-600 text-white"
        onClick={() => {
          setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0)); // Prevent negative count
        }}
      >
        -
      </button>
      <button
        className="rounded-lg bg-red-600 text-white mt-2" // Optional reset button
        onClick={() => {
          setCount(0); // Reset count to 0
        }}
      >
        Reset
      </button>
    </>
  );
};

export default Client;
