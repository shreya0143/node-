import express from "express";
import Job from "../model/job.model.js";

const router = express.Router();

/* ================= CREATE JOB ================= */
router.post("/", async (req, res) => {
  try {
    const { title, role, companyId } = req.body;

    const job = await Job.create({
      title,
      role,
      companyId,
    });

    res.status(201).json({
      message: "Job created",
      job,
    });
  } catch (err) {
    res.status(500).json({ message: "Job create failed" });
  }
});

/* ================= GET ALL JOBS ================= */
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

/* ================= GET COMPANY JOBS ================= */
router.get("/company/:companyId", async (req, res) => {
  try {
    const jobs = await Job.find({
      companyId: req.params.companyId,
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Error fetching company jobs" });
  }
});

export default router;
