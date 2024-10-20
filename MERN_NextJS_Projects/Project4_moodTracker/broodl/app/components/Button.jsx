import React from "react";

const Button = ({ text, dark, full }) => {
  const color = dark ? "text-white bg-indigo-600" : "text-indigo-600";
  const size = full ? "w-full" : ""; // Removed grid class unless necessary
  return (
    <button
      className={`overflow-hidden duration-200 hover:opacity-60 rounded-full border-2 border-solid border-indigo-600 text-lg sm:text-2xl md:text-xl p-4 ${color} ${size}`}
    >
      {text}
    </button>
  );
};

export default Button;
