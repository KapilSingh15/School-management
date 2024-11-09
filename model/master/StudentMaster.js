module.exports = (sequelize, DataTypes) => {
    const StudentMaster = sequelize.define('StudentMaster', {
        StudentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        ReceiptNo: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        FinancialYearID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BranchID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        RollNumber: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        StudentLoginID: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        Password: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        AdmissionDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ClassID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        SectionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        StudentName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        GenderID: {
            type: DataTypes.CHAR(1),
            allowNull: true,
        },
        AdharNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        BloodGroupID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        GroupID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ContactNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        EmailID: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        CurrentAddress: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        PermanentAddress: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        FathersName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FathersMobileNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        FathersEmailID: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Qualification: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Occupation: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        StudentPhoto: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        StatusID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        RoutID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        LeavingDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        MoveOnNextClass: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ResultID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        StudentTypeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        PlaceOfBirth: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Nationality: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        ReligionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        MotherTounge: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        IdentificationMark: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        PhysicalHandicap: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        QuotaID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        PINCodeR: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        PINCodeP: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        CityID: {
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

    return StudentMaster;
};
