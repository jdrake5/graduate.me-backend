module.exports = app => {
  const Schedule = require("../controllers/schedule.controllers.js");

  // Create a new schedule
  app.post("/Schedule", Schedule.create);

  // Retrieve all schedule
  app.get("/Schedule", Schedule.findAll);

  // Retrieve a single schedule with username
  app.get("/Schedule/:username", Schedule.findOne);

  // Update a schedule with username
  app.put("/Schedule/:username", Schedule.update);

  // Delete a schedule with username
  app.delete("/Schedule/:username", Schedule.delete);

  // Create a new schedule
  app.delete("/Schedule", Schedule.deleteAll);
};
