const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // 1. Read the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required. Please provide a token.",
      });
    }

    // 2. Extract the token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token is missing",
      });
    }

    // 3. Verify the token's signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the authenticated user's ID to the request
    req.user = { userId: decoded.userId };

    // 5. Allow the request to continue
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token. Please log in again.",
      });
    }

    return next(error);
  }
};

module.exports = { protect };
