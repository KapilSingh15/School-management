module.exports = (sequelize, DataTypes) => {
    const QuotaMaster = sequelize.define('QuotaMaster', {
        QuotaID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        QuotaName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return QuotaMaster;
};
