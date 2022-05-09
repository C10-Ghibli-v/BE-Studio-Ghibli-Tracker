//const User = require("../user/model");
const store = require("../user/store");
const jwt = require("jsonwebtoken");

function signUp(userInfo) {
  //const { username, email, password, roles } = userInfo;
  return new Promise(async (resolve, reject) => {
    try {
      const savedUser = await store.createUser(userInfo);
      const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
        expiresIn: 86400, //24 hours
      });
      console.log(token);
      resolve(savedUser);
    } catch (err) {
      console.error(err);
    }
  });
}

function signIn(userInfo, user) {
  return new Promise(async (resolve, reject) => {
    try {
      const { password } = userInfo;
      const decryptPassword = await user.comparePassword(password);
      if (decryptPassword) {
        const token = await user.createToken();
        resolve(token);
      }
      resolve(null);
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
}

module.exports = {
  signUp,
  signIn,
};
