const { body, validationResult } = require('express-validator');
const path = require('path');

const editUserValidations = [
    body('first_name')
        .notEmpty()
        .withMessage('Debes ingresar un nombre')
        .bail(),
    body('last_name')
        .notEmpty()
        .withMessage('Debes ingresar un apellido')
        .bail(),
    body('email')
        .notEmpty()
        .withMessage('Debes ingresar un email')
        .bail()
        .isEmail()
        .withMessage('Debes ingresar un email Valido')
        .bail(),
    body('avatar').custom((value, { req }) => {
        // Toma el valor que se envía, y el request entero. Dentro DEL request, viajan la propiedad "req", y dentro de "req" viajan "file", "params", "body", etc.
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension.toLowerCase())) {
                //Si la extensión del archivo subido NO COINCIDE con alguna de las extensiones permitidas de "acceptedExtensions" y por lo tanto la condición da "false", envia el error.
                throw new Error(
                    `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                        ', '
                    )}`
                ); // Reject
            }
        }
        return true; // Resuelve la validacion (promise resolve)
    }),
];

module.exports = { editUserValidations, validationResult };
