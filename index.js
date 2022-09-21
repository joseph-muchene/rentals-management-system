const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (req, res) => {
  return res.sendFile(__dirname + "/public/login.html");
});

app.get("/register", (req, res) => {
  return res.sendFile(__dirname + "/public/register.html");
});

app.get("/manage", (req, res) => {
  return res.sendFile(__dirname + "/public/manage.html");
});
app.get("/login.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/login.js");
});
app.get("/manage.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/manage.js");
});
app.get("/main.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/main.js");
});

app.get("/home.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/home.js");
});

app.get("/config.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/config.js");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
