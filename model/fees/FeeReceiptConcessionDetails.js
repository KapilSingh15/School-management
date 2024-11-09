module.exports = (sequelize, DataTypes) => {
    const FeeReceiptConcessionDetails = sequelize.define('FeeReceiptConcessionDetails', {
        FeeReceiptConcessionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FeeReceiptID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FeeHeadID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ConcessionAmount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return FeeReceiptConcessionDetails;
};
