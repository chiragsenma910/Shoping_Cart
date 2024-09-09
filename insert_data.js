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
var s="INSERT INTO Product_106 (product_id,product_name,product_brand,product_price,product_ram,product_storage,product_camera,product_image, product_quantity, product_status) VALUES ?"
var values=[
   [1, 'Honor 9 Lite (Sapphire Blue, 64 GB)  (4 GB RAM)', 'Honor', '14499.00', '4', '64', '13', 'D:\\images\\image-1.jpeg', 10, '1'],
   [2, 'Infinix Hot S3 (Sandstone Black, 32 GB)  (3 GB RAM)', 'Infinix', '8999.00', '3', '32', '13','D:\\images\\image-2.jpeg', 10, '1'],
   [3, 'VIVO V9 Youth (Gold, 32 GB)  (4 GB RAM)', 'VIVO', '16990.00', '4', '32', '16','D:\\images\\image-3.jpeg', 10, '1'],
   [4, 'Moto E4 Plus (Fine Gold, 32 GB)  (3 GB RAM)', 'Moto', '11499.00', '3', '32', '8','D:\\images\\image-4.jpeg', 10, '1'],
   [5, 'Lenovo K8 Plus (Venom Black, 32 GB)  (3 GB RAM)', 'Lenevo', '9999.00', '3', '32', '13','D:\\images\\image-5.jpeg', 10, '1'],
   [6, 'Samsung Galaxy On Nxt (Gold, 16 GB)  (3 GB RAM)', 'Samsung', '10990.00', '3', '16', '13','D:\\images\\image-6.jpeg', 10, '1'],
   [7, 'Moto C Plus (Pearl White, 16 GB)  (2 GB RAM)', 'Moto', '7799.00', '2', '16', '8','D:\\images\\image-7.jpeg', 10, '1'],
   [8, 'Panasonic P77 (White, 16 GB)  (1 GB RAM)', 'Panasonic', '5999.00', '1', '16', '8','D:\\images\\image-8.jpeg', 10, '1'],
   [9, 'OPPO F5 (Black, 64 GB)  (6 GB RAM)', 'OPPO', '19990.00', '6', '64', '16','D:\\images\\image-9.jpeg', 10, '1'],
   [10, 'Honor 7A (Gold, 32 GB)  (3 GB RAM)', 'Honor', '8999.00', '3', '32', '13','D:\\images\\image-10.jpeg', 10, '1'],
   [11, 'Asus ZenFone 5Z (Midnight Blue, 64 GB)  (6 GB RAM)', 'Asus', '29999.00', '6', '128', '12','D:\\images\\image-11.jpeg', 10, '1'],
   [12, 'Redmi 5A (Gold, 32 GB)  (3 GB RAM)', 'MI', '5999.00', '3', '32', '13','D:\\images\\image-12.jpeg', 10, '1'],
   [13, 'Intex Indie 5 (Black, 16 GB)  (2 GB RAM)', 'Intex', '4999.00', '2', '16', '8', 'D:\\images\\image-13.jpeg', 10, '1'],
   [14, 'Google Pixel 2 XL (18:9 Display, 64 GB) White', 'Google', '61990.00', '4', '64', '12','D:\\images\\image-14.jpeg', 10, '1'],
   [15, 'Samsung Galaxy A9', 'Samsung', '36000.00', '8', '128', '24','D:\\images\\image-15.jpeg', 10, '1']
];
  connection.query(s,[values],function(err) {
    if (err){
    console.log(err);
}
else{
    console.log('Data inserted successfully!!');
} 
  });
  connection.end();
} 
});
