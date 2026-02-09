const express = require("express");
const protect = require("../middlewares/authMiddleware");

const { getDashboardKPIs } = require("../controllers/dashboardController");

const router = express.Router();
router.get("/kpis", getDashboardKPIs);

module.exports = router;
