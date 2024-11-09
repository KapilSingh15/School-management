module.exports = (sequelize, DataTypes) => {
    const FeePlanMaster = sequelize.define('FeePlanMaster', {
        FeePlanID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        FeeHeadID: {
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
        Fee: {
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

    return FeePlanMaster;
};
