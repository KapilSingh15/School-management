module.exports = (sequelize, DataTypes) => {
    const FrequencyMonthMappingMaster = sequelize.define('FrequencyMonthMappingMaster', {
        FrequencyMonthID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        FinancialYearID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FrequencyID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        MonthID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return FrequencyMonthMappingMaster;
};
