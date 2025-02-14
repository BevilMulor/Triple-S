import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI as string, ); 
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${(error as Error).message}`);
//     process.exit(1);
//   }
// };

app.listen(PORT, () => {
  console.log(`Server is running on port now ${PORT}`);
});
// export default connectDB;
