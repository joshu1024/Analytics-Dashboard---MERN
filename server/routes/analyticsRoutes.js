import express from "express";
import {
  getKPIs,
  getRetentionCurve,
  getSignupsByCountry,
  getUserDemographics,
} from "../controllers/analyticsController.js";
const router = express.Router();

router.get("/signup-bycountry", getSignupsByCountry);
router.get("/kpis", getKPIs);
router.get("/retention", getRetentionCurve);
router.get("/user-demographics", getUserDemographics);
export default router;
