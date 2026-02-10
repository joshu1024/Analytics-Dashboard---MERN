import mongoose, { Schema, Document, Types } from "mongoose";
import { IUsermodel } from "./userModel";

export interface ITransaction extends Document{
user:Types.ObjectId | IUsermodel,
subscription?:Types.ObjectId,
amount:number,
currency:string,
status:"success" | "failed"| "pending" | "refunded",
paymentMethod:"card"| "mpesa" | "paypal"| "bank",
provider:"stripe" | "paypal" | "mpesa" | "manual",
providerTransactionId?:string,
failureReason?:string,
createdAt?:Date,
updatedAt?:Date
}

const transactionSchema = new Schema<ITransaction>(
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
const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);
export default Transaction;
