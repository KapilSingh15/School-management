module.exports = (sequelize, DataTypes) => {
    const RoutMaster = sequelize.define('RoutMaster', {
        RoutID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        RoutName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BusID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        AreaIDFrom: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        AreaIDTo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        TimeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        DriverID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ConductorID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Distance: {
            type: DataTypes.INTEGER,
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

    return RoutMaster;
};
