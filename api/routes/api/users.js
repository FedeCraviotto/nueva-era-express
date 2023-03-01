const express = require('express');
const router = express.Router();
const usersControllerAPI = require('../../controllers/api/usersController');

// GET user List
router.get('/', usersControllerAPI.list);

// GET user Cart
router.get('/cart', usersControllerAPI.getUserCart);

// GET user LAST USER
router.get('/last', usersControllerAPI.lastUser);

// GET user Detail
router.get('/:id', usersControllerAPI.detail);

module.exports = router;
