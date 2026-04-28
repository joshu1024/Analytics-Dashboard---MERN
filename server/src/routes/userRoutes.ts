import { Router } from "express";

import {
  getUsers,
  updateUserRole,
  toggleUserStatus,
} from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";
import { adminsOnly } from "../middlewares/adminMiddleware";

const router = Router();

router.use(protect,adminsOnly)
router.get("/", getUsers);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/status", toggleUserStatus);

export default router;
