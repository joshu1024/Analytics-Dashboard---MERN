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
    const page = parseInt(req.query.page) ?? 1;
    const limit = parseInt(req.query.limit) ?? 10;
    const skip = (page - 1) * limit;
    const total = await Company.countDocuments();
    const companies:ICompany[] = await Company.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.json({ companies, page, total, totalPages: Math.ceil(total / limit) });
    return
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch recent events"
     res.status(500).json({ message });
  }
};
export const createCompany = async (req:Request<{},ICompany,CreateCompanyBody>, res:Response):Promise<void> => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
    return
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch recent events"
     res.status(500).json({ message });
  }
};

