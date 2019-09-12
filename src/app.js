const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirPath = path.join(__dirname, "../public");
const viewDirPath = path.join(__dirname, "../views");
const partialDirPath = path.join(__dirname, "../partials");
const app = express();
const port = process.env.PORT || 3000;

app.set("views", viewDirPath);
app.set("view engine", ".hbs");
hbs.registerPartials(partialDirPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abdulmoiz"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Abdulmoiz"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help those who need help...",
    name: "Abdulmoiz"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address"
    });
  }

  geocode(req.query.address, (errorTrig, data={}) => {

    if (data == undefined) {
      return res.send({
        error: errorTrig
      });
    }
  
    forecast(data.lat, data.lng, (error, response) => {
      if (response == undefined) {
        return res.send({
          error: error
        });
      }
      res.send({
        forecast: response,
        location: data.loc,
        address: req.query.address  
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help Article not found",
    name: "Ali"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "404 Page Not Found",
    name: "Ali"
  });
});

app.listen(port, () => {
  console.log("server is running");
});
