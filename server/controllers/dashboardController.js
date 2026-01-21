import Transaction from "../models/Transaction.js";
import userModel from "../models/userModel.js";

export const getDashboardKPIs = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activeUsers = await userModel.countDocuments({
      lastLogin: { $gte: sevenDaysAgo },
    });
    const inactiveUsers = totalUsers - activeUsers;
    const churnRate =
      totalUsers === 0
        ? 0
        : Number(((inactiveUsers / totalUsers) * 100).toFixed(2));
    const revenue = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } },
    ]);

    res.json({
      totalUsers,
      activeUsers,
      churnRate,
      mrr: revenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard KPIs" });
  }
};
