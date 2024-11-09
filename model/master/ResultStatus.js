module.exports = (sequelize, DataTypes) => {
    const ResultStatus = sequelize.define('ResultStatus', {
        ResultID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Result: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return ResultStatus;
};
