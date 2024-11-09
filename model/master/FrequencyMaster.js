module.exports = (sequelize, DataTypes) => {
    const FrequencyMaster = sequelize.define('FrequencyMaster', {
        FrequencyID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Frequency: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return FrequencyMaster;
};
