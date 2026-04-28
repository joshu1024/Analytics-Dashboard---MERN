import Company, { ICompany } from "../models/Company"
import { Request,Response } from "express";
interface CreateCompanyBody{
  name: string;
  industry?: string;
  status?: "Active" | "Pending" | "Inactive";
  plan?:string;
}
interface CompanyQuery{
  page?:string,
  limit?:string
}
export const getCompanies = async (req:Request<{},{},{},CompanyQuery>, res:Response):Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page ?? "1"));
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit ?? "10")));
    const skip = (page - 1) * limit;
    const total = await Company.countDocuments();
    const companies:ICompany[] = await Company.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.json({ companies, page, total, totalPages: Math.ceil(total / limit) });
    } catch (err) {
   const message = err instanceof Error ? err.message : "Failed to create company"
     res.status(500).json({ message });
  }
};
export const createCompany = async (req:Request<{},ICompany,CreateCompanyBody>, res:Response):Promise<void> => {
  try {
    const { name, industry, status, plan } = req.body;
    if (!name) {
      res.status(400).json({ message: "Company name is required" });
      return;
    }
    const company = await Company.create({ name, industry, status, plan });
    res.status(201).json(company);
    return
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create company"
     res.status(500).json({ message });
  }
};

