module.exports = (sequelize, DataTypes) => {
    const FeePlanDetailMaster = sequelize.define('FeePlanDetailMaster', {
        FeePlanDetailID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FeePlanID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ClassID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return FeePlanDetailMaster;
};
