const jwt = require("jsonwebtoken");

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secretKey = process.env.JWT_KEY || "JWT";

  if (token == null) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log("err", err);
      if (err.name === "TokenExpiredError") {
        // Token has expired
        return res.status(401).json({ error: "Token has expired" });
      } else {
        // Invalid token
        return res.status(403).json({ error: "Invalid token" });
      }
    }

    // Store the user information in the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

// Middleware to authenticate role
module.exports.authenticateRole = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== requiredRole) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Proceed to the next middleware or route handler
    next();
  };
};
