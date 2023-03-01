const OrderDetails = require("./OrderDetails");

module.exports = (sequelize, dataTypes) => {
    const alias = 'Products'
    const cols = {
        id : {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING
        },
        brand_id : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        price : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        category_id : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        shortDesc : {
            type : dataTypes.TEXT
        },
        longDesc : {
            type : dataTypes.TEXT
        },
        image : {
            type : dataTypes.STRING
        },
        dispatch : {
            type : dataTypes.TINYINT.UNSIGNED
        },
        discount : {
            type : dataTypes.TINYINT.UNSIGNED
        },
        stock : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        color_id : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        detail: {
            type: dataTypes.STRING,
            allowNull: true,
        },
    };
    const config = {
        tableName : 'products',
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config);
    Product.associate = (models) => {
        Product.belongsTo(models.Categories, {
            as : 'categories',
            foreignKey : 'category_id'
        });
        Product.belongsTo(models.Colors, {
            as : 'colors',
            foreignKey : 'color_id'
        });
        Product.belongsTo(models.Brands, {
            as : 'brands',
            foreignKey : 'brand_id'
        });
        Product.belongsToMany(models.Orders, {
            as : 'orders',
            through : 'order_details',
            foreignKey : 'product_id',
            otherKey : 'order_id',
            timestamps : false,
        })
    };
    return Product;
};