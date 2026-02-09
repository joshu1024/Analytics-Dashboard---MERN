const express = require("express");

const {
  getSettings,
  updateGeneralSettings,
  updateSMTP,
  updateBranding,
  generateApiKey,
} = require("../controllers/settingsController");

const router = express.Router();

router.get("/", getSettings);
router.put("/general", updateGeneralSettings);
router.put("/smtp", updateSMTP);
router.put("/branding", updateBranding);
router.post("/api-keys", generateApiKey);

module.exports = router;
