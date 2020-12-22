const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Anas Vakyathodi" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/weather", (req, res) => {
  res.json({
    forecast: "Clouds",
    location: "kerala",
  });
});

app.listen(port, () => console.log("Server Running on port", port));
