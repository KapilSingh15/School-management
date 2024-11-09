module.exports = (sequelize, DataTypes) => {
    const StoppageMaster = sequelize.define('StoppageMaster', {
        StoppageID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        RoutID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Stoppage: {
            type: DataTypes.STRING(50),
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

    return StoppageMaster;
};
