const express = require("express");

const {
  getUsers,
  updateUserRole,
  toggleUserStatus,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/status", toggleUserStatus);

module.exports = router;
