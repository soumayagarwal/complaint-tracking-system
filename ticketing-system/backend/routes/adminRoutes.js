const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { getStats } = require("../controllers/adminController");

const router = express.Router();

router.get(
    "/stats",
    protect,
    adminOnly,
    getStats
);

module.exports = router;