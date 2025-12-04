const mongoose = require("mongoose");

module.exports = () => {
  try {
    mongoose.connect(process.env.DB);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection Failed", error);
  }
};
