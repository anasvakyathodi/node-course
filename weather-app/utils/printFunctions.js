const chalk = require("chalk");

// function to display weather data
const printWeatherData = ({ name, weather, main, dt, clouds }) => {
  const currTime = new Date(dt * 1000);
  return console.log(
    "\nPlace:\t" +
      chalk.green(name) +
      "\nweather:" +
      chalk.green(weather[0].main + "(" + weather[0].description + ")") +
      "\ntemp:\t" +
      chalk.green(Math.round(main.temp - 273).toString() + "°C") +
      "\nTime:\t" +
      chalk.green(currTime.toLocaleTimeString()) +
      "\nProbability:" +
      chalk.green(clouds.all.toString() + "% Cloudy")
  );
};

//function to display errors
const displayError = (error) => console.log(chalk.red.inverse(error));

module.exports = { printWeatherData, displayError };
