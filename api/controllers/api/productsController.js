const db = require('../../database/models');
const Op = db.Sequelize.Op;
require('dotenv').config();

const productsController = {
    page: (req, res) => {
        let paginado = req.params.pagenumber * 10;
        let previousPage =
            parseInt(req.params.pagenumber) === 0
                ? null
                : parseInt(req.params.pagenumber) - 1;
        let nextPage = parseInt(req.params.pagenumber) + 1;

        // Pidieron cuantos productos hay por categoría, y el nombre de la categoría...
        let byCategories = db.Products.findAll({
            attributes: [
                'categories.name',
                [
                    db.Sequelize.fn('count', db.Sequelize.col('category_id')),
                    'count',
                ],
            ],
            include: ['categories'],
            group: ['categories.name', 'categories.id'],
        });
        // Y los productos con todas las asociaciones...
        let allProducts = db.Products.findAll({
            include: [
                { association: 'brands' },
                { association: 'categories' },
                { association: 'colors' },
            ],
            attributes: ['id', 'name', 'category_id', 'detail'],
            limit: 10,
            offset: paginado,
        });

        Promise.all([byCategories, allProducts])
            .then((results) => {
                // En la primer promesa vienen las categorías
                // Creamos un objeto que va a ser { nombreDeCategoría : cantidad de productos de esa categoría }
                let countByCategories = {};
                let processedResults = [];
                if (results[1].length > 0) {
                    // En la primer promesa con--> results[0] vienen las categorías. Entramos a cada una con --> [i]
                    // Hay que ingresar al valor de esta manera...
                    for (let i = 0; i < results[0].length; i++) {
                        countByCategories[
                            results[0][i]['dataValues']['categories']['name']
                        ] = results[0][i]['dataValues']['count'];
                    }
                    // En la segunda promesa --> results[1] vienen los productos
                    // Formateamos los resultados de un producto en un objeto
                    // y los pusheamos a processedResults
                    for (let i = 0; i < results[1].length; i++) {
                        let formattedResult = {
                            id: results[1][i].id,
                            name: results[1][i].name,
                            category: results[1][i].categories.name,
                            detail: results[1][i].detail,
                        };
                        processedResults.push(formattedResult);
                    }
                }
                // Ya tenemos nuestras categorías {nombre : nProds}
                // Los productos [{prod}, {prod}, {prod}, etc]
                // Seteamos lo que va a ir al json
                let finalResponse = {
                    total: results[1].length,
                    itemsRetrieved: `products ${paginado + 1} up to ${
                        paginado + 10
                    }`,
                    countByCategories,
                    products: processedResults,
                };
                // Aca sucede lo siguiente
                // Más arriba, en base a lo que nos venía como parámetro, seteábamos el nextPage y previousPage
                // Acá, entonces, al objeto respuesta, si corresponde agregarle nextPage, lo hacemos
                // Lo mismo con previousPage
                if (previousPage != null) {
                    finalResponse.previous = `${process.env.WEBPAGE_PROTOCOL}://${process.env.WEBPAGE_NAME}/api/products/page/${previousPage}`;
                }
                if (nextPage !== null) {
                    finalResponse.next = `${process.env.WEBPAGE_PROTOCOL}://${process.env.WEBPAGE_NAME}/api/products/page/${nextPage}`;
                }

                return res.json({
                    ...finalResponse,
                });
            })
            .catch((err) => {
                res.json({
                    message: 'Bad request',
                    error: err,
                });
            });
    },
    // Elegimos las asociaciones, como pidieron
    // Traemos solo ciertos atributos,no podemos incluir datos sensibles
    // Formateamos cada campo de la respuesta
    detail: (req, res) => {
        db.Products.findByPk(req.params.id, {
            include: ['brands', 'categories', 'colors'],
            attributes: [
                'id',
                'name',
                'price',
                'shortDesc',
                'longDesc',
                'image',
                'dispatch',
                'discount',
            ],
        })
            .then((productToDetail) => {
                let processedProduct = {
                    id: productToDetail['dataValues']['id'],
                    name: productToDetail['dataValues']['name'],
                    price: productToDetail['dataValues']['price'],
                    // img != url. Tenemos que incluirlo para el front. NO borrar
                    image: productToDetail['dataValues']['image'],
                    shortDesc: productToDetail['dataValues']['shortDesc'],
                    longDesc: productToDetail['dataValues']['longDesc'],
                    dispatch: productToDetail['dataValues']['dispatch'],
                    discount: productToDetail['dataValues']['discount'],
                    brand: productToDetail['dataValues']['brands'][
                        'dataValues'
                    ]['name'],
                    category:
                        productToDetail['dataValues']['categories'][
                            'dataValues'
                        ]['name'],
                    color: productToDetail['dataValues']['colors'][
                        'dataValues'
                    ]['name'],
                };
                return res.status(200).json({
                    product: processedProduct,
                    url:`${process.env.WEBPAGE_PROTOCOL}://${process.env.WEBPAGE_NAME}/images/products/` + productToDetail.image,
                });
            })
            .catch((err) => {
                res.json({
                    message: 'Bad request',
                    error: err,
                });
            });
    },
    allProducts: (req, res) => {
        // Lo mismo que en fila 40. Pidieron esto.
        let byCategories = db.Products.findAll({
            attributes: [
                'categories.title',
                [
                    db.Sequelize.fn('count', db.Sequelize.col('category_id')),
                    'count',
                ],
            ],
            include: ['categories'],
            group: ['categories.title', 'categories.id'],
        });

        let allProducts = db.Products.findAll({
            include: [
                { association: 'brands' },
                { association: 'categories' },
                { association: 'colors' },
            ],
            attributes: ['id', 'name', 'category_id', 'detail', 'stock', 'price'],
        });

        Promise.all([byCategories, allProducts])
            .then((results) => {
                let countByCategories = {};

                for (let i = 0; i < results[0].length; i++) {
                    countByCategories[
                        results[0][i]['dataValues']['categories']['title']
                    ] = results[0][i]['dataValues']['count'];
                }
                let processedResults = [];
                for (let i = 0; i < results[1].length; i++) {
                    let formattedResult = {
                        id: results[1][i].id,
                        name: results[1][i].name,
                        category: results[1][i].categories.name,
                        brand: results[1][i].brands.name,
                        price: results[1][i].price,
                        stock: results[1][i].stock,
                        detail: results[1][i].detail,
                    };
                    processedResults.push(formattedResult);
                }
                return res.json({
                    total: results[1].length,
                    countByCategories,
                    products: processedResults,
                });
            })
            .catch((err) => {
                res.json({
                    message: 'Bad request',
                    error: err,
                });
            });
    },
    lastProduct : (req, res) => {
        db.Products.findAll({
            include: ['brands', 'categories', 'colors'],
            attributes: [
                'id',
                'name',
                'price',
                'shortDesc',
                'longDesc',
                'image',
                'dispatch',
                'discount',
            ],
            order:[['id', 'DESC']],      
            limit: 1,
        })
        .then(productList =>{
            let lastProduct = productList[0];
            let processedProduct = {
              id: lastProduct["dataValues"]["id"],
              name: lastProduct["dataValues"]["name"],
              price: lastProduct["dataValues"]["price"],
              image: lastProduct["dataValues"]["image"],
              shortDesc: lastProduct["dataValues"]["shortDesc"],
              longDesc: lastProduct["dataValues"]["longDesc"],
              dispatch: lastProduct["dataValues"]["dispatch"],
              discount: lastProduct["dataValues"]["discount"],
              brand: lastProduct["dataValues"]["brands"]["dataValues"]["name"],
              category: lastProduct["dataValues"]["categories"]["dataValues"]["name"],
              color: lastProduct["dataValues"]["colors"]["dataValues"]["name"],
              url:`${process.env.WEBPAGE_PROTOCOL}://${process.env.WEBPAGE_NAME}/images/products/` + lastProduct["dataValues"]["image"]
            };
            res.json({processedProduct});
        })
    }
};

module.exports = productsController;
