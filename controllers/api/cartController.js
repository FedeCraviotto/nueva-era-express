const db = require('../../database/models');
const Op = db.Sequelize.Op;

const cartController = {
    allDetails: (req, res) => {
        db.OrderDetails.findAll()
            .then((results) => {
                return res.json({
                    total: results.length,
                    orders: results,
                });
            })
            .catch((err) => {
                res.json({
                    message: 'Hubo un error al procesar tu consulta',
                    error: err,
                });
            });
    },
    allOrders: (req, res) => {
        db.Orders.findAll({
            include: ['products'],
        })
            .then((results) => {
                return res.json({
                    total: results.length,
                    orders: results,
                });
            })
            .catch((err) => {
                res.json({
                    message: 'Hubo un error al procesar tu consulta',
                    error: err,
                });
            });
    },
    allUserOrders: (req, res) => {
        if (req.session.userLogged) {
            db.Orders.findAll({
                where: {
                    user_id: req.session.userLogged.id,
                },
                include: ['products'],
            })
                .then((results) => {
                    return res.json({
                        total: results.length,
                        orders: results,
                    });
                })
                .catch((err) => {
                    res.json({
                        message: 'Hubo un error al procesar tu consulta',
                        error: err,
                    });
                });
        } else {
            res.json({
                status : 'error',
                message : 'No hay ningun usuario logeado!'
            })
        }
    },
    orderDetails: (req, res) => {
        db.OrderDetails.findAll({
            where: {
                order_id: req.params.orderId,
            },
            include: [db.Products],
        })
            .then((results) => {
                return res.json({
                    orderDetails: results,
                });
            })
            .catch((err) => {
                res.json({
                    message: 'Bad request',
                    error: err,
                });
            });
    },
    createOrder: (req, res) => {
        db.Orders.create({
            amount: req.body.amount,
            shippingAddress: req.body.shippingAddress,
            phone: req.body.phone,
            paymentMethod: req.body.paymentMethod,
            order_status: 'Pending',
            user_id: req.session.userLogged.id,
        }).then((newOrder) => {
            res.json({
                status: 200,
                message: 'Order created successfuly!',
                orderId: newOrder.id,
                order: newOrder,
            });
        }).catch(err => {
            res.status(500).json({
                message: 'An error occured while processing your order',
                error: err
            })
        })
    },
    createOrderDetailsRecord: (req, res) => {
        db.OrderDetails.create({
            ...req.body,
        }).then((newOrderDetails) => {
            res.json({
                status: 200,
                message: 'Order details successfuly registered!',
                DetailsId: newOrderDetails.id,
                newOrderDetails: newOrderDetails,
            });
        }).catch(err => {
            res.status(500).json({
                message: 'An error occured while processing the order details',
                error: err
            })
        })
    },
    update_cart: async (req, res) => {
        if (req.session.userLogged) {
            try {                
                await db.User.update(
                    {
                        cart: req.body,
                    },
                    {
                        where: { id: req.session.userLogged.id },
                    }
                );
                req.session.userLogged.cart = req.body
                return res.json({
                    message : 'Carrito Actualizado'
                })
            } catch (error) {
                throw new Error(
                    'Ocurrio un problema al actualizar la informacion, intente nuevamente mas tarde'
                );
            }
        } else {
            return res.json({
                error : 'No hay ningun usuario logeado aun!'
            })
        }
    },
    lastFiveSold : (req, res) => {
        db.OrderDetails.findAll({
            include: [db.Products],
            order:[['id', 'DESC']],      
            limit: 5,
        })
        .then(lastItems => {
            let items = []
            lastItems.forEach(item => {
                items.push(item.Product.name);
            })
            res.status(200).json({
                items
            })
        }).catch(err => {
            res.status(500).json({
                message: 'An error occured while processing your request',
                error: err
            })
        })
    },
    totalProductsSold : (req, res) => {
        db.OrderDetails.findAll({
            include: [db.Products]
        }).then(details => {
            res.status(200).json({
                details
            })
        }).catch(err => {
            res.status(500).json({
                message: 'An error occured while processing your request',
                error: err
            })
        })

    }
};

module.exports = cartController;
