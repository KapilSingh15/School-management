module.exports = (sequelize, DataTypes) => {
    const StaffMaster = sequelize.define('StaffMaster', {
        StaffID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        RoleID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        LoginID: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        Password: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        Name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        GenderID: {
            type: DataTypes.CHAR(1),
            allowNull: true,
        },
        MobileNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        PhoneNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        EmailID: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Address: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        Photo: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        DateOfJoining: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        DateOfLeave: {
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

    return StaffMaster;
};
