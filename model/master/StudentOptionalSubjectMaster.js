module.exports = (sequelize, DataTypes) => {
    const StudentOptionalSubjectMaster = sequelize.define('StudentOptionalSubjectMaster', {
        StudentID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        SubjectID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return StudentOptionalSubjectMaster;
};
