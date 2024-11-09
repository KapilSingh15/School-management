module.exports = (sequelize, DataTypes) => {
    const RoleMaster = sequelize.define('RoleMaster', {
        RoleID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        RoleName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return RoleMaster;
};
