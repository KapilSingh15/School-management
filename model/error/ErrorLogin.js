module.exports = (sequelize, DataTypes) => {
    const ErrorLogin = sequelize.define('ErrorLogin', {
        LoginID: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        Password: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return ErrorLogin;
};
