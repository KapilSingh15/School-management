module.exports = (sequelize, DataTypes) => {
    const RoutPlanDetailMaster = sequelize.define('RoutPlanDetailMaster', {
        RoutPlanDetailID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        RoutPlanID: {
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

    return RoutPlanDetailMaster;
};
