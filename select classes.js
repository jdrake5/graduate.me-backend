var mysql = require('mysql');

var con = mysql.createConnection({
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'password',
  DB: 'graduate',
  PORT: 3306
});



con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM Courses NATURAL JOIN Gpa ORDER BY average DESC", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});




