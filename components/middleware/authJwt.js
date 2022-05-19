const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      status: "Token not found",
      statusCode: 401,
    });
  }

  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      status: "Invalid Token",
      statusCode: 401,
    });
  }
};

module.exports = {
  verifyToken,
};
