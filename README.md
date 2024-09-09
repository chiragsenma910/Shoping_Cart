# Shoping_Cart

## Overview
This Shopping Cart application is built using **Node.js**, **Express**, and **MySQL**. It allows users to view products, add items to their cart, and manage cart items with features like updating quantities, viewing total prices, and removing products.

## Features
- **Product Listing**: Fetches and displays products from a MySQL database.
- **Add to Cart**: Users can add products to their cart from the product listing page.
- **Cart Management**: Users can view their cart, see product details, update item quantities, and remove items.
- **Price Calculation**: The total cart price is dynamically calculated based on the selected items and their quantities.
- **Database Integration**: Uses MySQL to store and manage products and cart data.

## Technologies Used
- **Node.js**: Backend JavaScript runtime environment.
- **Express**: Web framework for handling routes and HTTP requests.
- **MySQL**: Database for storing product and cart information.
- **Body-Parser**: Middleware for handling form data.

## Application Routes
- **GET /**: Fetch and display all available products from the database.
- **POST /add_cart**: Add a product to the cart or update its quantity if already present.
- **GET /cart**: Display the cart's contents, including product names, quantities, and prices.
- **POST /remove_item**: Remove a specific item from the cart.
