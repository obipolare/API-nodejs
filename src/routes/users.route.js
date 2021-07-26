const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");

router.get("/", controller.index);

router.get("/:id", controller.getUser);

router.post("/", controller.createPost);

router.put("/:id", controller.updateUser);

router.delete("/:id", controller.deleteUser);

module.exports = router;
