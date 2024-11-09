module.exports = (sequelize, DataTypes) => {
    const MonthMaster = sequelize.define('MonthMaster', {
        MonthID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        MonthName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        NoOfDays: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        LeapYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        SortBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return MonthMaster;
};
