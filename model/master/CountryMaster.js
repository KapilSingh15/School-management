module.exports = (sequelize, DataTypes) => {
    const CountryMaster = sequelize.define('CountryMaster', {
        CountryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        CountryName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return CountryMaster;
};
