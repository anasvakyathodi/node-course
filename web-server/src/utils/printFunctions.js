const chalk = require("chalk");

// function to display weather data
const printWeatherData = ({ name, weather, main, dt, clouds }) => {
  const currTime = new Date(dt * 1000);
  const res = {
    place: name,
    weather: weather[0].main + "(" + weather[0].description + ")",
    time: currTime.toLocaleTimeString(),
    probability: clouds.all.toString() + "% Cloudy",
  };
  return res;
};

//function to display errors
const displayError = (error) => {
  error: error;
};

module.exports = { printWeatherData, displayError };
