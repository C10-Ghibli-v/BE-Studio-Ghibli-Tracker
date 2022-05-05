const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("Role", RoleSchema);
module.exports = model;
