module.exports = (sequelize, DataTypes) => {
    const ClassMaster = sequelize.define('ClassMaster', {
        ClassID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        ClassName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        StatusID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BranchID: {
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

    return ClassMaster;
};
