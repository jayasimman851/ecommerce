const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let cart = []; // Holds the items in the cart
const products = [
  { id: 1, name: 'AI Trading Bot - Basic', price: 100 },
  { id: 2, name: 'AI Trading Bot - Pro', price: 150 },
  { id: 3, name: 'AI Trading Bot - Premium', price: 250 }
];

// Home Route
app.get('/', (req, res) => {
  res.render('home');
});

// Products Route
app.get('/products', (req, res) => {
  res.render('products', { products });
});

// Add to Cart Route
app.post('/add-to-cart', (req, res) => {
  const productId = parseInt(req.body.productId);
  const product = products.find(prod => prod.id === productId);
  cart.push(product);
  res.redirect('/cart');
});

// Cart Route
app.get('/cart', (req, res) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  res.render('cart', { cart, total });
});

// Remove from Cart Route
app.post('/remove-from-cart', (req, res) => {
  const productId = parseInt(req.body.productId);
  cart = cart.filter(item => item.id !== productId);
  res.redirect('/cart');
});

// Checkout Route
app.get('/checkout', (req, res) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  res.render('checkout', { total });
});

// Confirm Order Route
app.post('/confirm-order', (req, res) => {
  cart = []; // Clear the cart after order confirmation
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
