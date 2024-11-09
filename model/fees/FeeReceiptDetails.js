module.exports = (sequelize, DataTypes) => {
    const FeeReceiptDetails = sequelize.define('FeeReceiptDetails', {
        FeeReceiptID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FeeStructureDetails: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return FeeReceiptDetails;
};
