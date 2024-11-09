module.exports = (sequelize, DataTypes) => {
    const ParentsDetailMaster = sequelize.define('ParentsDetailMaster', {
        ParentsID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        StudentID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FathersName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        OccupationF: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        OrganisationF: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        DesignationF: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        QualificationF: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        MobileNumberF: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        EmailIDF: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        MothersName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        OccupationM: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        OrganisationM: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        DesignationM: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        QualificationM: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        MobileNumberM: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        EmailIDM: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        LocalGardianName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        MobileNumberL: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Relation: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        FatherPhoto: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        MotherPhoto: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        LocalGardianPhoto: {
            type: DataTypes.STRING(50),
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

    return ParentsDetailMaster;
};
