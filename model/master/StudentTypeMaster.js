module.exports = (sequelize, DataTypes) => {
    const StudentTypeMaster = sequelize.define('StudentTypeMaster', {
        StudentTypeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        StudentType: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return StudentTypeMaster;
};
