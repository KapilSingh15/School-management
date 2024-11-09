module.exports = (sequelize, DataTypes) => {
    const BloodGroupMaster = sequelize.define('BloodGroupMaster', {
        BloodGroupID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        BloodGroup: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return BloodGroupMaster;
};
