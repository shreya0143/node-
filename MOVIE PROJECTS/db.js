const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/movieApp");
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database Error:", error);
    }
}


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number
});

const User = mongoose.model("User", userSchema);

module.exports = { connectDB, User };
