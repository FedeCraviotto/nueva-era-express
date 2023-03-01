const fs = require('fs');
const db = require('../../database/models');
const Op = db.Sequelize.Op;
require('dotenv').config();

const usersController = {
    list: (req, res) => {
        db.User.findAll({
            attributes: ['id', 'first_name', 'email', 'last_name', 'email', 'detail'],
        })
            .then((results) => {
                return res.json({
                    count: results.length,
                    users: results,
                });
            }).catch(err => {
                res.status(500).json({
                    message: 'An error occured while processing your request',
                    error: err
                })
            })
    },

    detail: (req, res) => {
        db.User.findByPk(req.params.id, {
            attributes: [
                'id',
                'first_name',
                'last_name',
                'email',
                'detail',
                'province',
                'street',
                'avatar',
                'cart',
            ],
        })
            .then((user) => {
                if (user) {
                    return res.json({
                        id: user['dataValues']['id'],
                        first_name: user['dataValues']['first_name'],
                        last_name: user['dataValues']['last_name'],
                        email: user['dataValues']['email'],
                        provincia: user['dataValues']['province'],
                        calle: user['dataValues']['street'],
                        cart: user['dataValues']['cart'],
                        avatarURL:`${process.env.WEBPAGE_PROTOCOL}://${process.env.WEBPAGE_NAME}/images/users/` + user['dataValues']['avatar'],
                    });
                } else {
                    return res.json({
                        message: 'User not found',
                        status: 400,
                    });
                }
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Something unexpected just happened',
                });
            });
    },

    getUserCart: async (req, res) => {
        if (req.session.userLogged) {
            return res.json(req.session.userLogged.cart);
        }
    },
    lastUser : (req, res) => {
        db.User.findOne({
            attributes: [
                'id',
                'first_name',
                'last_name',
                'email',
                'detail',
                'province',
                'street',
                'avatar',
                'cart',
            ],
            order:[['id', 'DESC']],      
            limit: 1,
        })
        .then(user => {
            res.json({
                user : {
                    id: user["dataValues"]["id"],
                    first_name: user["dataValues"]["first_name"],
                    last_name: user["dataValues"]["last_name"],
                    email: user["dataValues"]["email"],
                    provincia: user["dataValues"]["province"],
                    calle: user["dataValues"]["street"],
                    cart: user["dataValues"]["cart"],
                    avatarURL:`${process.env.WEBPAGE_PROTOCOL}://${process.env.WEBPAGE_NAME}/images/users/` + user["dataValues"]["avatar"],
                }
            });
        }).catch(err => {
            res.status(500).json({
                message: 'An error occured while processing your request',
                error: err
            })
        })
    }
};
module.exports = usersController;
