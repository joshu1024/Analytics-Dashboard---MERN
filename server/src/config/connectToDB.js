const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_DB_URL);
    if (connection) {
      console.log("Connected to database");
    } else {
      console.log("failed to connect to the database");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToDB;
