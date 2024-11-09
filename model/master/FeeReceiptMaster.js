module.exports = (sequelize, DataTypes) => {
    const FeeReceiptMaster = sequelize.define('FeeReceiptMaster', {
        FeeReceiptID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        StudentID: {
            type: DataTypes.INTEGER,
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
        FinancialYearID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        FeeDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        PaymentMode: {
            type: DataTypes.CHAR(1),
            allowNull: true,
        },
        TotalFee: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        LateFee: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        ConcessionPercentage: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        ConcessionAmount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        NetFee: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        ReceiptAmount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        Balance: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
        BankName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        ChequeNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        ChequeDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Remarks: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        ReceiptDetails: {
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

    return FeeReceiptMaster;
};
