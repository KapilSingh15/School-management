module.exports = (sequelize, DataTypes) => {
    const FeeHeadMonthMaster = sequelize.define('FeeHeadMonthMaster', {
        FeeHeadID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FeeHead: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        April: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        May: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        June: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        July: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        August: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        September: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        October: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        November: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        December: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        January: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        February: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        March: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return FeeHeadMonthMaster;
};
