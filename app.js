const express = require("express");
const debug = require("debug")("app:start");
// const dbDebug = require("debug")("app:db");
const config = require("config");
// const { log } = require("./logger");
const morgan = require("morgan");
const Joi = require("joi");
const app = express();

app.use(express.json()); // body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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

// app.use((req, res, next) => {
//   console.log("autenticando");
//   next();
// });

const users = [
  {
    id: 1,
    name: "Gustavo",
  },
  {
    id: 2,
    name: "Tobi",
  },
  {
    id: 3,
    name: "Christopher",
  },
  {
    id: 4,
    name: "Robin Hood",
  },
];
const userExists = (id) => {
  return users.find((user) => user.id === parseInt(id));
};
const validateLengthName = (keyName, value) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate({ [keyName]: value });
};
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = userExists(req.params.id);
  if (!user) {
    res.status(404).send("user not found");
    return;
  }
  res.send(user);
});

app.post("/api/users", (req, res) => {
  const { value, error } = validateLengthName("name", req.body.name);
  if (!error) {
    const user = {
      id: users.length + 1,
      name: value.name,
    };
    users.push(user);
    res.send(user);
  } else {
    res.status(400).send(error.details[0].message);
  }
});

app.put("/api/users/:id", (req, res) => {
  //Find the user
  const user = userExists(req.params.id);

  if (!user) {
    res.status(404).send("page not found");
    return;
  }
  const { value, error } = validateLengthName("name", req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  user.name = value.name;
  res.send(user);
  console.log(value.name);
});

app.delete("/api/users/:id", (req, res) => {
  const user = userExists(req.params.id);

  if (!user) {
    res.status(404).send("user not found");
    return;
  }
  const index = users.indexOf(user);
  console.log(index);
  users.splice(index, 1);
  res.send(user);
});
// Set the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at ${port} :D`);
});
