module.exports = (sequelize, DataTypes) => {
    const DriverMaster = sequelize.define('DriverMaster', {
        DriverID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        DriverTypeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        DriverName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        MobileNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        StatusID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CreatedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        CreatedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        ModifiedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ModifiedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return DriverMaster;
};
