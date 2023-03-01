module.exports = (sequelize, dataTypes) => {
    const alias = 'PasswordResets'
    const cols = {
        email : {
            type : dataTypes.STRING
        },
        token : {
            type : dataTypes.STRING
        }
    };
    const config = {
        tableName : 'password_resets',
        timestamps: false
    }
    const PasswordReset = sequelize.define(alias, cols, config);
    return PasswordReset;
};