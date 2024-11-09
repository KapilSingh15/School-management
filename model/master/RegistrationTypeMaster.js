module.exports = (sequelize, DataTypes) => {
    const RegistrationTypeMaster = sequelize.define('RegistrationTypeMaster', {
        RegistrationTypeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        RegistrationType: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return RegistrationTypeMaster;
};
