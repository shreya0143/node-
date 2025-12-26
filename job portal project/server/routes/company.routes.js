import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE COMPANY
router.post("/", auth, async (req, res) => {
  const { name, descripation, website, location, } = req.body;

  try {
    const company = await Company.create({
      name,
      descripation,
      website,
      location,
    //   logo,
    //   userId: req.userId,
    });

    res.status(201).json({ company });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Company creation failed" });
  }
});

// GET COMPANY (YOUR CODE)
router.get("/", auth, async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.userId });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ company });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
