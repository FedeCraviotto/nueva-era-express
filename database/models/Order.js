const OrderDetails = require('./OrderDetails');

module.exports = (sequelize, dataTypes) => {
    const alias = 'Orders';
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        created_at : { // En sequelize no figura cual es el dataType. Así funcionó. 
            type: 'TIMESTAMP',
        },
        updated_at : {
            type: 'TIMESTAMP',
        },
        amount: {
            type: dataTypes.INTEGER.UNSIGNED,
        },
        shippingAddress: {
            type: dataTypes.STRING,
        },
        paymentMethod: {
            type: dataTypes.STRING,
        },
        order_status: {
            type: dataTypes.STRING,
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED,
        },
    };
    const config = {
        tableName: 'orders',
        timestamps: false, // Que NO las genere automáticamente. Pero tenemos timestamps
    };
    const Order = sequelize.define(alias, cols, config);
    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'users',
        });
        Order.belongsToMany(models.Products, {
            as: 'products',
            through: 'order_details',
            foreignKey: 'order_id',
            otherKey: 'product_id',
            timestamps: false,
        });
    };
    return Order;
};
