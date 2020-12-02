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
  /*Connect two tables by using one field from each table as the connection point:*/
  var sql = "SELECT *  FROM user JOIN schedule ON user.username = schedule.username";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
