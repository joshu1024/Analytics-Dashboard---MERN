import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getDashboardKPIs } from "../controllers/dashboardController.js";

const router = express.Router();
router.get("/kpis", getDashboardKPIs);

export default router;
