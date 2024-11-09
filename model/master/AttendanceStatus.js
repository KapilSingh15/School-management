module.exports = (sequelize, DataTypes) => {
    const AttendanceStatus = sequelize.define('AttendanceStatus', {
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

    return AttendanceStatus;
};
