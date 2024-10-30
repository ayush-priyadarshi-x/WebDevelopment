import mongoose from "mongoose";

interface connected {
  isConnected?: number;
}

const connection: connected = {};

export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database already connected. ");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");

    console.log(`db: ${db}`);
    console.log(`db.connection: ${db.connection}`);
    console.log(`db.connections: ${db.connections}`);

    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully. ");
  } catch (error) {
    console.log(`There was some error while connecting to the mongoDB server, 
            Error
            ${error} `);
  }
}
