module.exports = (sequelize, DataTypes) => {
    const RoutPlanMaster = sequelize.define('RoutPlanMaster', {
        RoutPlanID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        RoutID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        AccountTypeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        GroupID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FinancialYearID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FrequencyID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Fare: {
            type: DataTypes.DECIMAL(18, 2),
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

    return RoutPlanMaster;
};
