module.exports = (sequelize, DataTypes) => {
    const ResultReportMaster = sequelize.define('ResultReportMaster', {
        SubjectID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        SubjectName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FA1: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FA2: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SA1: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Total1: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FA3: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FA4: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SA2: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Total2: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FA: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SA: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FASA: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        GradePoint: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return ResultReportMaster;
};
