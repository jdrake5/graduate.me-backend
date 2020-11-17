const sql = require("./db.js");

// constructor
const Gpa = function(gpa) {
  this.crn = gpa.crn;
  this.subject = gpa.subject;
  this.number = gpa.number;
  this.title = gpa.title;
  this.section = gpa.section;
  this.average = gpa.average;
};

Gpa.create = (newGpa, result) => {
  sql.query("INSERT INTO gpa SET ?", newGpa, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Gpa: ", { id: res.insertId, ...newGpa });
    result(null, { id: res.insertId, ...newGpa });
  });
};

Gpa.findById = (crn, result) => {
  sql.query(`SELECT * FROM gpa WHERE crn = ${crn}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Gpa: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Gpa with the id
    result({ kind: "not_found" }, null);
  });
};

Gpa.getAll = result => {
  sql.query("SELECT * FROM gpa", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("gpa: ", res);
    result(null, res);
  });
};

Gpa.updateById = (id, gpa, result) => {
  sql.query(
    "UPDATE gpa SET crn = ?, subject = ?, number = ?, title = ?, section = ?, average = ? WHERE crn = ?",
    [gpa.crn, gpa.subject, gpa.number, gpa.title, gpa.section, gpa.average, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Gpa with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Gpa: ", { id: id, ...gpa });
      result(null, { id: id, ...gpa });
    }
  );
};

Gpa.remove = (id, result) => {
  sql.query("DELETE FROM gpa WHERE crn = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Gpa with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Gpa with crn: ", id);
    result(null, res);
  });
};

Gpa.removeAll = result => {
  sql.query("DELETE FROM gpa", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} gpa`);
    result(null, res);
  });
};

module.exports = Gpa;
