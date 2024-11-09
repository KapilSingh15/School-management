module.exports = (sequelize, DataTypes) => {
    const TimeMaster = sequelize.define('TimeMaster', {
        TimeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Time: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return TimeMaster;
};
