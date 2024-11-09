module.exports = (sequelize, DataTypes) => {
    const ErrorDetails = sequelize.define('ErrorDetails', {
        ErrorID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        PageName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        ErrorMessage: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        MachineName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        IPAddress: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        CreatedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return ErrorDetails;
};
