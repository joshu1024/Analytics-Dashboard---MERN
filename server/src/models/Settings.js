const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
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

const Setings = mongoose.model("Setings", SettingsSchema);
module.exports = Setings;
