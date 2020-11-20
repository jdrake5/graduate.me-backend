const sql = require("./db.js");

// constructor
const schedule = function(schedule) {
  this.schedule_name = user.schedule_name;
  this.username = user.username;
  this.crn = user.crn;
};

schedule.create = (newUser, result) => {
  sql.query("INSERT INTO schedule SET ?", newschedule, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created schedule: ", { id: res.insertId, ...newschedule });
    result(null, { id: res.insertId, ...newschedule });
  });
};

schedule.findById = (username, result) => {
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

schedule.getAll = result => {
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

schedule.updateById = (id, user, result) => {
  sql.query(
    "UPDATE schedule SET schedule_name = ?, username = ?, crn = ? WHERE username = ?",
    [schedule.schedule_name, schedule.username, schedule.crn, id],
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

      console.log("updated schedule: ", { id: id, ...schedule});
      result(null, { id: id, ...schedule });
    }
  );
};

schedule.remove = (id, result) => {
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

schedule.removeAll = result => {
  sql.query("DELETE FROM schedule", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Uschedule`);
    result(null, res);
  });
};

module.exports = schedules;
