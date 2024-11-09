module.exports = (sequelize, DataTypes) => {
    const LoginMaster = sequelize.define('LoginMaster', {
        LoginID: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        LoginName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        MobileNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        EmailID: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        RoleID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        StatusID: {
            type: DataTypes.INTEGER,
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

    return LoginMaster;
};
