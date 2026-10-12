const User = require("../models/User");

const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // The protect middleware must run first
      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(401).json({
          message: "User account not found",
        });
      }

      // Check the user's current role in the database
      if (!allowedRoles.includes(user.role || "user")) {
        return res.status(403).json({
          message: "You do not have permission to access this resource",
        });
      }

      // Make the user's role available to later handlers
      req.user.role = user.role || "user";

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { requireRole };
