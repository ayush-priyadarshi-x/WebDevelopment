import mongoose, { Schema, Document } from "mongoose";

// Message interface and schema
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// User interface and schema
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    trim: true, // Fixed typo here
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required."],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required."],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [messageSchema],
});

// Check for existing model and avoid recompilation error
const userModel =
  mongoose.models.User || mongoose.model<User>("mstry-message", userSchema);
export default userModel;
