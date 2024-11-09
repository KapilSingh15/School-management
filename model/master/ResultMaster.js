module.exports = (sequelize, DataTypes) => {
    const ResultMaster = sequelize.define('ResultMaster', {
        ResultID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        StudentID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ExaminationScheduleID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CreatedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        CreatedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        ModifiedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ModifiedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return ResultMaster;
};
