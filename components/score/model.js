const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema(
  {
    userId: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    movieId: {
      ref: "Movie",
      type: Schema.Types.ObjectId,
    },
    watched: {
      type: Boolean,
      required: false,
    },
    scores: {
      stars: {
        type: Number,
        required: false,
      },
      emojis: {
        type: Number,
        required: false,
      },
    },
  },
  {
    versionKey: false,
  }
);

const Scores = mongoose.model("Score", ScoreSchema);
module.exports = Scores;
