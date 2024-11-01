import mongoose from "mongoose";

// Interface to manage connection state
interface Connected {
  isConnected?: number;
}

// Singleton connection object to track connection state
const connection: Connected = {};

export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database already connected.");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");

    // Log the connection status and update the state
    connection.isConnected = db.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("DB connected successfully.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
