import userModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.json(users);
};
