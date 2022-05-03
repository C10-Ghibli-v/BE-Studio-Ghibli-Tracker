const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", async function (req, res) {
  try {
    const moviesList = await controller.getMovies();
    res.status(200).json({
      message: "Movie added",
      status: 200,
      data: moviesList,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error saving movies",
      status: 500,
      data: {},
      success: false,
    });
  }
});

router.post("/test", async function (req, res) {
  try {
    const insertMovie = await controller.testFunction();
    res.status(201).json({
      message: "Added Successfully",
      status: 201,
      data: {},
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Error",
      status: 500,
      data: {},
      success: false,
    });
  }
});

router.post("/", function (req, res) {
  controller
    .addMovie()
    .then((message) => {
      res.status(200).json({ message: "Movie added", data: {}, success: true });
    })
    .catch((e) => {
      res.json(
        {
          message: "Error saving movies",
          status: 500,
          data: {},
          success: false,
        },
        500
      );
      console.error(e);
    });
});

router.patch("/:id", function (req, res) {
  controller
    .updateMovie(req.params.id, req.body.tittle)
    .then((data) => {
      res.json(
        { message: "Movie added", status: 200, data: {}, success: true },
        200
      );
    })
    .catch((e) => {
      res.json(
        {
          message: "Error saving movies",
          status: 500,
          data: {},
          success: false,
        },
        500
      );
    });
});

module.exports = router;
