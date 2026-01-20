import mongoose from "mongoose";
import Transaction from "./models/Transaction.js"; // adjust path
import User from "./models/userModel.js"; // must exist
import Subscription from "./models/Subscription.js"; // optional

// 1️⃣ Connect to MongoDB
await mongoose.connect(
  "mongodb+srv://joshuakipamet_db_user:3wF4XTjvLnGxa4JQ@cluster0.hgkqanb.mongodb.net/",
);

// 2️⃣ Get existing users (required because `user` is required)
const users = await User.find();
if (users.length === 0) {
  throw new Error("No users found. Create users first.");
}

// 3️⃣ Helper to get random item
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 4️⃣ Generate random transactions
const transactions = Array.from({ length: 20 }).map(() => ({
  user: randomItem(users)._id,
  amount: Math.floor(Math.random() * 500) + 10,
  currency: "USD",
  status: randomItem(["success", "failed", "pending", "refunded"]),
  paymentMethod: randomItem(["card", "mpesa", "paypal", "bank"]),
  provider: randomItem(["stripe", "paypal", "mpesa", "manual"]),
  providerTransactionId: `TXN-${Math.random().toString(36).substring(2, 10)}`,
  failureReason: Math.random() > 0.7 ? "Insufficient funds" : null,
}));

// 5️⃣ Insert into DB
await Transaction.insertMany(transactions);

console.log("✅ Transactions seeded successfully");

process.exit();
