import express from "express";
import {
  getSettings,
  updateGeneralSettings,
  updateSMTP,
  updateBranding,
  generateApiKey,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/general", updateGeneralSettings);
router.put("/smtp", updateSMTP);
router.put("/branding", updateBranding);
router.post("/api-keys", generateApiKey);

export default router;
