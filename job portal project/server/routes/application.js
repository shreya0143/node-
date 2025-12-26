import express from "express";
import Application from "../model/application.model.js";

const router = express.Router();

/* ================= APPLY JOB ================= */
router.post("/apply", async (req, res) => {
  try {
    const { userId, jobId, jobTitle, name, email, coverLetter } = req.body;

    const already = await Application.findOne({ userId, jobId });
    if (already) {
      return res.status(400).json({ message: "Already applied" });
    }

    const app = await Application.create({
      userId,
      jobId,
      jobTitle,
      name,
      email,
      coverLetter
    });

    res.status(201).json({
      message: "Applied successfully",
      application: app,
    });
  } catch {
    res.status(500).json({ message: "Apply failed" });
  }
});

/* ================= MY APPLICATIONS ================= */
router.get("/my/:userId", async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.params.userId });
    res.json(apps);
  } catch {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

/* ================= COMPANY APPLICANTS ================= */
router.get("/company/:companyId", async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("userId", "fullname email")
      .populate("jobId", "title role");

    // filter by company
    const filtered = apps.filter(
      (a) => a.jobId?.companyId?.toString() === req.params.companyId
    );

    res.json(filtered);
  } catch {
    res.status(500).json({ message: "Error fetching applicants" });
  }
});

export default router;
