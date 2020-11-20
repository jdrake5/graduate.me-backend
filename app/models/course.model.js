const sql = require("./db.js");

// constructor
const Course = function(course) {
  this.year = course.year;
  this.term = course.term;
  this.subject = course.subject;
  this.number = course.number;
  this.name = course.name;
  this.description = course.description;
  this.credit_hours = course.credit_hours;
  this.section_info = course.section_info;
  this.degree_attributes = course.degree_attributes;
  this.schedule_information = course.schedule_information;
  this.crn = course.crn;
  this.section = course.section;
  this.part_of_term = course.part_of_term;
  this.start_time = course.start_time;
  this.end_time = course.end_time;
  this.days_of_week = course.days_of_week;
  this.room = course.room;
  this.building = course.building;
  this.instructors = course.instructors;
};

Course.create = (newCourse, result) => {
  sql.query("INSERT INTO Courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Course: ", { id: res.insertId, ...newCourse });
    result(null, { id: res.insertId, ...newCourse });
  });
};

Course.findById = (courseId, result) => {
  sql.query(`SELECT * FROM Courses WHERE CRN = ${courseId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Course: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};

Course.getAll = result => {
  sql.query("SELECT * FROM Courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Courses: ", res);
    result(null, res);
  });
};

Course.updateById = (id, course, result) => {
  sql.query(
    "UPDATE Courses SET year = ?, term = ?, subject = ?, number = ?, name = ?, description = ?, credit_hours = ?, section_info = ?, degree_attributes = ?, schedule_information = ?, crn = ?, section = ?, part_of_term = ?, start_time = ?, end_time = ?, days_of_week = ?, room = ?, building = ?, instructors = ?, WHERE crn = ?",
    [course.year, course.term, course.subject, course.number, course.name, course.description, course.credit_hours, course.section_info, course.degree_attributes, course.schedule_information, course.crn, course.section, course.part_of_term, course.start_time, course.end_time, course.days_of_week, course.room, course.building, course.instructors, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Course: ", { id: id, ...course });
      result(null, { id: id, ...course });
    }
  );
};

Course.remove = (id, result) => {
  sql.query("DELETE FROM Courses WHERE crn = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Course with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Course with id: ", id);
    result(null, res);
  });
};

Course.removeAll = result => {
  sql.query("DELETE FROM Courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Courses`);
    result(null, res);
  });
};

Course.complexQuery = (genEds, result) => {
    sql.query(`SELECT * FROM Courses NATURAL JOIN Gpa`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Courses: ", res);
        result(null, res);
    });
};

module.exports = Course;
