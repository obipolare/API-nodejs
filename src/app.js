const express = require("express");
const routes = require("./routes/users.route");
const debug = require("debug")("app:start");
// const dbDebug = require("debug")("app:db");
const config = require("config");
const cors = require("cors");
// const { log } = require("./logger");
const morgan = require("morgan");
const path = require("path");
const app = express();

app.use(cors()); // active cors
app.use(express.json()); // body
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/users", routes);

//Configuration of entorns
// console.log("Application: " + config.get("name"));
// console.log("DB server: " + config.get("configDB.host"));

//morgan

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Moran is available");
}

// work with database
debug("conection with dataBase");

app.get("/", (req, res) => {
  res.send("hello world");
});

// Set the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at ${port} :D`);
});
