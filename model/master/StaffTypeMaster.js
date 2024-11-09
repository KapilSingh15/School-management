module.exports = (sequelize, DataTypes) => {
    const StaffTypeMaster = sequelize.define('StaffTypeMaster', {
        TypeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        TypeName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return StaffTypeMaster;
};
