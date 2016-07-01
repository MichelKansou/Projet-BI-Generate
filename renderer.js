// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'mydb'
});

connection.connect();


connection.query('SELECT * FROM mydb.Products', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0]);
});



connection.end();
