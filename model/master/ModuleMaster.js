module.exports = (sequelize, DataTypes) => {
    const ModuleMaster = sequelize.define('ModuleMaster', {
        ModuleID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        ModuleName: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Sort: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Status: {
            type: DataTypes.BOOLEAN,
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

    return ModuleMaster;
};
