module.exports = (sequelize, DataTypes) => {
    const CityMaster = sequelize.define('CityMaster', {
        CityID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        StateID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CityName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return CityMaster;
};
