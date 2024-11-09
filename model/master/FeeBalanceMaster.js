module.exports = (sequelize, DataTypes) => {
    const FeeBalanceMaster = sequelize.define('FeeBalanceMaster', {
        FeeBalanceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        StudentID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FinancialYearID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Balance: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return FeeBalanceMaster;
};
