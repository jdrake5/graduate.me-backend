const Course = require("../models/course.model.js");

// Create and Save a new course
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a course
  const course = new Course({
    year: req.body.year,
    term: req.body.term,
    subject: req.body.subject,
    number: req.body.number,
    name: req.body.name,
    description: req.body.description,
    credit_hours: req.body.credit_hours,
    section_info: req.body.section_info,
    degree_attributes: req.body.degree_attributes,
    schedule_information: req.body.schedule_information,
    crn: req.body.crn,
    section: req.body.section,
    part_of_term: req.body.part_of_term,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    days_of_week: req.body.days_of_week,
    room: req.body.room,
    building: req.body.building,
    instructors: req.body.instructors
  });

  // Save course in the database
  Course.create(course, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the course."
      });
    else res.send(data);
  });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
  Course.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    else res.send(data);
  });
};

// Find a single course with a crn
exports.findOne = (req, res) => {
  Course.findById(req.params.crn, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found course with id ${req.params.crn}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving course with id " + req.params.crn
        });
      }
    } else res.send(data);
  });
};

// Update a course identified by the crn in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Course.updateById(
    req.params.crn,
    new course(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found course with id ${req.params.crn}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating course with id " + req.params.crn
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a course with the specified crn in the request
exports.delete = (req, res) => {
  Course.remove(req.params.crn, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found course with id ${req.params.crn}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete course with id " + req.params.crn
        });
      }
    } else res.send({ message: `course was deleted successfully!` });
  });
};

// Delete all courses from the database.
exports.deleteAll = (req, res) => {
  Course.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all courses."
      });
    else res.send({ message: `All courses were deleted successfully!` });
  });
};

exports.findRequired = (req, res) => {
    Course.complexQuery((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving courses."
            });
        else res.send(data);
    });
};