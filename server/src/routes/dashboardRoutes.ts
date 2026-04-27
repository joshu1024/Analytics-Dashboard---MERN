import { Router } from "express";
import { getDashboardKPIs } from "../controllers/dashboardController";
import { protect } from "../middlewares/authMiddleware";
import { adminsOnly } from "../middlewares/adminMiddleware";

const router = Router();
router.get("/kpis",protect,adminsOnly, getDashboardKPIs);

export default router;
