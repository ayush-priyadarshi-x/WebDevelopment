import mongoose from "mongoose";

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

// Change the model name to 'User'

const user = mongoose.model("authUsers", userSchema);
export { user };
