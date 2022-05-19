const Joi = require("joi");

const scoreSchema = Joi.object({
  user_id: Joi.string().hex().length(24),
  movie_id: Joi.string().hex().length(24),
  watched: Joi.number(),
  scores: Joi.object({
    stars: Joi.number(),
    emojis: Joi.number(),
  }),
});

module.exports = scoreSchema;
