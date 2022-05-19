const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { privateRouter } = require("../auth/network");
const scoreSchema = require("./joiSchema");
const joiValidator = require("../middleware/joiValidator");

privateRouter.post("/", joiValidator(scoreSchema), async function (req, res) {
  try {
    await controller.saveScores(req.body);
    res.status(201).json({
      message: "Score Added",
      status: "201",
    });
  } catch (error) {
    console.error(error);
  }
});

privateRouter.patch("/", async function (req, res) {
  try {
    const modifyScores = await controller.modifyScores(req.body);
    res.status(201).json({
      message: "Score Modified",
      status: "201",
      data: modifyScores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
      data: {},
      success: false,
    });
  }
});

router.use(privateRouter);
module.exports = router;
