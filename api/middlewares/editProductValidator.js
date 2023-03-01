const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const e = require('express');

const editProductvalidations = [
  body("newImage")
    .custom((value, { req }) => {
      const file = req.file;
      console.log('file', file)
      if (file) {
        const validExt = [".jpg", ".png", ".jpeg"];
        const fileExt = path.extname(file.originalname);
        if (!validExt.includes(fileExt.toLowerCase())) {
          fs.unlinkSync(file.path);
          throw new Error(
            `Las extensiones de archivo permitidas son ${validExt.join(", ")}`
          ); // Reject
        } else {
            return true; // Resolve    
        }
      } else {
        return true; // Resolve
      }
    })
    .bail(),
  body("name")
    .notEmpty()
    .withMessage("Debes ingresar un nombre de producto")
    .bail(),
  body("category")
    .custom((value) => {
      if (value === "") {
        throw new Error("Debes seleccionar una categoria");
      }
      return true;
    })
    .bail(),
  body("brand")
    .custom((value) => {
      if (value === "") {
        throw new Error("Debes seleccionar una marca");
      }
      return true;
    })
    .bail(),
  body("shortDesc")
    .notEmpty()
    .withMessage("Debes ingresar una descripción corta")
    .bail(),
  body("longDesc")
    .notEmpty()
    .withMessage("Debes ingresar una descripción larga")
    .bail(),
  body("color")
    .custom((value) => {
      if (value === "") {
        throw new Error("Debes seleccionar un color");
      }
      return true;
    })
    .bail(),
  body("price").notEmpty().withMessage("Debes ingresar un precio").bail(),
  body("dispatch")
    .notEmpty()
    .withMessage("Debes elegir si el envío es gratuito o no")
    .bail(),
  body("discount")
    .notEmpty()
    .withMessage("Debes indicar un descuento. Ingresa un número entre 0 y 100")
    .bail(),
  body("stock")
    .notEmpty()
    .withMessage("Debes ingresar stock disponible")
    .bail(),
];

module.exports = { editProductvalidations, validationResult };