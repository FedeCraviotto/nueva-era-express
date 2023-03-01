module.exports = (sequelize, dataTypes) => {
    const alias = 'Categories'
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name : {
            type : dataTypes.STRING
        },
        image : {
            type : dataTypes.STRING
        },
        title : {
            type : dataTypes.STRING
        }
    };
    const config = {
        tableName : 'categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config);
    Category.associate = (models) => {
        Category.hasMany(models.Products, {
            foreignKey : 'category_id',
            as : 'products'
        });
    };
    return Category;
};