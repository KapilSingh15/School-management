module.exports = (sequelize, DataTypes) => {
    const AssessmentMaster = sequelize.define('AssessmentMaster', {
        AssessmentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Assessment: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        StatusID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return AssessmentMaster;
};
