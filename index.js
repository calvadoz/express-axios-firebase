require("dotenv").config();
const debug = require("debug")("app:startup");

const config = require("config");

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");
const authenticator = require("./authenticator");
const courses = require("./routes/courses");
const firebase = require("./routes/firebase");
const home = require("./routes/home");
const app = express();

// BUILT-IN MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// 3rd party middleware
app.use(helmet());

app.use("/api/courses", courses);
app.use("/api/firebase", firebase);
app.use("/", home);

console.log(process.env.NODE_ENV);
console.log(app.get("env"));

// Middleware - 1
app.use(logger);

// Middleware - 2
app.use((req, res, next) => {
  console.log("Authenticating");
  next();
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Listening on port ", PORT));
