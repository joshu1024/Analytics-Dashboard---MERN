import mongoose from "mongoose";

const SettingsSchema = await mongoose.Schema(
  {
    companyName: String,
    smtp: {
      host: String,
    },
    branding: {
      companyName: String,
    },
    apiKeys: [
      {
        keyHash: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Setings", SettingsSchema);
