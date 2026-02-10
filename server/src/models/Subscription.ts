import mongoose,{Schema,Document,Types}  from "mongoose"

export interface ISubscription extends Document{
  user:Types.ObjectId,
  plan:"free"| "basic"| "pro"| "enterprise",
  status: "active" | "trialing" | "past_due" | "cancelled",
  billingCycle: "monthly" | "yearly",
  price:number,
  currency:string,
  startDate?:Date,
  endDate?:Date,
  cancelAtPeriodEnd:boolean
  provider: "paypal" | "stripe" | "manual",
  providerSubscriptionId?:string
  createdAt?:Date,
  updatedAt?:Date
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
      index: true,
    },
    plan: {
      type: String,
      enum: ["free", "basic", "pro", "enterprise"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "trialing", "past_due", "cancelled"],
      default: "trialing",
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    cancelAtPeriodEnd: { type: Boolean, default: false },
    provider: {
      type: String,
      enum: ["paypal", "stripe", "manual"],
      default: "manual",
    },
    providerSubscriptionId: { type: String },
  },
  { timestamps: true },
);

const Subscription = mongoose.model<ISubscription>("Subscription", subscriptionSchema);
export default Subscription;
