module.exports = (sequelize, DataTypes) => {
    const StudentHistory = sequelize.define('StudentHistory', {
        StudentID: {
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
        DateFrom: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        DateTo: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        CreatedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        CreatedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return StudentHistory;
};
