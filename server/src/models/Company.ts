import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  industry: string;
  status: "Active" | "Pending" | "Inactive";
  plan: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const companySchema = new Schema<ICompany>(
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
  { timestamps: true }
);

const Company = mongoose.model<ICompany>("Company", companySchema);
export default Company;
