import User from "../models/userModel.js";

export const getKPIs = async (req, res) => {
  const totalUsers = await User.countDocuments();
  res.json({
    totalUsers,
    retention: 70,
    churn: 7,
    arpu: 22.4,
  });
};

export const getSignupsByCountry = async (req, res) => {
  const data = await User.aggregate([
    { $group: { _id: "$country", count: { $sum: 1 } } },
  ]);
  res.json(data);
};

export const getRetentionCurve = async (req, res) => {
  res.json([
    { day: 1, value: 100 },
    { day: 24, value: 94 },
    { day: 13, value: 103 },
    { day: 11, value: 116 },
    { day: 5, value: 89 },
  ]);
};
