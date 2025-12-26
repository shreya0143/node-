import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "./utils/db.js";
import User from "./model/user.model.js";
import Company from "./model/company.model.js";

import applicationRoute from "./routes/application.js";
import jobRoute from "./routes/job.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/application", applicationRoute);
app.use("/api/job", jobRoute);

// ================= AUTH MIDDLEWARE =================
const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ================= REGISTER =================
app.post("/api/auth/register", async (req, res) => {
  const { fullname, email, phoneNumber, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashed,
    role,
  });

  res.json({ message: "Registered" });
});

// ================= LOGIN =================
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, { httpOnly: true }).json({
    message: "Login Success",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
  });
});

// ================= COMPANY =================
app.post("/api/company", auth, async (req, res) => {
  const company = await Company.create({
    ...req.body,
    userId: req.userId,
  });

  res.json({ company });
});

app.get("/api/company", auth, async (req, res) => {
  const company = await Company.findOne({ userId: req.userId });
  res.json({ company });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
