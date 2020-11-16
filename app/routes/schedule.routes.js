module.exports = app => {
  const schedule = require("../controllers/schedule.controller.js");

  // Create a new schedule
  app.post("/schedule", schedule.create);

  // Retrieve all schedule
  app.get("/schedule", schedule.findAll);

  // Retrieve a single schedule with username
  app.get("/schedule/:username", schedule.findOne);

  // Update a schedule with username
  app.put("/schedule/:username", schedule.update);

  // Delete a schedule with username
  app.delete("/schedule/:username", schedule.delete);

  // Create a new schedule
  app.delete("/schedule", users.deleteAll);
};
