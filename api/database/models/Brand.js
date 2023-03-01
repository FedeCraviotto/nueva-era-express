module.exports = (sequelize, dataTypes) => {
    const alias = 'Brands'
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name : {
            type : dataTypes.STRING
        }
    };
    const config = {
        tableName : 'brands',
        timestamps: false

    }
    const Brand = sequelize.define(alias, cols, config);
    Brand.associate = (models) => {
        Brand.hasMany(models.Products, {
            foreignKey : 'brand_id',
            as : 'products'
        });
    };
    return Brand;
};