const express = require("express");
const movies = require("../components/movies/network");
const user = require("../components/user/network");
const auth = require("../components/auth/network");
const score = require("../components/score/network");

const routes = function (server) {
  server.use("/movies", movies);
  server.use("/user", user);
  server.use("/auth", auth.router);
  server.use("/score", score);
};

module.exports = routes;
