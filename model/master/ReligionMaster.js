module.exports = (sequelize, DataTypes) => {
    const ReligionMaster = sequelize.define('ReligionMaster', {
        ReligionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        ReligionName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return ReligionMaster;
};
