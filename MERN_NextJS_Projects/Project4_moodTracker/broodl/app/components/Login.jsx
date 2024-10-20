"use client";
import { useRouter } from "next/navigation";
import API from "@/app/api/axios";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { Fugaz_One } from "next/font/google";
import { setLoggedIn } from "@/features/logged/logged"; // Make sure to import your action
import { setUserData } from "@/features/user/user"; // Make sure to import your action

const Fugaz_One_Init = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const Login = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  // Initialize useForm hook
  const {
    register, // Register fields
    handleSubmit, // Handle form submission
    formState: { errors }, // Form validation errors
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    const { email, password } = data; // Use 'data' instead of 'formData'
    try {
      const res = await API.post(
        "/login",
        { email: email, password: password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status >= 200 && res.status < 300) {
        dispatch(setLoggedIn());
        const { data } = res.data;
        dispatch(setUserData(data));
        router.push("/");
      } else {
        console.log("There was some error.");
      }

      console.log("Response:", res.data); // Handle the response as needed
    } catch (error) {
      console.log("Error:", error); // Log the error
    }
  };

  return (
    <>
      <div className={`flex flex-col gap-4 flex-1 justify-center items-center`}>
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
            placeholder="Enter your password"
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

          {/* Submit Button */}
          <div className="max-w-[400px] w-full">
            <Button text="Submit" full type="submit" />
          </div>
        </form>

        <p className="text-center text-sm sm:text-md md:text-xl">
          Don't have an account?
          <span className="text-indigo-600">
            <Link href={"/signup"} className="border-none mx-2 font-base">
              {" "}
              Sign Up
            </Link>{" "}
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
