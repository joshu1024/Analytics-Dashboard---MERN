import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
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

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
