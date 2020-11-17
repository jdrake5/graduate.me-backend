module.exports = app => {
  const gpa = require("../controllers/gpa.controller.js");

  // Create a new gpa
  app.post("/gpa", gpa.create);

  // Retrieve all gpa
  app.get("/gpa", gpa.findAll);

  // Retrieve a single gpa with crn
  app.get("/gpa/:crn", gpa.findOne);

  // Update a gpa with crn
  app.put("/gpa/:crn", gpa.update);

  // Delete a gpa with crn
  app.delete("/gpa/:crn", gpa.delete);

  // Create a new gpa
  app.delete("/gpa", gpa.deleteAll);
};
