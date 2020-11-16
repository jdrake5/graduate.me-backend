const schedule = require("../models/schedule.model.js");

// Create and Save a new schedule
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a schedule
  const schedule = new schedule({
    username: req.body.username,
    schedule_name: req.body.schedule_name,
    crn: req.body.crn
  });
  
  // Save schedule in the database
  User.create(schedule, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    else res.send(data);
  });
};

// Retrieve all schedule from the database.
exports.findAll = (req, res) => {
  schedule.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    else res.send(data);
  });
};

// Find a single user with a username
exports.findOne = (req, res) => {
  schedule.findById(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.username
        });
      }
    } else res.send(data);
  });
};

// Update a schedule identified by the crn in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  
  schedule.updateById(
    req.params.username,
    new schedule(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found schedule with id ${req.params.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating schedule with id " + req.params.username
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a schedule with the specified username in the request
exports.delete = (req, res) => {
  schedule.remove(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found schedule with id ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete schedule with id " + req.params.username
        });
      }
    } else res.send({ message: `schedule was deleted successfully!` });
  });
};

// Delete all courses from the database.
exports.deleteAll = (req, res) => {
  schedule.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all schedule."
      });
    else res.send({ message: `All schedule were deleted successfully!` });
  });
};
