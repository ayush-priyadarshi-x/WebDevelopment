import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("MongoDB server was successfully connected.");
    });
    db.on("error", () => {
      console.log("There was an error while connecting to the MongoDB server.");
    });
    db.on("disconnected", () => {
      console.log("MongoDB server was disconnected.");
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log("An unknown error occurred.");
    }
    process.exit(1);
  }
};

export default connectDB;
