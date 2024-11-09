module.exports = (sequelize, DataTypes) => {
    const DriverTypeMaster = sequelize.define('DriverTypeMaster', {
        DriverTypeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        DriverType: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return DriverTypeMaster;
};
