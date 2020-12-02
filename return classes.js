var mysql = require('mysql');

var con = mysql.createConnection({
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'password',
  DB: 'graduate',
  PORT: 3306
});



con.connect(function(err,selected) {
  if (err) throw err;
  con.query("Select temp1.subject,temp1.number From (SELECT DISTINCT Courses.Subject as subject ,Courses.Number as number,Courses.Start_Time as number FROM Courses NATURAL JOIN selected groupby Start_Time) as temp1 " , function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
