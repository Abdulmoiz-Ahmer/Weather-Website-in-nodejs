const request = require("request");

const geocode = (address, callback) => {
  request(
    {
      url:
        `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
        encodeURIComponent(address) +
        `.json?access_token=pk.eyJ1IjoiY2FtcGlvbiIsImEiOiJjazA4NWxlZWs0Nm53M2J1dGFhY2l6aTdnIn0.fQFLCY-A6Q5lqJnBEziaGQ&limit=1`,
      json: true
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to the service!", undefined);
      } else if (response.body.features.length === 0) {
        callback("Unable to find such place!", undefined);
      } else {
        callback(undefined, {
          lat: response.body.features[0].center[0],
          lng: response.body.features[0].center[1],
          loc: response.body.features[0].place_name
        });
      }
    }
  );
};

module.exports = geocode;
