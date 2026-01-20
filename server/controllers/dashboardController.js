import Transaction from "../models/Transaction.js";
import userModel from "../models/userModel.js";

export const getDashboardKPIs = async (req, res) => {
  const totalUsers = await userModel.countDocuments();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const activeUsers = await userModel.countDocuments({
    lastLogin: { $gte: sevenDaysAgo },
  });
  const revenue = await Transaction.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  res.json({
    totalUsers,
    activeUsers,
    revenue: revenue[0]?.total || 0,
  });
};
