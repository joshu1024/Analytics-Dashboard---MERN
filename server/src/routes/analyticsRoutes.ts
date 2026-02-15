import { Router } from "express";

import {
  getKPIs,
  getRetentionCurve,
  getSignupsByCountry,
  getUserDemographics,
  getRecentEvents,
} from "../controllers/analyticsController";


const router = Router();

router.get("/signup-bycountry", getSignupsByCountry);
router.get("/kpis", getKPIs);
router.get("/retention", getRetentionCurve);
router.get("/user-demographics", getUserDemographics);
router.get("/events", getRecentEvents);
export default router;
