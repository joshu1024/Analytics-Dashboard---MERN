import Transaction from "../models/Transaction.js";

export const getBillingOverview = async (req, res) => {
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const revenueResult = await Transaction.aggregate([
    {
      $match: { createdAt: { $gte: startOfMonth } },
    },
    {
      $group: { _id: null, totalRevenue: { $sum: "$amount" } },
    },
  ]);

  const monthlyRevenue = revenueResult[0]?.totalRevenue || 0;

  res.status(200).json({ monthlyRevenue });
};
