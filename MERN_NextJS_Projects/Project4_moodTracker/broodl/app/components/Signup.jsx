"use client";
import API from "@/app/api/axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Button from "./Button";
import { Fugaz_One } from "next/font/google";

const Fugaz_One_Init = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const Signup = () => {
  const dispatch = useDispatch(); // Dispatch for Redux actions

  // Initialize useForm hook
  const {
    register, // Register fields
    handleSubmit, // Handle form submission
    formState: { errors }, // Form validation errors
    watch, // To watch password field value
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (formData) => {
    const { email, password, name } = formData; // Destructure name from formData
    console.log(name, email, password); // Log the values

    try {
      // Send the API request with name included
      const res = await API.post(
        "/signup",
        {
          name: name, // Add the name to the request payload
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status < 250) console.log("Everything perfect");
      console.log("Response:", res.data, res.message); // Handle the response as needed
    } catch (error) {
      console.log("Error:", error); // Handle the error as needed
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 flex-1 justify-center items-center">
        <div
          className={`flex flex-col justify-center items-center ${Fugaz_One_Init.className} gap-5`}
        >
          <h3 className="text-4xl sm:text-5xl md:text-6xl">Login / Register</h3>
          <p className="text-lg sm:text-2xl">You're one step ahead.</p>
        </div>

        {/* Form with react-hook-form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-5 flex flex-col gap-3 max-w-[400px] w-full"
        >
          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 border-2 border-indigo-400 w-full rounded-full duration-200 hover:border-indigo-600 focus:border-indigo-600"
            {...register("name", {
              required: "Name is required", // Validation for name
            })}
          />
          {/* Error message for name */}
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          {/* Email Input */}
          <input
            type="text"
            placeholder="Enter your email"
            className="p-2 border-2 border-indigo-400 w-full rounded-full duration-200 hover:border-indigo-600 focus:border-indigo-600"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {/* Error message for email */}
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Create a password"
            className="p-2 border-2 border-indigo-400 w-full rounded-full duration-200 hover:border-indigo-600 focus:border-indigo-600"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {/* Error message for password */}
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm your password"
            className="p-2 border-2 border-indigo-400 w-full rounded-full duration-200 hover:border-indigo-600 focus:border-indigo-600"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => {
                return value === watch("password") || "Passwords do not match";
              },
            })}
          />
          {/* Error message for confirm password */}
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          {/* Submit Button */}
          <div className="max-w-[400px] w-full">
            <Button text="Submit" full type="submit" />
          </div>
        </form>

        <p className="text-center text-sm sm:text-md md:text-xl">
          Already have an account?
          <span className="text-indigo-600">
            <Link href={"/login"} className="border-none mx-2 font-base">
              {" "}
              Login
            </Link>{" "}
          </span>
        </p>
      </div>
    </>
  );
};

export default Signup;
