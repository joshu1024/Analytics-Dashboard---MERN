import express from "express";
import { getBillingOverview } from "../controllers/billingController.js";

const router = express.Router();
router.get("/overview", getBillingOverview);
export default router;
