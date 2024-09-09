var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chirag_106',
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL!');
    var s = `CREATE TABLE cart_106 (
      product_id int(20) AUTO_INCREMENT PRIMARY KEY,
      product_name varchar(120),
      product_price decimal(8,2),
      product_quantity INT(10)
    )`;

    connection.query(s, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Table cart_106 created!');
      }

      connection.end();
    });
  }
});
