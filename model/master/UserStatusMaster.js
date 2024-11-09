module.exports = (sequelize, DataTypes) => {
    const UserStatusMaster = sequelize.define('UserStatusMaster', {
        StatusID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Status: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return UserStatusMaster;
};
