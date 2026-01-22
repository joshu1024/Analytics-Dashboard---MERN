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

    // ✅ Total Revenue
    const revenue = await Transaction.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } },
    ]);

    const mrr = revenue[0]?.total || 0;

    // ✅ Monthly Revenue Chart
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
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueChart = monthlyRevenue.map((item) => ({
      month: months[item._id - 1],
      revenue: item.totalRevenue,
    }));

    // ✅ Recent Activities (last 5)
    const recentTransactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentUsers = await userModel.find().sort({ createdAt: -1 }).limit(5);

    const recentActivity = [
      ...recentTransactions.map((t) => ({
        type: "transaction",
        message: `Payment of ${t.amount} ${t.currency} by ${t.user?.name || "User"}`,
        time: t.createdAt,
      })),
      ...recentUsers.map((u) => ({
        type: "user",
        message: `New user registered: ${u.name || u.email}`,
        time: u.createdAt,
      })),
    ]
      .sort((a, b) => b.time - a.time)
      .slice(0, 5);

    res.json({
      totalUsers,
      activeUsers,
      churnRate,
      mrr,
      revenueChart,
      recentActivity, // ✅ send activity
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard KPIs" });
  }
};
