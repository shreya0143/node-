require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");

const app = express();

// connect db
connection();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
