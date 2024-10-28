"use server";

import connectDB from "@/lib/db";
import { user } from "@/models/User"; // Ensure you import the correct User model

const register = async (formData: FormData) => {
  const payLoad = {
    firstName: formData.get("firstname") as string,
    lastName: formData.get("lastname") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
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

export { register };
