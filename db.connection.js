import dotenv from "dotenv"; // Import dotenv as an ES module
import {connect} from "mongoose";

// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGO_URI;

async function connectToDatabase() {
  try {
    await connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the connect function
connectToDatabase();
