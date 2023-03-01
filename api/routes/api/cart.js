const express = require('express');
const router = express.Router();
const cartControllerAPI = require('../../controllers/api/cartController');

// GET all orders FROM LOGGED USER
router.get('/orders', cartControllerAPI.allUserOrders);

// GET all orders FROM LOGGED USER
router.get('/allOrders', cartControllerAPI.allOrders);

// GET all DETAILS
router.get('/allOrderDetails', cartControllerAPI.allDetails);

// GET last five sold products
router.get('/lastFiveSold', cartControllerAPI.lastFiveSold);

// GET the number of the Total quantities sold
router.get('/totalProductsSold', cartControllerAPI.totalProductsSold);

// GET all details of 1 order
router.get('/orders/details/:orderId', cartControllerAPI.orderDetails);
// POST - Create order
router.post('/orders/create', cartControllerAPI.createOrder);
// POST - create EACH orderDetail (pivot table)
router.post(
    '/orders/createDetails',
    cartControllerAPI.createOrderDetailsRecord
);
// POST - Update cart
router.post('/update_cart', cartControllerAPI.update_cart);

module.exports = router;
