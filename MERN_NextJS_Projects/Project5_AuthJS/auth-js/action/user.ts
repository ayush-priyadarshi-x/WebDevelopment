"use server";

import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import { user } from "@/models/User"; // Ensure you import the correct User model
import { CredentialsSignin } from "next-auth";
import { signIn } from "next-auth/react";

const login = async (formData: FormData) => {
  const email = (await formData.get("email")) as string;
  const password = (await formData.get("password")) as string;
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
};

const register = async (formData: FormData) => {
  // Hash the password
  const rawPassword = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(rawPassword, 10); // Hashing with bcrypt

  const payLoad = {
    firstName: formData.get("firstname") as string,
    lastName: formData.get("lastname") as string,
    email: formData.get("email") as string,
    password: hashedPassword, // Use the hashed password
  };

  try {
    await connectDB(); // Ensure DB connection is established
    const newPerson = new user(payLoad); // Create a new user instance
    await newPerson.save(); // Save the user to the database
    console.log("Person successfully saved.");
  } catch (error) {
    console.error(`Error saving person: ${error}`);
  }
};

export { register, login };
