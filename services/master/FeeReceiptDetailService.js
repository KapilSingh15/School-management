const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FeeReceiptDetailService {
    
    // Create a new fee receipt detail record
    async createReceiptDetail(data) {
        try {
            const receiptDetail = await db.FeeReceiptDetail.create({
                FeeReceiptID: data.FeeReceiptID,
                Amount: data.Amount,
                PaymentDate: data.PaymentDate,
                StatusID: data.StatusID
            });
            return receiptDetail;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create fee receipt detail record: " + error);
        }
    }

    // Update an existing fee receipt detail record by ReceiptDetailID
    async updateReceiptDetail(receiptDetailId, data) {
        try {
            const updatedReceiptDetail = await db.FeeReceiptDetail.update({
                FeeReceiptID: data.FeeReceiptID,
                Amount: data.Amount,
                PaymentDate: data.PaymentDate,
                StatusID: data.StatusID
            }, {
                where: { ReceiptDetailID: receiptDetailId }
            });

            if (updatedReceiptDetail[0] === 0) {
                throw new Error("Receipt detail record not found or no changes made");
            }

            return "Receipt detail record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update receipt detail record: " + error);
        }
    }

    // Delete a fee receipt detail record by ReceiptDetailID
    async deleteReceiptDetail(receiptDetailId) {
        try {
            const deleted = await db.FeeReceiptDetail.destroy({
                where: { ReceiptDetailID: receiptDetailId }
            });

            if (deleted === 0) {
                throw new Error("Receipt detail record not found");
            }

            return "Receipt detail record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete receipt detail record: " + error);
        }
    }

    // Fetch fee receipt detail records with optional search, sorting, and pagination
    async fetchReceiptDetails(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ReceiptDetailID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FeeReceiptDetail.findAndCountAll({
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
            throw new Error("Failed to retrieve receipt detail records");
        }
    }
}

module.exports = FeeReceiptDetailService;
