const User = require("../models/user.model.js");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  // Save user in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    else res.send(data);
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single user with a username
exports.findOne = (req, res) => {
  User.findById(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send(data);
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.username
        });
      }
    } else res.send(data);
  });
};

// Update a user identified by the username in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.username,
    new user(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.username
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a user with the specified username in the request
exports.delete = (req, res) => {
  User.remove(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.username
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
};
