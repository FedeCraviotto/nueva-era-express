const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

const validations = [
    body('first_name')
        .notEmpty()
        .withMessage('Debes ingresar un Nombre')
        .bail(),
    body('last_name')
        .notEmpty()
        .withMessage('Debes ingresar un Apellido')
        .bail(),
    body('email')
        .notEmpty()
        .withMessage('Debes ingresar un email')
        .bail()
        .isEmail()
        .withMessage('Debes ingresar un email Valido')
        .bail(),
    body('province')
        .custom((value) => {
            if (value === '') {
                throw new Error('Debes seleccionar una provincia');
            }
            return true;
        })
        .bail(),
    body('street')
        .notEmpty().withMessage('Debes ingresar una calle').bail()
        .isAlphanumeric(['es-ES'], {ignore : ' '}).withMessage('El campo debe contener tanto la calle como la altura ').bail(),
    body('phone')
        .notEmpty().withMessage('Debes ingresar un telefono').bail()
        .isNumeric().withMessage('Debes ingresar solo numeros').bail(),
    body('password')
        .notEmpty()
        .withMessage('Debes ingresar un password')
        .bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        })
        .withMessage(
            'El password debe contener minimo 8 caracteres, 1 mayuscula, 1 minuscula y 1 numero'
        ),
    body('avatar')
        .custom((value, { req }) => {
            if (req.file &&req.isInvalidExt) {
                return false;
            } else {
                return true;
            }
        })
        .withMessage('Debes subir una imagen en formato jpg, jpeg o png'),
    body('tyc')
        .exists()
        .withMessage('Debes Aceptar los terminos y condiciones'),
];

module.exports = { validations, validationResult };
