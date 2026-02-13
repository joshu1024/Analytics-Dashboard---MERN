import userModel, { IUsermodel } from"../models/userModel";
import { Request,Response } from "express";

interface PaginationQuery{
  page?:string,
  limit?:string
}
interface UpdateUserRoleBody{
  role: "admin" | "user",
}

interface UserParams{
  id:string
}

export const getUsers = async (req:Request<{},{},{},PaginationQuery>, res:Response<{users:IUsermodel[],page:number,total:number,totalPages:number}>):Promise<void> => {
try {
  const page = parseInt(req.query.page ?? "1") ;
  const limit = parseInt(req.query.limit ?? "5") ;
  const skip = (page - 1) * limit;

  const total = await userModel.countDocuments();
  const users = await userModel
    .find()
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  res.json({ users, page, total, totalPages: Math.ceil(total / limit) });
  return
} catch (err:unknown) {
  const message = err instanceof Error ? err.message : "Failed to fetch  users"
  res.status(500).json({
    users:[],
    page:1,
    total:0,
    totalPages:0
  })
}
};

export const updateUserRole = async (req:Request<UserParams,{},UpdateUserRoleBody>, res:Response<IUsermodel | {error:string}>):Promise<void> => {
 try {
   const { role } = req.body;
  const user = await userModel.findById(req.params.id);
  if (!user) {
     res.status(404).json({ error: "User not found" });
     return
  }
  user.role = role;
  await user.save();
  res.json(user);
  return
 } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update role";
    res.status(500).json({ error: message });
  }
};
export const toggleUserStatus = async (req:Request<UserParams>, res:Response<IUsermodel | {error:string}>):Promise<void> => {
 try {
   const user = await userModel.findById(req.params.id);
  if (!user) {
     res.status(404).json({ error: "User not found" });
     return
  }
  user.isActive = !user.isActive;
  await user.save();
  res.json(user);
  return
 } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update role";
    res.status(500).json({ error: message });
  }
};


