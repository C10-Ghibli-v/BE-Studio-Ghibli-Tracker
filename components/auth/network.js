const express = require("express");
const controller = require("./controller");
const { findUserByEmail } = require("../middleware/userValidator");
const { verifyToken } = require("../middleware/authJwt");

const router = express.Router();
const privateRouter = express.Router();

//Middlewares
router.use("/signin", findUserByEmail);
privateRouter.use(verifyToken);

//Routes
router.post("/signup", async (req, res) => {
  try {
    const userInfo = req.body;
    const data = await controller.signUp(userInfo);
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
      data: {},
      success: false,
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    userInfo = req.body;
    const login = await controller.signIn(userInfo, req.userFound);
    if (login) {
      res.status(200).json({
        status: "200",
        message: "ok",
        token: login,
      });
    } else {
      res.status(401).json({
        status: "401",
        message: "Unauthorized",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  router,
  privateRouter,
};
