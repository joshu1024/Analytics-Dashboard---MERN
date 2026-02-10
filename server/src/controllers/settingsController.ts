import Settings from "../models/Settings"
import crypto from "crypto"

const getSettings = async (req, res) => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  res.json({ settings });
};

const updateGeneralSettings = async (req, res) => {
  console.log("BODY:", req.body);

  const { companyName } = req.body;

  const settings = await Settings.findOneAndUpdate(
    {},
    { companyName },
    { new: true, upsert: true },
  );

  res.json({ settings });
};
const updateSMTP = async (req, res) => {
  const { host } = req.body;
  const settings = await Settings.findOneAndUpdate(
    {},
    { smtp: { host } },
    { new: true, upsert: true },
  );
  res.json(settings);
};
const updateBranding = async (req, res) => {
  const { companyName } = req.body;

  const settings = await Settings.findOneAndUpdate(
    {},
    { branding: { companyName } },
    { new: true, upsert: true },
  );

  res.json(settings);
};

const generateApiKey = async (req, res) => {
  const rawKey = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(rawKey).digest("hex");

  const settings = await Settings.findOneAndUpdate(
    {},
    { $push: { apiKeys: { keyHash: hash } } },
    { new: true, upsert: true },
  );

  res.json({ apiKey: rawKey });
};

module.exports = {
  getSettings,
  updateGeneralSettings,
  updateSMTP,
  updateBranding,
  generateApiKey,
};
