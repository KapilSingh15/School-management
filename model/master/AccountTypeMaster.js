module.exports = (sequelize, DataTypes) => {
    const AccountTypeMaster = sequelize.define('AccountTypeMaster', {
        AccountTypeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        AccountType: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return AccountTypeMaster;
};
