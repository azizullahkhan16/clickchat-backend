import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, DB_LOCAL, DB_CUSTOMDEV, DB_ATLAS } = process.env as {
  NODE_ENV: string;
  DB_LOCAL: string;
  DB_CUSTOMDEV: string;
  DB_ATLAS: string;
};

const DB: Record<string, string> = {
  development: DB_ATLAS,
  // development: DB_LOCAL,
  // development: DB_CUSTOMDEV,
  customdev: DB_ATLAS,
  live: DB_ATLAS,
};

const connectDB = async (): Promise<void> => {
  try {
    const uri = DB[NODE_ENV];
    if (!uri) {
      throw new Error(`No DB URI found for environment: ${NODE_ENV}`);
    }

    await mongoose.connect(uri);
    console.log("Connected to Database Successfully");
  } catch (err) {
    console.error("Error in Database Connection", err);
    process.exit(1); // Exit process on DB failure
  }
};

export { connectDB };
