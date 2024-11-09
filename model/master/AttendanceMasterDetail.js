module.exports = (sequelize, DataTypes) => {
    const AttendanceMasterDetail = sequelize.define('AttendanceMasterDetail', {
        AttendanceDetailID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        AttendanceID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        StudentID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        StatusID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Remarks: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return AttendanceMasterDetail;
};
