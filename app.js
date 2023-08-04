const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const doctorsRoutes = require("./routes/doctors");

mongoose
  .connect(`mongodb://127.0.0.1:27017/database`)
  .then((response) => {
    console.log("mongo db is up ");
  })
  .catch((err) => console.log("error with mongo db ", err));

app.use((req, res, next) => {
  //allows any domain to make requests to this server
  res.header("Access-Control-Allow-Origin", "*");
  // allows requests from specific headers.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requestd-With ,Content-Type ,Accept , Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT",
      "POST",
      "PATCH",
      "DELETE",
      "GET"
    );
    return res.status(200).json();
  }
  next();
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//add here
app.use("/doctors", doctorsRoutes);

app.use((req, res, next) => {
  const error = new Error("not found hadil ");
  error.status = 404;
  next(error); // move to the error-handling middleware
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message },
  });
});

module.exports = app;
