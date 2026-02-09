const express = require("express");

const {
  getKPIs,
  getRetentionCurve,
  getSignupsByCountry,
  getUserDemographics,
  getRecentEvents,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/signup-bycountry", getSignupsByCountry);
router.get("/kpis", getKPIs);
router.get("/retention", getRetentionCurve);
router.get("/user-demographics", getUserDemographics);
router.get("/events", getRecentEvents);
module.exports = router;
