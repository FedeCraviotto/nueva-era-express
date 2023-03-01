module.exports = (sequelize, dataTypes) => {
    const alias = 'Colors'
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
        tableName : 'colors',
        timestamps: false
    }
    const Color = sequelize.define(alias, cols, config);
    Color.associate = (models) => {
        Color.hasMany(models.Products, {
            foreignKey : 'color_id',
            as : 'products'
        });
    };
    return Color;
};