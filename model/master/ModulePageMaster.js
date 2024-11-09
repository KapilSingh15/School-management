module.exports = (sequelize, DataTypes) => {
    const ModulePageMaster = sequelize.define('ModulePageMaster', {
        ModulePageID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        ModuleID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        PageName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Page: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        SortBy: {
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

    return ModulePageMaster;
};
