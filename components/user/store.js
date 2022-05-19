const Model = require("./model");
const Role = require("../role/model");

async function createUser(userInfo) {
  const { username, email, password, roles } = userInfo;

  const newUser = new Model({
    username,
    email,
    password,
  });

  try {
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "guest" });
      newUser.roles = [role._id];
    }
  } catch (errors) {
    console.log(errors);
  }

  return await newUser.save();
}

module.exports = {
  createUser,
};
