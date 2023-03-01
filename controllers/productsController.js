const { validationResult } = require("../middlewares/createProductValidator");
const fs = require("fs");
const db = require("../database/models");
const Op = db.Sequelize.Op;
let toThousand = require('../utils/toThousand')
const productsController = {
  list: (req, res) => {
    db.Products.findAll({
      include: [
        { association: "brands" },
        { association: "categories" },
        { association: "colors" },
      ],
      order: db.Sequelize.literal('rand()')
    }).then((products) => {
      return res.render("products/products", {
        products,
        title: "All Products",
        toThousand
      });
    });
  },
  create: (req, res) => {
    let productValidatorScript = true;
    let categories = db.Categories.findAll();
    let colors = db.Colors.findAll();
    let brands = db.Brands.findAll();
    Promise.all([categories, colors, brands]).then((values) => {
      res.render("products/product-create", {
        categories: values[0],
        colors: values[1],
        brands: values[2],
        title: "New Product",
        productValidatorScript
      });
    });
  },
  store: (req, res) => {
    const results = validationResult(req);
    if (results.errors.length > 0) {
      let productValidatorScript = true;
      let categories = db.Categories.findAll();
      let colors = db.Colors.findAll();
      let brands = db.Brands.findAll();
      Promise.all([categories, colors, brands]).then((values) => {
        return res.render("products/product-create", {
          categories: values[0],
          colors: values[1],
          brands: values[2],
          title: "New Product",
          productValidatorScript,
          errors: results.mapped(),
          oldData: req.body,
        });
      });
    } else {
      db.Products.create({
        name: req.body.name,
        brand_id: parseInt(req.body.brand),
        price: parseInt(req.body.price),
        category_id: parseInt(req.body.category),
        shortDesc: req.body.shortDesc,
        longDesc: req.body.longDesc,
        image: req.file ? req.file.filename : "",
        dispatch: parseInt(req.body.dispatch),
        discount: parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        color_id: parseInt(req.body.color),
      })
        .then((product) => {
          db.Products.update(
            {
              detail: `/api/products/${product.id}`,
            },
            {
              where: { id: product.id },
            }
          );
        })
        .then((ok) => {
          res.redirect("/products");
        });
    }
  },
  detail: (req, res) => {
    let someProducts = db.Products.findAll({limit: 12, order: db.Sequelize.literal('rand()')});
    let productToDetail = db.Products.findByPk(req.params.id, {
      include: ["brands", "categories", "colors"],
    })
    Promise.all([someProducts, productToDetail])
    .then((values) => {
      res.render("products/product-detail", {
        products : values[0],
        productToDetail : values[1],
        title: "Detail",
        toThousand
      });
    });
  },
  edit: (req, res) => {
    let editProductValidatorScript = true;
    let categories = db.Categories.findAll();
    let colors = db.Colors.findAll();
    let brands = db.Brands.findAll();
    let productToEdit = db.Products.findByPk(req.params.id, {
      include: [
        { association: "brands" },
        { association: "categories" },
        { association: "colors" },
      ],
    });
    Promise.all([categories, colors, brands, productToEdit]).then((values) => {
      res.render("products/product-edit", {
        categories: values[0],
        colors: values[1],
        brands: values[2],
        product: values[3],
        title: "Edit Product",
        editProductValidatorScript
      });
    });
  },
  update: (req, res) => {
    console.log('HOLA')
    const results = validationResult(req);
    console.log(results.errors)
    if (results.errors.length > 0) {
      let editProductValidatorScript = true;
      let categories = db.Categories.findAll();
      let colors = db.Colors.findAll();
      let brands = db.Brands.findAll();
      let productToEdit = db.Products.findByPk(req.params.id, {
        include: [
          { association: "brands" },
          { association: "categories" },
          { association: "colors" },
        ],
      });
      Promise.all([categories, colors, brands, productToEdit]).then(
        (values) => {
          res.render("products/product-edit", {
            categories: values[0],
            colors: values[1],
            brands: values[2],
            product: values[3],
            title: "Edit Product",
            editProductValidatorScript,
            oldData: req.body,
            errors: results.mapped(),
          });
        }
      );
    } else {
      db.Products.update(
        {
          name: req.body.name,
          brand_id: req.body.brand,
          price: parseInt(req.body.price),
          category_id: req.body.category,
          shortDesc: req.body.shortDesc,
          longDesc: req.body.longDesc,
          dispatch: req.body.dispatch,
          discount: parseInt(req.body.discount),
          stock: req.body.stock,
          color_id: req.body.color,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((r) => {
        if (req.file) {
          db.Products.findByPk(req.params.id)
            .then((productUpdated) => {
              if (productUpdated.image != "") {
                fs.unlinkSync(
                  "./public/images/products/" + productUpdated.image
                );
              }
              db.Products.update(
                { image: req.file.filename },
                { where: { id: req.params.id } }
              );
            })
            .then((r) => {
              res.redirect(`/products/${req.params.id}`);
            });
        } else {
          res.redirect(`/products/${req.params.id}`);
        }
      });
    }
  },
  delete: async (req, res) => {
    await db.Products.findByPk(req.params.id)
      .then((prod) => {
        fs.unlinkSync("./public/images/products/" + prod.image);
      })
      .catch((error) => {
        console.log("Posiblemente la imágen ya haya sido borrada!");
      });
    db.Products.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    }).then((resol) => {
      res.redirect("/products");
    });
  },
};

module.exports = productsController;
