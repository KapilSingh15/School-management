module.exports = (sequelize, DataTypes) => {
    const ClassSubjectMappingMaster = sequelize.define('ClassSubjectMappingMaster', {
        ClassSubjectMappingID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        ClassID: {
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

    return ClassSubjectMappingMaster;
};
