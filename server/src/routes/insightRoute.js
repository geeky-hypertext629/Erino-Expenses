const express = require("express");
const { getSpendingInsights } = require("../controllers/insightController");
const {isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

router.get("/insights", isAuthenticatedUser, getSpendingInsights);

module.exports = router;
