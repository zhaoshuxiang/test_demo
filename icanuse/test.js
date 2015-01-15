var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'shuxiang.mysql.rds.aliyuncs.com',
  user     : 'shuxiang',
  password : 'zhaoshuxiang0301',
  database : 'icanuse'
});

connection.connect();

var sql = 'INSERT INTO browser (name, version, os) VALUES ("ie", "8.0", "xp")';
// var sql = 'select * from browser';
connection.query(sql, function(err, rows, fields) {
    console.log(rows);
    if (err) throw err;
});

connection.end();
