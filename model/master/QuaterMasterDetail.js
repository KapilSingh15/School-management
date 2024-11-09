module.exports = (sequelize, DataTypes) => {
    const QuaterMasterDetail = sequelize.define('QuaterMasterDetail', {
        QuaterDetailID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        QuaterID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        QuaterStartDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        QuaterEndDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        PayableDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        CreatedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        CreatedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        ModifiedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ModifiedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return QuaterMasterDetail;
};
