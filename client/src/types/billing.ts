export type SubscriptionStatus = "active" | "cancelled" | "trialing";
export interface subscriptionsummary{
      active: number,
      cancelled: number,
      trialing: number,
    }
export interface User{
    _id:string,
    fullName:string
}
export interface ITransaction{
    _id:string,
     user?:User,
    amount:number,
    currency:string,
    status:"success" | "failed"| "pending" | "refunded",
    paymentMethod:"card"| "mpesa" | "paypal"| "bank",
    failureReason?:string,
    createdAt?:Date,
}
export interface Plan{
  _id: string;
  price: number;
  billingCycle: "monthly" | "yearly";
}
export interface billingOverviewResponse{
    monthlyRevenue: number,
    subscriptions: subscriptionsummary,
    recentTransactions: ITransaction[],
    failedPayments: ITransaction[],
    plans: Plan[],
    loading: boolean,
    error:string | null | undefined,
}