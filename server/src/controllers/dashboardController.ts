import Subscription from "../models/Subscription";
import Transaction from "../models/Transaction";
import userModel, { IUsermodel } from "../models/userModel";
import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";


interface RevenueAgg {
  _id: null;
  total: number;
}
interface MonthlyRevenueAgg {
  _id: number;
  totalRevenue: number;
}
interface PlanAgg {
  _id: string;
  count: number;
}
interface UserGrowthAgg {
  _id: number;
  users: number;
}
interface RecentActivity {
  type: "transaction" | "user";
  message: string;
  time?: string;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const RECENT_ACTIVITY_LIMIT = 5;
const INACTIVE_DAYS_THRESHOLD = 7;


export const getDashboardKPIs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - INACTIVE_DAYS_THRESHOLD);

    const [
      totalUsers,
      activeUsers,
      revenue,
      monthlyRevenue,
      recentTransactions,
      recentUsers,
      planStats,
      growth,
    ] = await Promise.all([
      userModel.countDocuments(),
      userModel.countDocuments({ lastLogin: { $gte: sevenDaysAgo } }),
      Transaction.aggregate<RevenueAgg>([
        { $match: { status: "success" } },
        { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } },
      ]),
      Transaction.aggregate<MonthlyRevenueAgg>([
        { $match: { status: "success" } },
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalRevenue: { $sum: { $toDouble: "$amount" } },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Transaction.find()
        .sort({ createdAt: -1 })
        .limit(RECENT_ACTIVITY_LIMIT)
        .populate<{ user: IUsermodel | null }>("user"),
      userModel.find().sort({ createdAt: -1 }).limit(RECENT_ACTIVITY_LIMIT),
      Subscription.aggregate<PlanAgg>([
        { $group: { _id: "$plan", count: { $sum: 1 } } },
      ]),
      userModel.aggregate<UserGrowthAgg>([
        { $group: { _id: { $month: "$createdAt" }, users: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const inactiveUsers = totalUsers - activeUsers;
    const churnRate = totalUsers === 0
      ? 0
      : Number(((inactiveUsers / totalUsers) * 100).toFixed(2));

    const mrr = revenue[0]?.total ?? 0;

    // ✅ Revenue chart
    const revenueChart = monthlyRevenue.map((item) => ({
      month: MONTHS[item._id - 1],
      revenue: item.totalRevenue,
    }));

    // ✅ Recent activity
    const recentActivity: RecentActivity[] = [
      ...recentTransactions.map<RecentActivity>((t) => ({
        type: "transaction"as const,
        message: `Payment of ${t.amount} ${t.currency} by ${t.user?.fullName ?? "Unknown User"}`,
        time: t.createdAt?.toISOString(),
      })),
      ...recentUsers.map<RecentActivity>((u) => ({
        type: "user"as const,
        message: `New user registered: ${u.fullName || u.email}`,
        time: u.createdAt?.toISOString(),
      })),
    ]
      .sort((a, b) => (new Date(b.time ?? 0).getTime() ?? 0) - (new Date(a.time ?? 0).getTime() ?? 0))
      .slice(0, RECENT_ACTIVITY_LIMIT);

    // ✅ Plan breakdown
    const planBreakDown = planStats.map((item) => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      value: item.count,
    }));

    // ✅ User growth
    const userGrowth = growth.map((item) => ({
      month: MONTHS[item._id - 1],
      users: item.users,
    }));
    
    res.status(200).json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      churnRate,
      mrr,
      revenueChart,
      recentActivity,
      planBreakDown,
      userGrowth,
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch dashboard KPIs";
    res.status(500).json({ message });
  }
};