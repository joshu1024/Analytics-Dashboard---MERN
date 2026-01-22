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
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } },
    ]);
    const mrr = revenue[0]?.total || 0;
    const monthlyRevenue = await Transaction.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: { $toDouble: "$amount" } },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const revenueChart = monthlyRevenue.map((item) => ({
      month: months[item._id - 1],
      revenue: item.totalRevenue,
    }));
    res.json({
      totalUsers,
      activeUsers,
      churnRate,
      mrr,
      revenueChart,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard KPIs" });
  }
};
