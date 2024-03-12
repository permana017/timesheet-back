const express = require("express");
const projectRouter = express();
const projectController = require("../controller/project.controller");

projectRouter.get("/", projectController.findAll);
projectRouter.post("/", projectController.add);

module.exports = projectRouter;
