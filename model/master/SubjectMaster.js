module.exports = (sequelize, DataTypes) => {
    const SubjectMaster = sequelize.define('SubjectMaster', {
        SubjectID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        SubjectName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        IsOptional: {
            type: DataTypes.BOOLEAN,
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

    return SubjectMaster;
};
