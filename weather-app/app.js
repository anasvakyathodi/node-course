const { geoCoding } = require("./utils/geocode.js");
const { weatherSearch } = require("./utils/weatherSearch.js");
const { printWeatherData, displayError } = require("./utils/printFunctions");
require("dotenv").config();

// Geocoding parameters
let search_text = process.argv[2];
const geo_token = process.env.GEOCODE_TOKEN;

//weather api parameters
const weather_token = process.env.WEATHER_TOKEN;

geoCoding(search_text, geo_token)
  .then((data) =>
    weatherSearch(data, weather_token)
      .then((data) => printWeatherData(data))
      .catch((error) => displayError(error))
  )
  .catch((error) => displayError(error));
