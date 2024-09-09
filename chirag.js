const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 9665;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'chirag_106'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM product_106';
    connection.query(sql, (queryErr, results) => {
        if (queryErr) {
            console.error('Error executing query:', queryErr);
            return res.status(500).send('Error fetching products.');
        }

        const products = results;

        const productHtml = products.map(product => `
            <div class="col-md-4 mb-5 text-center">
                <div>
                    <img src="${product.product_image}" class="img-thumbnail mb-3" />
                </div>
                <h4><b>${product.product_name}</b></h4>
                <h3 class="text-danger">₹${product.product_price}</h3>
                <form method="post" action="/add_cart">
                    <input type="hidden" name="product_id" value="${product.product_id}" />
                    <input type="hidden" name="product_name" value="${product.product_name}" />
                    <input type="hidden" name="product_price" value="${product.product_price}" />
                    <input type="submit" class="btn btn-warning" value="Add to Cart" />
                </form>
            </div>
        `).join('');

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Node.js Tutorial - Simple Shopping Cart</title>
                <link href="https://getbootstrap.com/docs/5.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            </head>
            <body>
                <div class="container-fluid mt-5 mb-5">
                    <h1 class="text-center"><b> Shopping Cart</b></h1>
                    <div class="mt-3 mb-3">
                        <div class="row" id="product-list">
                            ${productHtml}
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
    });
});

app.post('/add_cart', (req, res) => {
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;

    const sqlCheck = 'SELECT product_id, product_quantity FROM cart_106 WHERE product_id = ?';
    connection.query(sqlCheck, [product_id], (queryErr, results) => {
        if (queryErr) {
            console.error('Error checking if item exists in cart:', queryErr);
            return res.status(500).send('Error checking the cart.');
        }

        if (results.length > 0) {
            // If the item exists, update its quantity (increase quantity by 1)
            const existingCartId = results[0].product_id;
            const existingQuantity = results[0].product_quantity;
            const newQuantity = existingQuantity + 1;

            const sqlUpdateQuantity = 'UPDATE cart_106 SET product_quantity = ? WHERE product_id = ?';
            connection.query(sqlUpdateQuantity, [newQuantity, existingCartId], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating item quantity in cart:', updateErr);
                    return res.status(500).send('Error updating cart.');
                }
                res.redirect('/cart');
            });
        } else {
            // If the item does not exist, add it to the cart
            const sqlInsert = 'INSERT INTO cart_106 (product_id, product_name, product_price, product_quantity) VALUES (?, ?, ?, 1)';
            connection.query(sqlInsert, [product_id, product_name, product_price], (insertErr) => {
                if (insertErr) {
                    console.error('Error adding to cart:', insertErr);
                    return res.status(500).send('Error adding to cart.');
                }
                res.redirect('/cart');
            });
        }
    });
});

app.get('/cart', (req, res) => {
    const sql = 'SELECT * FROM cart_106';
    connection.query(sql, (queryErr, results) => {
        if (queryErr) {
            console.error('Error fetching cart items:', queryErr);
            return res.status(500).send('Error fetching cart.');
        }

        const cart = results;

        const cartHtml = cart.map((item, index) => `
            <tr>
                <td>${item.product_name}</td>
                <td>₹${item.product_price}</td>
                <td>${item.product_quantity}</td>
                <td>
                    <form method="post" action="/remove_item">
                        <input type="hidden" name="cart_id" value="${item.product_id}">
                        <button type="submit" class="btn btn-danger btn-sm">Remove</button>
                    </form>
                </td>
            </tr>
        `).join('');

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Shopping Cart</title>
                <link href="https://getbootstrap.com/docs/5.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            </head>
            <body>
                <div class="container-fluid mt-5 mb-5">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header"><b>Shopping Cart</b></div>
                                <div class="card-body">
                                    <table class="table">
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Remove</th>
                                        </tr>
                                        ${cartHtml}
                                        <tr>
                                            <td align="right"><b>Total price</b></td>
                                            <td>₹${calculateCartTotal(cart)}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                    <a href="/" class="btn btn-primary">Continue Shopping</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
    });
});

app.post('/remove_item', (req, res) => {
    const cart_id = req.body.cart_id;

    const sql = 'DELETE FROM cart_106 WHERE product_id = ?';
    connection.query(sql, [cart_id], (queryErr) => {
        if (queryErr) {
            console.error('Error removing item from cart:', queryErr);
            return res.status(500).send('Error removing item from cart.');
        }
        res.redirect('/cart');
    });
});

function calculateCartTotal(cart) {
    return cart.reduce((total, item) => total + parseFloat(item.product_price) * item.product_quantity, 0);
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
