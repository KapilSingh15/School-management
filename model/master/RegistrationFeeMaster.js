module.exports = (sequelize, DataTypes) => {
    const RegistrationFeeMaster = sequelize.define('RegistrationFeeMaster', {
        RegistrationFeeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        RegistrationTypeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FinancialYearID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        RegistrationFee: {
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

    return RegistrationFeeMaster;
};
