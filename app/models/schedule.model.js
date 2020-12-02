const sql = require("./db.js");

// constructor
const Schedule = function(Schedule) {
  this.username = user.username;
  this.schedule_name = user.schedule_name;
  this.crn = user.crn;
};

Schedule.create = (newSchedule, result) => {
  sql.query("INSERT INTO schedule SET ?", newSchedule, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created schedule: ", { id: res.insertId, ...newSchedule });
    result(null, { id: res.insertId, ...newSchedule });
  });
};

Schedule.findById = (username, result) => {
  sql.query(`SELECT * FROM schedule WHERE username = ${username}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Schedule.getAll = result => {
  sql.query("SELECT * FROM schedule", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("schedule: ", res);
    result(null, res);
  });
};

Schedule.updateById = (id, user, result) => {
  sql.query(
    "UPDATE schedule SET schedule_name = ?, username = ?, crn = ? WHERE username = ?",
    [Schedule.schedule_name, Schedule.username, Schedule.crn, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated schedule: ", { id: id, ...Schedule});
      result(null, { id: id, ...Schedule });
    }
  );
};

Schedule.remove = (id, result) => {
  sql.query("DELETE FROM schedule WHERE username = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted schedule with username: ", id);
    result(null, res);
  });
};

Schedule.removeAll = result => {
  sql.query("DELETE FROM schedule", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} schedule`);
    result(null, res);
  });
};

module.exports = Schedule;
