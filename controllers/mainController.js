const db = require('../database/models');
const Op = db.Sequelize.Op;
let toThousand = require('../utils/toThousand')

const mainController = {
    index : (req, res) => {
        let categoryRedirect = true;
        let allCategories = db.Categories.findAll();
        let someProducts = db.Products.findAll({limit: 12, order: db.Sequelize.literal('rand()')});
        Promise.all([someProducts, allCategories])
        .then(values => {
            res.render('main/index', {
                products : values[0],
                categories : values[1],
                title:'Home',
                categoryRedirect,
                toThousand
            })
        }).catch(err => {
            res.status(500).json({
                message: 'An error occured while processing your request',
                error: err
            })
        })
    },
    search : (req, res) => {
        let productsQuery = req.query.keywords.toLowerCase();
        db.Products.findAll({
            include : [{association : 'brands'},
            {association : 'categories'},
            {association : 'colors'}],
            where: {
                [Op.or]: [
                  { name : {[Op.like] : `%${productsQuery}%`} },
                  { '$categories.name$': {[Op.like] : `%${productsQuery}%`}}
                ]
              },
            order:[['name', 'DESC']]
        })
        .then(queryResults => {
            res.render('main/results', {queryProducts : queryResults, productsQuery, title:'Search results', toThousand});
        }).catch(err => {
            res.status(500).json({
                message: 'An error occured while processing your request',
                error: err
            })
        });
    }
}
module.exports = mainController;