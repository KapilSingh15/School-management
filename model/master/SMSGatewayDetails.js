module.exports = (sequelize, DataTypes) => {
    const SMSGatewayDetails = sequelize.define('SMSGatewayDetails', {
        GatewayID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        API: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        SenderID: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SMSUserName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        SMSType: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        APIKey: {
            type: DataTypes.TEXT,
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

    return SMSGatewayDetails;
};
