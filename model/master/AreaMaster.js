module.exports = (sequelize, DataTypes) => {
    const AreaMaster = sequelize.define('AreaMaster', {
        AreaID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        AreaName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        StatusID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return AreaMaster;
};
