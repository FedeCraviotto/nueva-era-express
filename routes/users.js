const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// middlewares
const uploadFile = require('../middlewares/multerRegister');
const { validations } = require('../middlewares/registerValidator');
const { editUserValidations } = require('../middlewares/editUserValidator');
const guestValidator = require('../middlewares/guestValidator');
const authValidator = require('../middlewares/authValidator');

//Express validator ya está instalado, falta setear

// Formulario Login vista
router.get('/login', guestValidator, usersController.login);

// Procesar Login
router.post('/login', usersController.loginProcess);

// Formulario Registro vista
router.get('/register', guestValidator, usersController.register);

// Procesar Registro
router.post(
    '/register',
    uploadFile.single('avatar'),
    validations,
    usersController.processRegister
);

// Formulario Edicion vista
router.get('/edit/:id', authValidator, usersController.edit);

// Procesar update
router.put(
    '/edit/:id',
    uploadFile.single('avatar'),
    editUserValidations,
    usersController.update
);

// Procesar delete
router.get('/delete/:id', authValidator, usersController.confirmDelete);

router.delete('/delete/:id', authValidator, usersController.delete);

// Perfil de Usuario Vista
router.get('/profile', authValidator, usersController.userProfile);

// Procesar Logout
router.get('/logout', usersController.logout);

module.exports = router;
