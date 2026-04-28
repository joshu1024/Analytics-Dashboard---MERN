import { Router } from "express";

import {
  getCompanies,
  createCompany,
} from "../controllers/companyController";
import { protect } from "../middlewares/authMiddleware";
import { adminsOnly } from "../middlewares/adminMiddleware";

const router = Router();

router.use(protect,adminsOnly)
router.get("/", getCompanies);
router.post("/", createCompany);
export default router;
