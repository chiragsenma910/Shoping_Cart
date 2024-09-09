var mysql = require('mysql');
// 0-active and 1-inactive
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chirag_106',
});
connection.connect(function(err) {
  if (err){
    console.log(err);
  }
  else{
  console.log('Connected to MySQL!');
var s=`CREATE TABLE Product_106 (
    product_id int(20)  AUTO_INCREMENT PRIMARY KEY,
    product_name varchar(120) ,
    product_brand varchar(100),
    product_price decimal(8,2),
    product_ram char(5),
    product_storage varchar(50),
    product_camera varchar(20),
    product_image varchar(50),
    product_quantity mediumint(5),
    product_status enum('0','1')
  )`
  connection.query(s, function(err) {
    if (err){
    console.log(err);
}
else{
    console.log('Table Product_106 created!');
} 
  });
  connection.end();
} 
});
