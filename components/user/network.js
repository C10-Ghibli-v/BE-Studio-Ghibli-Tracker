const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { privateRouter } = require("../auth/network");

privateRouter.get("/", async (req, res) => {
  console.log("------ENTRA----------");
});

router.use(privateRouter);
module.exports = router;
