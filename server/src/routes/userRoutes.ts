import { Router } from "express";

import {
  getUsers,
  updateUserRole,
  toggleUserStatus,
} from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/status", toggleUserStatus);

export default router;
