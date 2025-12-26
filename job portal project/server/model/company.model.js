import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: String,
  descripation: String,
  website: String,
  location: String,
  logo: String,
  userId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model("Company", companySchema);
