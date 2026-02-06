import Transaction from "../models/Transaction.js";
import User from "../models/userModel.js";
import Event from "../models/Event.js";

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
  const retention = [];

  const totalUsers = await User.countDocuments();
  if (!totalUsers) return res.json([]);

  for (let day = 0; day <= 30; day++) {
    const cutoff = new Date(Date.now() - day * 24 * 60 * 60 * 1000);

    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: cutoff },
    });

    retention.push({
      day,
      value: Math.round((activeUsers / totalUsers) * 100),
    });
  }

  res.json(retention);
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

export const getRecentEvents = async (req, res) => {
  try {
    const { type } = req.query;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = Number(page - 1) * limit;

    const query = type ? { type } : {};

    const events = await Event.find()
      .populate({
        path: "user",
        select: "fullName email",
        options: { strictPopulate: false },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to fetch recent events" });
  }
};

//PAGINATION LATER
