const Joi = require("joi");

const controller = {};

const userExists = (id) => {
  return users.find((user) => user.id === parseInt(id));
};
const validateLengthName = (keyName, value) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate({ [keyName]: value });
};

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

controller.index = (req, res) => {
  res.send(users);
};

controller.getUser = (req, res) => {
  const user = userExists(req.params.id);
  if (!user) {
    res.status(404).send("user not found");
    return;
  }
  res.send(user);
};

controller.createPost = (req, res) => {
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
};

controller.updateUser = (req, res) => {
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
};

controller.deleteUser = (req, res) => {
  const user = userExists(req.params.id);

  if (!user) {
    res.status(404).send("user not found");
    return;
  }
  const index = users.indexOf(user);
  console.log(index);
  users.splice(index, 1);
  res.send(user);
};

module.exports = controller;
