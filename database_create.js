var mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

connection.connect(function(err) {
  if (err) {
    console.log(err)
  } 
else{
  console.log('Connected to MySQL!');
  var s='CREATE DATABASE chirag_106';
  connection.query(s, function(err) {
    if (err)
    {
        conslole.log(err);
    }
    else
    {
    console.log('Database chirag_106 created!');
      }
    connection.end();
  });
}
});
