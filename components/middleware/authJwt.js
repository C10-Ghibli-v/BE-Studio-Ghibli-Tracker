/*const verifyToken = async (req, res, next) => {
  const token = req.header["x-access-token"];
  if (!token) {
    return res.status(404).json({
      status: "Token not found",
      statusCode: 404,
    });
  }
  console.log(token);
  next();
};*/

const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      status: "Token not found",
      statusCode: 401,
    });
  }
  //const decoded = jwt.verify(token, process.env.SECRET);
  //console.log(decoded);
  /*if (!decoded) {
    return res.status(404).json({
      status: "Invalid Token",
      statusCode: 404,
    });
  }*/

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
