const express = require("express");
const { registerUser, loginUser, getMyProfile, getAllUsers } = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/me", protect, getMyProfile);

// Admin-only route
router.get(
  "/admin/users",
  protect,
  requireRole("admin"),
  getAllUsers
);

module.exports = router;
