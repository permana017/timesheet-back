const express = require("express");
const timesheetRouter = express();
const timesheetController = require("../controller/timesheet.controller");

timesheetRouter.get("/", timesheetController.findAll);
timesheetRouter.get("/:id", timesheetController.findById);
timesheetRouter.post("/", timesheetController.add);
timesheetRouter.put("/:id", timesheetController.update);
timesheetRouter.delete("/:id", timesheetController.remove);

module.exports = timesheetRouter;
