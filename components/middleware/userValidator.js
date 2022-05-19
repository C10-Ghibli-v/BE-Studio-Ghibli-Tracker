const User = require("../user/model");

const findUserByEmail = async (req, res, next) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  req.userFound = userFound;
  if (!userFound) {
    return res.status(404).json({
      status: "Not Found",
      statusCode: 404,
    });
  }
  next();
};

module.exports = {
  findUserByEmail,
};
