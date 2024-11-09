module.exports = (sequelize, DataTypes) => {
    const SchoolBranchDetails = sequelize.define('SchoolBranchDetails', {
        BranchID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        BranchName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SchoolID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Address: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        ContactNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        EmailID: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FaxNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Website: {
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

    return SchoolBranchDetails;
};
