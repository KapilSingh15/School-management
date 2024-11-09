module.exports = (sequelize, DataTypes) => {
    const StudentRegistration = sequelize.define('StudentRegistration', {
        ReceiptNo: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        FormNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FinancialYearID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        RegistrationTypeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        RegistrationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        StudentName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        ClassID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FathersName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ContactNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Area: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        ResidentialAddress: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Reference: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        RegistrationFee: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        Status: {
            type: DataTypes.BOOLEAN,
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

    return StudentRegistration;
};
