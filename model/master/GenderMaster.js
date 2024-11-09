module.exports = (sequelize, DataTypes) => {
    const GenderMaster = sequelize.define('GenderMaster', {
        GenderID: {
            type: DataTypes.CHAR(1),
            primaryKey: true,
            allowNull: false,
        },
        Gender: {
            type: DataTypes.STRING(20),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return GenderMaster;
};
