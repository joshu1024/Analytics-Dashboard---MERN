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

  const subscriptions = {
    active: 0,
    cancelled: 0,
    trialing: 0,
  };
  subscriptionStats.forEach((s) => {
    subscriptions[s._id] = s.count;
  });

  const recentTransactions = await Transaction.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "fullName email");

  const plans = await Subscription.aggregate([
    { $sort: { price: 1 } },
    {
      $group: {
        _id: "$plan",
        price: { $first: "$price" },
        billingCycle: { $first: "$billingCycle" },
      },
    },
  ]);

  const failedPayments = await Transaction.find({ status: "failed" })
    .sort({ createdAt: -1 })
    .populate("user", "fullName email");

  res.status(200).json({
    subscriptions,
    monthlyRevenue,
    recentTransactions,
    plans,
    failedPayments,
  });
};
