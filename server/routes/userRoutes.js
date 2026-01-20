import express from "express";
import { getUsers } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getUsers);

export default router;
