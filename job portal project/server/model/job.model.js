import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    role: String,
    companyId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
