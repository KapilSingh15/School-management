module.exports = (sequelize, DataTypes) => {
    const GroupMaster = sequelize.define('GroupMaster', {
        GroupID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        GroupName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return GroupMaster;
};
