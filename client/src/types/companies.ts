export type CompanyStatus = "Active" | "Pending" | "Inactive";

export interface Company{
  _id:string,  
  name: string;
  industry: string;
  status: CompanyStatus
  plan: string;
}

export interface CompanyResponse{
    companies: Company[],
    page: number,
    total: number,
    totalPages: number,
}