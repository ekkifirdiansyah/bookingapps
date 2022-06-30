const express = require("express");
const DashboardController = require("../controller/DashboardController");
const auth = require("../middleware/auth");
// const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/read", auth, DashboardController.viewDashboard);

module.exports = router;
