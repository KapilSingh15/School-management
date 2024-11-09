module.exports = (sequelize, DataTypes) => {
    const AttendanceMaster = sequelize.define('AttendanceMaster', {
        AttendanceID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        FinancialYearID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ClassID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        SectionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        AttendanceDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        CreatedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        ModifiedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        CreatedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ModifiedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return AttendanceMaster;
};
