// middleware to verify/check the JWT token sent by the user when they are trying to access a protected route like the dashboard.

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //Ex: Authorization: Bearer(index0) (your_token_here)(index1)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ Message: "Access Denied, No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ Message: "Invalid or expired token." });
  }
};

module.exports = authenticateToken;
