import { Router } from "express";

import {
  getSettings,
  updateGeneralSettings,
  updateSMTP,
  updateBranding,
  generateApiKey,
} from "../controllers/settingsController";
import { protect } from "../middlewares/authMiddleware";
import { adminsOnly } from "../middlewares/adminMiddleware";


const router = Router();

router.use(protect,adminsOnly)
router.get("/", getSettings);
router.put("/general", updateGeneralSettings);
router.put("/smtp", updateSMTP);
router.put("/branding", updateBranding);
router.post("/api-keys", generateApiKey);

export default router;