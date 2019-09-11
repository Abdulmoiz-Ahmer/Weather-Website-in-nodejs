const request = require("request");

const forecast = (lat,lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/6cfd9b77d694e4e3bf67037f85b8d668/${lat},${lng}`,
      json: true
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to the service!", undefined);
      } else if (response.body.error) {
        callback("Unable to find such place!", undefined);
      } else {
        callback(undefined, response.body.daily.summary);
      }
    }
  );
};


module.exports = forecast;