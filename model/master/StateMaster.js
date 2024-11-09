module.exports = (sequelize, DataTypes) => {
    const StateMaster = sequelize.define('StateMaster', {
        StateID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        CountryID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        StateName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return StateMaster;
};
