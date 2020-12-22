const request = require("request");

//geocoding function
const geoCoding = (search_text = kerala, token) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    search_text
  )}.json?access_token=${token}&limit=1`;

  return new Promise((resolve, reject) => {
    if (search_text === undefined || search_text === null) {
      reject("No Place Provided as argument");
    }
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        reject("Unable to connect to server!");
      } else if (body.features !== undefined) {
        const address = body.features[0];
        resolve({
          latitude: address.center[1],
          longitude: address.center[0],
          place_name: address.place_name,
        });
      } else {
        reject(response.body.message);
      }
    });
  });
};

module.exports = { geoCoding };
