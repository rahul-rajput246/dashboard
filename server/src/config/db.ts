import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer: MongoMemoryServer | null = null;

const getMongoUri = async (): Promise<string> => {
  if (process.env.MONGO_URI) {
    return process.env.MONGO_URI;
  }

  memoryServer = await MongoMemoryServer.create();
  return memoryServer.getUri();
};

const connectDB = async () => {
  try {
    const mongoUri = await getMongoUri();
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected${process.env.MONGO_URI ? "" : " (memory server)"}`);
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();

  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
};

export default connectDB;
