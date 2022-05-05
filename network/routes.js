const express = require("express");
const movies = require("../components/movies/network");
const user = require("../components/user/network");
const auth = require("../components/auth/network");

const routes = function (server) {
  server.use("/movies", movies);
  server.use("/user", user);
  server.use("/auth", auth);
};

module.exports = routes;
