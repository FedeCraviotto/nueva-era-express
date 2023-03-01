const express = require('express');
const router = express.Router()
const productsControllerAPI = require('../../controllers/api/productsController')


//GET All products
router.get('/', productsControllerAPI.allProducts);

// GET LAST product details
router.get('/last', productsControllerAPI.lastProduct);

// GET 1 product detail
router.get('/:id', productsControllerAPI.detail);

// GET Products 10 per page (not scalable :,())
router.get('/page/:pagenumber', productsControllerAPI.page);

module.exports = router