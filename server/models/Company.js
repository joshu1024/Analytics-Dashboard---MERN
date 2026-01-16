import mongoose from "mongoose";
const companySchema = new mongoose.Schema(
  {
    name: { type: String },
    industry: { type: String },
    status: {
      type: String,
      enum: ["Active", "Pendig", "Suspended"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
const Company = mongoose.model("Company", companySchema);
export default Company;
