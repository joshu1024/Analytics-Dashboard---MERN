import Settings from "../models/Settings"
import crypto from "crypto"
import {Response,Request} from "express"
import {Document} from "mongoose"

export interface ISettings extends Document {
  companyName?: string;
  smtp?: { host?: string };
  branding?: { companyName?: string };
  apiKeys?: { keyHash: string }[];
}

interface UpdateGeneralSettingsBody {
  companyName: string;
}

interface UpdateSMTPBody {
  host: string;
}

interface UpdateBrandingBody {
  companyName: string;
}

export const getSettings = async (
  req: Request,
  res: Response<{ settings: ISettings }>
): Promise<void> => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json({ settings });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch settings";
    res.status(500).json({ settings: undefined as unknown as ISettings });
  }
};

export const updateGeneralSettings = async (
  req: Request<{}, {}, UpdateGeneralSettingsBody>,
  res: Response<{ settings: ISettings | null }>
): Promise<void> => {
  try {
    const { companyName } = req.body;

    const settings = await Settings.findOneAndUpdate(
      {},
      { companyName },
      { new: true, upsert: true }
    );

    res.json({ settings });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update settings";
    res.status(500).json({ settings: null });
  }
};
export const updateSMTP = async (
  req: Request<{}, {}, UpdateSMTPBody>,
  res: Response<ISettings | null>
): Promise<void> => {
  try {
    const { host } = req.body;

    const settings = await Settings.findOneAndUpdate(
      {},
      { smtp: { host } },
      { new: true, upsert: true }
    );

    res.json(settings);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update SMTP";
    res.status(500).json(null);
  }
};
export const updateBranding = async (
  req: Request<{}, {}, UpdateBrandingBody>,
  res: Response<ISettings | null>
): Promise<void> => {
  try {
    const { companyName } = req.body;

    const settings = await Settings.findOneAndUpdate(
      {},
      { branding: { companyName } },
      { new: true, upsert: true }
    );

    res.json(settings);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update branding";
    res.status(500).json(null);
  }
};
export const generateApiKey = async (
  req: Request,
  res: Response<{ apiKey: string }>
): Promise<void> => {
  try {
    const rawKey = crypto.randomBytes(32).toString("hex");
    const hash = crypto.createHash("sha256").update(rawKey).digest("hex");

    await Settings.findOneAndUpdate(
      {},
      { $push: { apiKeys: { keyHash: hash } } },
      { new: true, upsert: true }
    );

    res.json({ apiKey: rawKey });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to generate API key";
    res.status(500).json({ apiKey: "" });
  }
};


