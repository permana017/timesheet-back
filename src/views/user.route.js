const express = require("express");
const userRouter = express();
const userController = require("../controller/user.controller");

userRouter.get("/", userController.findAll);
userRouter.put("/:id", userController.update);
userRouter.post("/", userController.add);
userRouter.post("/:id", userController.remove);

module.exports = userRouter;
