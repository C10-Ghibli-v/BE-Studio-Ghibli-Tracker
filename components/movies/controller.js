const axios = require("axios");
const store = require("./store");

/**
 * @name Bone
 * @description: Function to get the movie details
 * @param null
 * @returns null
 *
 */
async function addMovie() {
  let response = null;
  try {
    response = await axios.get(process.env.GHIBLI_ENDPOINT);
  } catch (e) {
    console.log(e);
  }
  const moviesList = response.data;
  const formatedMovies = [];
  moviesList.forEach((movie) => {
    formatedMovies.push({
      releaseDate: movie.release_date,
      title: movie.title,
      originalTitle: movie.original_title,
      director: movie.director,
      originalTitleRomanised: movie.original_title_romanised,
      producer: movie.producer,
      duration: movie.running_time,
      movieBanner: movie.movie_banner,
      image: movie.image,
      description: movie.description,
      rtScore: movie.rt_score,
    });
  });
  if (formatedMovies.length) {
    try {
      await store.insertMany(formatedMovies);
      console.log("Movies added successfully");
    } catch (e) {
      console.error(e);
    }
  }
}

function getMovies() {
  return new Promise(async (resolve, reject) => {
    const moviesList = await store.get();
    if (!moviesList) {
      reject("Movies not found");
    }
    resolve(moviesList);
  });
}

function updateMovie(id, tittle) {
  return new Promise(async (resolve, reject) => {
    if (!id || !tittle) {
      reject("Invalid Data");
      return false;
    }

    const result = await store.update(id, tittle);
    resolve(result);
  });
}

function getMovieById(id) {
  return new Promise(async (resolve, reject) => {
    const movie = await store.getMovieById(id);
    if (!movie) {
      reject("Movies not found");
    }
    resolve(movie);
  });
}

module.exports = {
  addMovie,
  getMovies,
  updateMovie,
  getMovieById,
};
