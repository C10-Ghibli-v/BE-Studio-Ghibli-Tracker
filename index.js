require("dotenv").config();
const express = require("express");
const db = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
//Testing
//const { auth } = require("express-openid-connect");

const { createRoles } = require("./components/auth/libs/initialSetup");
const router = require("./network/routes");

const app = express();
createRoles();

const handleError = (err, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

// Database mongoDb
db.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`
)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    return process.exit(1);
  });

//Testing
/*const config = {
  asd
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "GCl3e4AahV1UbVnB5wclt3p8qrSu8YWo",
  issuerBaseURL: "https://dev-aililkpc.us.auth0.com",
};

app.use(auth(config));*/

// req.isAuthenticated is provided from the auth router
/*app.get("/test", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});*/

// Routes
router(app);

app.use((err, req, res, next) => {
  handleError(err, res);
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
console.log(listEndpoints(app));
app.listen(PORT, HOST, () => {
  console.log(`App is running on port ${PORT}`);
});
