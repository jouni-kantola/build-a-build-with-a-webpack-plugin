const path = require("path");

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.render("start");
});

app.listen(8080);

console.log("Demo web listening on port 8080...");
