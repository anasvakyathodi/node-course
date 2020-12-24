const request = require("request");

//weather search function
const weatherSearch = ({ latitude, longitude, place_name: name }, token) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${token}`;
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        reject("Unable to connect to weather API!");
      } else if (body.weather !== undefined) {
        const { weather, main, clouds, dt } = body;
        resolve({ weather, main, clouds, name, dt });
      } else {
        reject(body.message);
      }
    });
  });
};

module.exports = { weatherSearch };
