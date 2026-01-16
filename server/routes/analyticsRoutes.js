import express from "express";
import {
  getKPIs,
  getRetentionCurve,
  getSignupsByCountry,
} from "../controllers/analyticsController.js";
const router = express.Router();

router.get("/kpis", getKPIs);
router.get("/signup-bycountry", getSignupsByCountry);
router.get("/retention", getRetentionCurve);
export default router;
