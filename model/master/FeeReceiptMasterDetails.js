module.exports = (sequelize, DataTypes) => {
    const FeeReceiptMasterDetails = sequelize.define('FeeReceiptMasterDetails', {
        FeeReceiptDetailID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FeeReceiptID: {
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

    return FeeReceiptMasterDetails;
};
