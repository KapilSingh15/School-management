module.exports = (sequelize, DataTypes) => {
    const ResultMasterDetails = sequelize.define('ResultMasterDetails', {
        ResultDetailsID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ResultID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        SubjectID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        TotalMarks: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        MarksScored: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return ResultMasterDetails;
};
