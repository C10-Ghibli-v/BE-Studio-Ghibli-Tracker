const Model = require("./model");
const Score = require("../score/model");

function addMovie(moviesList) {
  return moviesList.map((movie) => {
    const newMovie = new Model(movie);
    return newMovie.save();
  });
}

function insertManyMovies(moviesList) {
  return Model.insertMany(moviesList);
}

async function getMovies() {
  const moviesList = await Model.find();
  return moviesList;
}

async function updateMovie(id, tittle) {
  const foundMovie = await Model.findOne({
    _id: id,
  });

  foundMovie.tittle = tittle;

  const newMovie = await foundMovie.save();
  return newMovie;
}

async function getMovieById(id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const foundMovie = await Model.findById(id);
    return foundMovie;
  } else {
    return null;
  }
}

async function getScores(_id) {
  return await Model.find().populate({
    path: "scores",
    match: { userId: _id },
    select: "scores watched -_id -movieId",
  });
}

module.exports = {
  add: addMovie,
  get: getMovies,
  update: updateMovie,
  insertMany: insertManyMovies,
  getMovieById,
  getScores,
};
