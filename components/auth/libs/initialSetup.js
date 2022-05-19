const Role = require("../../role/model");

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "guest" }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
  console.log(values);
};

module.exports = {
  createRoles,
};
