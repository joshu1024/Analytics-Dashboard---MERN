import Transaction from "../models/Transaction.js";
import Subscription from "../models/Subscription.js";

export const getBillingOverview = async (req, res) => {
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const revenueResult = await Transaction.aggregate([
    {
      $match: { createdAt: { $gte: startOfMonth }, status: "success" },
    },
    {
      $group: { _id: null, totalRevenue: { $sum: "$amount" } },
    },
  ]);

  const monthlyRevenue = revenueResult[0]?.totalRevenue || 0;

  const subscriptionStats = await Subscription.aggregate([
    {
      $group: { _id: "$status", count: { $sum: 1 } },
    },
  ]);

  const subcriptions = {
    active: 0,
    cancelled: 0,
    trialing: 0,
  };
  subscriptionStats.forEach((s) => {
    subcriptions[s._id] = s.count;
  });

  const recentTransactions = await Transaction.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "fullName email");

  res.status(200).json({ subcriptions, monthlyRevenue, recentTransactions });
};
