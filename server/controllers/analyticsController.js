import Transaction from "../models/Transaction.js";
import User from "../models/userModel.js";

export const getKPIs = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const retainedUsers = await User.countDocuments({
      lastLogin: { $exists: true },
    });
    const retention =
      totalUsers === 0 ? 0 : Math.round((retainedUsers / totalUsers) * 100);

    const churn = 100 - retention; // percentage of users lost
    // arpu = totalrev/totalusers,
    const revenueAggregate = await Transaction.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueAggregate[0]?.totalRevenue || 0;

    const arpu =
      totalUsers === 0 ? 0 : Math.round(totalRevenue / totalUsers).toFixed(2);
    res.json({
      totalUsers,
      churn,
      retention,
      arpu,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSignupsByCountry = async (req, res) => {
  const data2 = await User.aggregate([
    { $group: { _id: "$country", count: { $sum: 1 } } },
  ]);
  res.json(data2);
};

export const getRetentionCurve = async (req, res) => {
  const data = await User.aggregate([
    {
      $project: {
        day: {
          $floor: {
            $divide: [
              { $subtract: ["$$NOW", "$createdAt"] },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
    },
    {
      $group: { _id: "$day", value: { $sum: 1 } },
    },
    { $match: { _id: { $gte: 0 } } },
    { $sort: { _id: 1 } },
    { $limit: 30 },
  ]);

  res.json(data.map((d) => ({ day: d._id, value: d.value })));
};

export const getUserDemographics = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: { _id: "$gender", count: { $sum: 1 } },
      },
    ]);
    const formatted = result.map((d) => ({
      name: d._id || "Other",
      value: d.count,
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};
