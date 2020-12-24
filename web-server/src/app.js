const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("dotenv").config();
const { geoCoding } = require("./utils/geocode.js");
const { weatherSearch } = require("./utils/weatherSearch.js");
const { printWeatherData, displayError } = require("./utils/printFunctions");
const port = process.env.PORT || 3000;
const app = express();
const geo_token = process.env.GEOCODE_TOKEN;

//weather api parameters
const weather_token = process.env.WEATHER_TOKEN;
//setting template
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.get("", (req, res) => {
  res.render("index", {
    developer: "Anz",
    title: "Weather App",
    name: "Anas Vakyathodi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { developer: "Anz", title: "About Me" });
});

app.get("/help", (req, res) => {
  res.render("help", { developer: "Anz", title: "Help" });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    developer: "Anz",
    title: "404",
    erroMessage: "Help Article Not Found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.status(400).json({ error: "No Address Provided" });
  }

  geoCoding(req.query.address, geo_token)
    .then((data) =>
      weatherSearch(data, weather_token)
        .then((data) => res.json(printWeatherData(data)))
        .catch((error) => res.status(404).json(displayError(error)))
    )
    .catch((error) => res.status(404).json(displayError(error)));
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    developer: "Anz",
    errorMessage: "Oops...Page not found",
  });
});
app.listen(port, () => console.log("Server Running on port", port));
