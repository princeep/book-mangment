const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
   return res.status(401).json({ message: "Token invailed" });

  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = verifyToken;
