module.exports = app => {
  const Schedule = require("../controllers/schedule.controller.js");

  // Create a new schedule
  app.post("/Schedule", schedule.create);

  // Retrieve all schedule
  app.get("/Schedule", schedule.findAll);

  // Retrieve a single schedule with username
  app.get("/Schedule/:username", schedule.findOne);

  // Update a schedule with username
  app.put("/Schedule/:username", schedule.update);

  // Delete a schedule with username
  app.delete("/Schedule/:username", schedule.delete);

  // Create a new schedule
  app.delete("/Schedule", users.deleteAll);
};
