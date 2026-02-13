import mongoose from "mongoose";

export const connectToDB = async (): Promise<void> => {
  if (!process.env.MONGO_DB_URL) {
    throw new Error("MONGO_DB_URL is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("✅ Connected to database");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Database connection failed: ${error.message}`);
    }
    process.exit(1);
  }
};


