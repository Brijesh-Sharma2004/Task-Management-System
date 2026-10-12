const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { updateMyProfile } = require("../controllers/userController");

const router = express.Router();

router.patch("/profile", protect, updateMyProfile);

module.exports = router;
