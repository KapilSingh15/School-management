module.exports = (sequelize, DataTypes) => {
    const FinancialYearMaster = sequelize.define('FinancialYearMaster', {
        FinancialYearID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        StartDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        EndDate: {
            type: DataTypes.DATE,
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

    return FinancialYearMaster;
};
