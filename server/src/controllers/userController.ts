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

export const getUsers = async (req:Request<{},{},{},PaginationQuery>, res:Response<{users:IUsermodel[],page:number,total:number,totalPages:number} | {message:string}>):Promise<void> => {
try {
  const page = Math.max(1,parseInt(req.query.page ?? "1"));
  const limit = Math.max(10,parseInt(req.query.limit ?? "5")) ;
  const skip = (page - 1) * limit;
  const[total,users] = await Promise.all([
    userModel.countDocuments(),
    userModel
    .find()
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
  ])

  res.json({ users, page, total, totalPages: Math.ceil(total / limit) });
  }catch (err: unknown) {
   const message = err instanceof Error ? err.message : "Failed to fetch users";
    res.status(500).json({ message });
}
};
export const updateUserRole = async (req:Request<UserParams,{},UpdateUserRoleBody>, res:Response<IUsermodel | {error:string}>):Promise<void> => {
 try {
  const { role } = req.body;

  if (!["admin", "user"].includes(role)) {
    res.status(400).json({ error: "Invalid role" });
    return;
  }
  const user = await userModel.findById(req.params.id);
  if (!user) {
     res.status(404).json({ error: "User not found" });
     return
  }
  user.role = role;
  await user.save();
  res.json(user);
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
      err instanceof Error ? err.message : "Failed to toggle user status";
    res.status(500).json({ error: message });
  }
};


