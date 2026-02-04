import express from "express";
import {
  getUsers,
  updateUserRole,
  toggleUserStatus,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/status", toggleUserStatus);

export default router;
