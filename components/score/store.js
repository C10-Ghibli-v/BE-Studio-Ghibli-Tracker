const Scores = require("./model");

async function saveScore(scoreData) {
  const { user_id, movie_id, watched, scores } = scoreData;
  const newScore = new Scores({
    userId: user_id,
    movieId: movie_id,
    watched: watched,
    scores: {
      stars: scores?.stars,
      emojis: scores?.emojis,
    },
  });
  try {
    return await newScore.save();
  } catch (error) {
    console.log(error);
  }
}

async function modifyScore(scoreData) {
  const { user_id, movie_id, watched, scores } = scoreData;
  try {
    const findUpdate = await Scores.findOneAndUpdate(
      {
        userId: user_id,
        movieId: movie_id,
      },
      {
        watched: watched,
        scores: {
          stars: scores?.stars,
          emojis: scores?.emojis,
        },
      }
    );
    return findUpdate;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  saveScore,
  modifyScore,
};
