module.exports = (sequelize, DataTypes) => {
    const TermMaster = sequelize.define('TermMaster', {
        TermID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        TermName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        AssessmentID: {
            type: DataTypes.INTEGER,
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

    return TermMaster;
};
