const express = require("express");
const debug = require("debug")("app:start");
// const dbDebug = require("debug")("app:db");
const config = require("config");
// const { log } = require("./logger");
const morgan = require("morgan");

const users = require("./router/users");
const app = express();

app.use(express.json()); // body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/users", users);

//Configuration of entorns
console.log("Application: " + config.get("name"));
console.log("DB server: " + config.get("configDB.host"));

//morgan

if (app.get("env") == "development") {
  app.use(morgan("tiny"));
  // console.log("morgan available");
  debug("Moran is available");
}

// work with database
debug("conection with dataBase");

//Middleeware from others

// app.use(log);

app.get("/", (req, res) => {
  res.send("hello world");
});

// Set the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at ${port} :D`);
});
