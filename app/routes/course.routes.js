module.exports = app => {
  const courses = require("../controllers/course.controller.js");

  // Create a new course
  app.post("/courses", courses.create);

  // Retrieve all courses
  app.get("/courses", courses.findAll);

  // Retrieve a single course with crn
  app.get("/courses/:crn", courses.findOne);

  // Update a course with crn
  app.put("/courses/:crn", courses.update);

  // Delete a course with crn
  app.delete("/courses/:crn", courses.delete);

  // Create a new course
  app.delete("/courses", courses.deleteAll);

  // Attempt complex query
  app.get("/courses", course.complexQuery);
};

