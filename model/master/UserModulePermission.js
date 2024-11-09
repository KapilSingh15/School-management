module.exports = (sequelize, DataTypes) => {
    const UserModulePermission = sequelize.define('UserModulePermission', {
        LoginID: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        ModuleID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return UserModulePermission;
};
