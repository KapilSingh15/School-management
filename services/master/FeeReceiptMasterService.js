const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FeeReceiptMasterService {
    
    // Create a new fee receipt record
    async createReceipt(data) {
        try {
            const receipt = await db.FeeReceiptMaster.create({
                StudentID: data.StudentID,
                ClassID: data.ClassID,
                SectionID: data.SectionID,
                FinancialYearID: data.FinancialYearID,
                FeeDate: data.FeeDate,
                PaymentMode: data.PaymentMode,
                TotalFee: data.TotalFee,
                LateFee: data.LateFee,
                ConcessionPercentage: data.ConcessionPercentage,
                ConcessionAmount: data.ConcessionAmount,
                NetFee: data.NetFee,
                ReceiptAmount: data.ReceiptAmount,
                Balance: data.Balance,
                BankName: data.BankName,
                ChequeNo: data.ChequeNo,
                ChequeDate: data.ChequeDate,
                Remarks: data.Remarks,
                ReceiptDetails: data.ReceiptDetails,
                CreatedOn: data.CreatedOn,
                CreatedBy: data.CreatedBy
            });
            return receipt;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create fee receipt record: " + error);
        }
    }

    // Update an existing fee receipt record by FeeReceiptID
    async updateReceipt(feeReceiptId, data) {
        try {
            const updatedReceipt = await db.FeeReceiptMaster.update({
                StudentID: data.StudentID,
                ClassID: data.ClassID,
                SectionID: data.SectionID,
                FinancialYearID: data.FinancialYearID,
                FeeDate: data.FeeDate,
                PaymentMode: data.PaymentMode,
                TotalFee: data.TotalFee,
                LateFee: data.LateFee,
                ConcessionPercentage: data.ConcessionPercentage,
                ConcessionAmount: data.ConcessionAmount,
                NetFee: data.NetFee,
                ReceiptAmount: data.ReceiptAmount,
                Balance: data.Balance,
                BankName: data.BankName,
                ChequeNo: data.ChequeNo,
                ChequeDate: data.ChequeDate,
                Remarks: data.Remarks,
                ReceiptDetails: data.ReceiptDetails,
                ModifiedOn: data.ModifiedOn,
                ModifiedBy: data.ModifiedBy
            }, {
                where: { FeeReceiptID: feeReceiptId }
            });

            if (updatedReceipt[0] === 0) {
                throw new Error("Fee receipt record not found or no changes made");
            }

            return "Fee receipt record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update fee receipt record: " + error);
        }
    }

    // Delete a fee receipt record by FeeReceiptID
    async deleteReceipt(feeReceiptId) {
        try {
            const deleted = await db.FeeReceiptMaster.destroy({
                where: { FeeReceiptID: feeReceiptId }
            });

            if (deleted === 0) {
                throw new Error("Fee receipt record not found");
            }

            return "Fee receipt record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete fee receipt record: " + error);
        }
    }

    // Fetch fee receipt records with optional search, sorting, and pagination
    async fetchReceipts(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["FeeReceiptID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FeeReceiptMaster.findAndCountAll({
                where,
                offset,
                limit: parseInt(limit) || Helper.getPageNumber(1, limit), // Default limit if undefined
                order
            });

            return {
                data: {
                    pagination: {
                        currentPage: parseInt(page),
                        pageSize: parseInt(limit) || Helper.getPageNumber(1, limit),
                        totalPages: Math.ceil(count / (parseInt(limit) || Helper.getPageNumber(1, limit))),
                        totalResults: count,
                    },
                    data: rows,
                },
            };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to retrieve fee receipt records");
        }
    }
}

module.exports = FeeReceiptMasterService;
