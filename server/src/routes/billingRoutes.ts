import { Router } from "express";


import { getBillingOverview } from "../controllers/billingController";
const router = Router();
router.get("/overview", getBillingOverview);
export default router;
