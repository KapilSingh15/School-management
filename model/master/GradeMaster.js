module.exports = (sequelize, DataTypes) => {
    const GradeMaster = sequelize.define('GradeMaster', {
        GradeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Grade: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        RangeFrom: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        RangeTo: {
            type: DataTypes.INTEGER,
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

    return GradeMaster;
};
