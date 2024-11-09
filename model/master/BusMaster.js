module.exports = (sequelize, DataTypes) => {
    const BusMaster = sequelize.define('BusMaster', {
        BusID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BusName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BusNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        StatusID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return BusMaster;
};
