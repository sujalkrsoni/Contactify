const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env

// Access the secret
const secretKey = process.env.JWT_SECRET;

module.exports.ensureAuthenticated = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return await res
      .status(401)
      .json({ message: "Unauthorized, JWT token is required!" });
  }
  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(auth, secretKey);
    req.User = decoded;
    next();
  } catch (error) {
    return await res
      .status(401)
      .json({ message: "Unauthorized, Jwt token wrong or expired!" });
  }
};
