const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.requireAuth = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Authentication required." });
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "change-this-development-secret",
    );

    const userId = decoded.id || decoded.userId;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(401)
        .json({ message: "User account no longer exists." });
    req.user = user;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Invalid or expired session." });
  }
};
