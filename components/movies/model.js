const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  releaseDate: String,
  title: String,
  originalTitle: String,
  director: String,
  originalTitleRomanised: String,
  linkWiki: String,
  scriptwriter: String,
  producer: String,
  music: String,
  duration: String,
  movieBanner: String,
  image: String,
  description: String,
  rtScore: String,
  userScore: {
    ref: "Score",
    type: Schema.Types.ObjectId,
  },
});

const model = mongoose.model("Movie", MovieSchema);
module.exports = model;
