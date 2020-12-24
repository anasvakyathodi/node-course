const request = require("request");

//geocoding function
const geoCoding = (search_text, token) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    search_text
  )}.json?access_token=${token}&limit=1`;

  return new Promise((resolve, reject) => {
    if (search_text === undefined || search_text === null) {
      reject("No Place Provided as argument");
    }
    request({ url, json: true }, (error, response) => {
      if (error) {
        reject("Unable to connect to server!");
      } else if (response.body.features.length > 0) {
        const address = response.body.features[0];
        resolve({
          latitude: address.center[1],
          longitude: address.center[0],
          place_name: address.place_name,
        });
      } else {
        reject("Unable to place details !!!");
      }
    });
  });
};

module.exports = { geoCoding };
