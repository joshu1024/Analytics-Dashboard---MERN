import { Router } from "express";
import { getBillingOverview } from "../controllers/billingController";
import { adminsOnly } from "../middlewares/adminMiddleware";
import { protect } from "../middlewares/authMiddleware";
const router = Router();

router.use(protect,adminsOnly)
router.get("/overview", getBillingOverview);
export default router;
