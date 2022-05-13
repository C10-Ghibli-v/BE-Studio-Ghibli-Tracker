const Model = require("./model");

function addMovie(moviesList) {
  return moviesList.map((movie) => {
    const newMovie = new Model(movie);
    return newMovie.save();
  });
}

function insertManyMovies(moviesList) {
  return Model.insertMany(moviesList);
}

function getMovies() {
  const moviesList = Model.find();
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
  const foundMovie = await Model.findById(id);
  return foundMovie;
}

module.exports = {
  add: addMovie,
  get: getMovies,
  update: updateMovie,
  insertMany: insertManyMovies,
  getMovieById,
};
