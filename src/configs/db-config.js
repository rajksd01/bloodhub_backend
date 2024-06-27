import config from "./ServerConfigs.js";
import mongoose from "mongoose";
const connectionToDB = async () => {
  try {
    const connection = await mongoose.connect(config.DB_PORT);
    if (connection) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    throw error;
  }
};

export default connectionToDB;
