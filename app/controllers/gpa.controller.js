const Gpa = require("../models/gpa.model.js");

// Create and Save a new gpa
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a gpa
  const gpa = new Gpa({
    crn: req.body.crn,
    subject: req.body.subject,
    number: req.body.number,
    title: req.body.title,
    section: req.body.section,
    average: req.body.average,
  });

  // Save gpa in the database
  Gpa.create(gpa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the gpa."
      });
    else res.send(data);
  });
};

// Retrieve all gpas from the database.
exports.findAll = (req, res) => {
  Gpa.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving gpas."
      });
    else res.send(data);
  });
};

// Find a single gpa with a crn
exports.findOne = (req, res) => {
  Gpa.findById(req.params.crn, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found gpa with id ${req.params.crn}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving gpa with id " + req.params.crn
        });
      }
    } else res.send(data);
  });
};

// Update a gpa identified by the crn in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Gpa.updateById(
    req.params.crn,
    new gpa(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found gpa with id ${req.params.crn}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating gpa with id " + req.params.crn
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a gpa with the specified crn in the request
exports.delete = (req, res) => {
  Gpa.remove(req.params.crn, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found gpa with id ${req.params.crn}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete gpa with id " + req.params.crn
        });
      }
    } else res.send({ message: `gpa was deleted successfully!` });
  });
};

// Delete all gpas from the database.
exports.deleteAll = (req, res) => {
  Gpa.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all gpas."
      });
    else res.send({ message: `All gpas were deleted successfully!` });
  });
};
