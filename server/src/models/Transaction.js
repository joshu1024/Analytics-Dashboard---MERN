const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
      index: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["success", "failed", "pending", "refunded"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["card", "mpesa", "paypal", "bank"],
      required: true,
    },

    provider: {
      type: String,
      enum: ["stripe", "paypal", "mpesa", "manual"],
      default: "manual",
    },

    providerTransactionId: {
      type: String,
    },

    failureReason: {
      type: String,
    },
  },
  { timestamps: true },
);
export const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
