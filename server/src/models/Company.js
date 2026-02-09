const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    industry: { type: String, default: "General" },
    status: {
      type: String,
      enum: ["Active", "Pending", "Inactive"],
      default: "Pending",
    },
    plan: { type: String, default: "Basic" },
  },
  { timestamps: true },
);
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
