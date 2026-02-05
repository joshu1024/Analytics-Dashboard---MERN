import userModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const total = await userModel.countDocuments();
  const users = await userModel
    .find()
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  res.json({ users, page, total, totalPages: Math.ceil(total / limit) });
};

export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ erro: "User not found" });
  }
  user.role = role;
  user.save();
  res.json(user);
};
export const toggleUserStatus = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.isActive = !user.isActive;
  await user.save();
  res.json(user);
};
