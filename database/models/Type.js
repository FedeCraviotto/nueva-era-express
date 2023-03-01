module.exports = (sequelize, dataTypes) => {
    const alias = 'Types';
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING,
        },
    };
    const config = {
        tableName: 'types',
        timestamps: false,
    };
    const Type = sequelize.define(alias, cols, config);
    Type.associate = (models) => {
        Type.hasMany(models.User, {
            foreignKey: 'type_id',
            as: 'users',
        });
    };
    return Type;
};
