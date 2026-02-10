import Subscription from  "../models/Subscription"
import Transaction from  "../models/Transaction"
import userModel from  "../models/userModel"

const getDashboardKPIs = async (req, res) => {
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
     ...recentTransactions.map((t) => {
  let userName = "User";

  // Narrow the type
  if (typeof t.user === "object" && "fullName" in t.user) {
    userName = t.user.fullName;
  }

  return {
    type: "transaction",
    message: `Payment of ${t.amount} ${t.currency} by ${userName}`,
    time: t.createdAt,
  };
}),
      ...recentUsers.map((u) => ({
        type: "user",
        message: `New user registered: ${u.fullName || u.email}`,
        time: u.createdAt,
      })),
    ]
     .sort(
  (a, b) =>
    (b.time?.getTime() ?? 0) - (a.time?.getTime() ?? 0))

      .slice(0, 5);

    const planStats = await Subscription.aggregate([
      {
        $group: {
          _id: "$plan",
          count: { $sum: 1 },
        },
      },
    ]);

    const planBreakDown = planStats.map((item) => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      value: item.count,
    }));
    const growth = await userModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const data = growth.map((item) => ({
      month: months[item._id - 1],
      users: item.users,
    }));
    res.json({
      totalUsers,
      activeUsers,
      churnRate,
      mrr,
      revenueChart,
      recentActivity,
      planBreakDown,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch dashboard KPIs" });
  }
};
module.exports = {
  getDashboardKPIs,
};
