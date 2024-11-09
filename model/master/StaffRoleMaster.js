module.exports = (sequelize, DataTypes) => {
    const StaffRoleMaster = sequelize.define('StaffRoleMaster', {
        RoleID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        RoleName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        TypeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CreatedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        ModifiedBy: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        CreatedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ModifiedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return StaffRoleMaster;
};
