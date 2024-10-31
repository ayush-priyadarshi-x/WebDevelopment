import mongoose from "mongoose";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optional because `select: false` means it might not always be present
  role?: "user" | "admin"; // Optional with default value
  image?: string;
  authProviderId?: string;
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // It's good practice to ensure emails are unique
  },
  password: {
    type: String,
    select: false, // This will prevent the password from being included in queries by default
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  image: {
    type: String,
  },
  authProviderId: {
    type: String,
  },
});

// Use the correct case when checking for the existing model
const user =
  (mongoose.models.user as mongoose.Model<User>) ||
  mongoose.model("User", userSchema);

export { user };
