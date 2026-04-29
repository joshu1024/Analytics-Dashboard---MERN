import Settings, { ISettings } from "../models/Settings"
import crypto from "crypto"
import {Response,Request} from "express"

interface UpdateGeneralSettingsBody {
  companyName: string;
}

interface UpdateSMTPBody {
  host: string;
}

interface UpdateBrandingBody {
  companyName: string;
}
type UpdateBrandingResponse = {settings:ISettings} | { message: string };

export const getSettings = async (
  req: Request,
  res: Response<{ settings: ISettings }  | {message:string}>
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
    res.status(500).json({ message });
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
  res: Response<UpdateBrandingResponse>
): Promise<void> => {
  try {
    const { companyName } = req.body;

    const settings = await Settings.findOneAndUpdate(
      {},
      { branding: { companyName } },
      { new: true, upsert: true }
    );

    res.json({settings});
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update branding";
    res.status(500).json({message});
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
      { $push: { apiKeys: { keyHash: hash, createdAt: new Date() } } },
      { new: true, upsert: true }
    );

    res.json({ apiKey: rawKey });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to generate API key";
    res.status(500).json({ apiKey: "" });
  }
};


