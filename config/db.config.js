require("dotenv").config();

const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
