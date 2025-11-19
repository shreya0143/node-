const express = require("express");
const cors = require("cors");
const { connectDB, User } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());


connectDB();



app.post("/add", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ message: "User Added", data: newUser });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



app.delete("/delete/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User Deleted", data: deletedUser });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



app.listen(5000, () => {
    console.log("Server running on port 5000");
});
