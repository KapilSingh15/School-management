module.exports = (sequelize, DataTypes) => {
    const ExaminationScheduleMaster = sequelize.define('ExaminationScheduleMaster', {
        ExaminationScheduleID: {
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
        TermID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        DateFrom: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        DateTo: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return ExaminationScheduleMaster;
};
