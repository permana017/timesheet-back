const express = require("express");
const router = express();
const userRouter = require("./user.route");
const timesheetRouter = require("./timesheet.route");
const projectRouter = require("./project.route");

router.use("/users", userRouter);
router.use("/timesheet", timesheetRouter);
router.use("/projects", projectRouter);

module.exports = router;
