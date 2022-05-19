const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { privateRouter } = require("../auth/network");

//Routes
router.get("/", async function (req, res) {
  try {
    let moviesList = null;
    if (!req._id) {
      moviesList = await controller.getMovies();
    } else {
      moviesList = await controller.getMoviesAndUserData(req._id);
    }
    res.status(200).json({
      message: "List Movies",
      status: 200,
      data: moviesList,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "[Movies Controller] Internal Error",
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

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const movie = await controller.getMovieById(id);
    res.status(200).json({
      message: "Id Found",
      status: 200,
      data: movie,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      message: "Error Id Not Found",
      status: 404,
      data: {},
      success: false,
    });
  }
});

router.use(privateRouter);
module.exports = router;
