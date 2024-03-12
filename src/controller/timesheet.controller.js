const timesheetModel = require("../model/timesheet.model");

const timesheetController = {
  findAll: (req, res) => {
    const userId = req.query?.userId;
    return timesheetModel
      .findAll(userId)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  findById: (req, res) => {
    const { id } = req.params;
    return timesheetModel
      .findById(id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  add: (req, res) => {
    return timesheetModel
      .add(req.body)
      .then((result) => {
        return res.status(201).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  update: (req, res) => {
    const { id } = req.params;
    return timesheetModel
      .update(req.body, id)
      .then((result) => {
        return res.status(201).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  remove: (req, res) => {
    const { id } = req.params;
    return timesheetModel
      .remove(id)
      .then((response) => {
        return res.status(202).send({ message: response });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = timesheetController;
