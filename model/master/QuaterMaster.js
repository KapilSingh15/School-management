module.exports = (sequelize, DataTypes) => {
    const QuaterMaster = sequelize.define('QuaterMaster', {
        QuaterID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        FinancialYearID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Quater: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return QuaterMaster;
};
