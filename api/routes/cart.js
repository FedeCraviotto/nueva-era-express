const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authValidator = require('../middlewares/authValidator');

// GET - render Order detail
router.get('/orders/details/:orderId', authValidator, cartController.details);
// GET - render Cart & Checkout
router.get('/', authValidator, cartController.cart);
// GET all orders List
router.get('/orders', authValidator, cartController.orders);
module.exports = router