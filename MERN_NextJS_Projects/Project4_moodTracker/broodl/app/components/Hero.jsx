"use client";
import Link from "next/link"; // Corrected import for Link
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard";
const Hero = () => {
  const isAuthenticate = useSelector((state) => state.logged.value);
  return (
    <div className="py-4 md:py-10 flex flex-col gap-4 sm:gap-8">
      <h1 className="font-black text-5xl md:text-6xl sm:text-7xl text-center italic">
        <span className="textGradient">Broodl! </span>
        helps you track your
        <span className="textGradient"> daily </span>
        progress.
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center mt-5">
        Create your mood record and see how you feel on <br />
        <span className="font-semibold">every day of every year.</span>
      </p>
      {isAuthenticate ? (
        <Dashboard />
      ) : (
        <div className="w-full sm:w-[70%] mx-auto grid grid-cols-2 gap-5 sm:gap-10">
          {/* Login button */}
          <div className="">
            <Link href="/login" className="w-full" style={{ width: "100%" }}>
              <Button text="Login" dark full />
            </Link>
          </div>
          {/* Signup button */}
          <div className="">
            <Link href="/login" className="w-full" style={{ width: "100%" }}>
              <Button text="Sign Up" full />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
