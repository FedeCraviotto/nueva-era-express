const db = require('../database/models');
const Op = db.Sequelize.Op;
let provinces = ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Corrientes', 'Entre Rios', ' Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquen', 'Rio Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucuman']

const cartController = {
    cart: async (req, res) => {
        let cartExists = false;
        if (JSON.parse(req.session.userLogged.cart).length > 0) {
            cartExists = true
        }
        let cartScript = true;
        res.render('cart/cart',{title:'Cart', cartScript, cartExists, provinces});
    },
    details: (req, res) => {
            let orderDetailsScript = true;
            res.render('cart/orderDetails',{title:'Order Details', orderDetailsScript, user : req.session.userLogged});
    },
    orders: async (req, res) => {
        let orderScript = true;
        res.render('cart/orders', {
            user : req.session.userLogged,
            orderScript
        });
    }
}
module.exports =cartController;