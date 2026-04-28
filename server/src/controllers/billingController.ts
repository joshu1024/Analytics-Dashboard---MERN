import { Request, Response } from "express";
import Transaction, { ITransaction } from "../models/Transaction";
import Subscription, { ISubscription } from "../models/Subscription";

interface SubscriptionSummary {
  active: number;
  cancelled: number;
  trialing: number;
}

interface PlanSummary {
  _id: string;
  price: number;
  billingCycle: string;
}

export const getBillingOverview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
   
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const SET_LIMIT = 5
    const revenueResult = await Transaction.aggregate<{ _id: null; totalRevenue: number }>([
      { $match: { createdAt: { $gte: startOfMonth }, status: "success" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);
    const monthlyRevenue = revenueResult[0]?.totalRevenue ?? 0;

   const [subscriptionStats,recentTransactions,plans,failedPayments] = await Promise.all([
    Subscription.aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Transaction.find()
      .sort({ createdAt: -1 })
      .limit(SET_LIMIT)
      .populate("user", "fullName email")
      .exec(),
    Subscription.aggregate<PlanSummary>([
      { $sort: { price: 1 } },
      {
        $group: {
          _id: "$plan",
          price: { $first: "$price" },
          billingCycle: { $first: "$billingCycle" },
        },
      },
    ]),
    await Transaction.find({ status: "failed" })
      .sort({ createdAt: -1 })
      .limit(SET_LIMIT)
      .populate("user", "fullName email")
      .exec()

   ])
    
    const subscriptions: SubscriptionSummary = { active: 0, cancelled: 0, trialing: 0 };
    subscriptionStats.forEach((s) => {
      if (s._id in subscriptions) {
        subscriptions[s._id as keyof SubscriptionSummary] = s.count;
      }
    });
    
    res.status(200).json({
      subscriptions,
      monthlyRevenue,
      recentTransactions,
      plans,
      failedPayments,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ message });
  }
};
