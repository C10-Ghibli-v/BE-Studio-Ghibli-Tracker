const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // leer el token del header
  const token = req.header("x-auth-token");

  // validar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  // validar token en caso de que exista
  try {
    // crear firma con base al payload generado al momento de firmar el jwt
    const signature = jwt.verify(token, process.env.SECRET);
    req.user = signature.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
