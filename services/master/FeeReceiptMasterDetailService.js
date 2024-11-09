const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FeeReceiptMasterDetailService {
    
    // Create a new fee receipt master detail record
    async createReceiptMasterDetail(data) {
        try {
            const receiptDetail = await db.FeeReceiptMasterDetail.create({
                FeeReceiptID: data.FeeReceiptID,
                Amount: data.Amount,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return receiptDetail;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create fee receipt master detail record: " + error);
        }
    }

    // Update an existing fee receipt master detail record by DetailID
    async updateReceiptMasterDetail(detailId, data) {
        try {
            const updatedReceiptDetail = await db.FeeReceiptMasterDetail.update({
                FeeReceiptID: data.FeeReceiptID,
                Amount: data.Amount,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { DetailID: detailId }
            });

            if (updatedReceiptDetail[0] === 0) {
                throw new Error("Fee receipt master detail record not found or no changes made");
            }

            return "Fee receipt master detail record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update fee receipt master detail record: " + error);
        }
    }

    // Delete a fee receipt master detail record by DetailID
    async deleteReceiptMasterDetail(detailId) {
        try {
            const deleted = await db.FeeReceiptMasterDetail.destroy({
                where: { DetailID: detailId }
            });

            if (deleted === 0) {
                throw new Error("Fee receipt master detail record not found");
            }

            return "Fee receipt master detail record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete fee receipt master detail record: " + error);
        }
    }

    // Fetch fee receipt master detail records with optional search, sorting, and pagination
    async fetchReceiptMasterDetails(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["DetailID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FeeReceiptMasterDetail.findAndCountAll({
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
            throw new Error("Failed to retrieve fee receipt master detail records");
        }
    }
}

module.exports = FeeReceiptMasterDetailService;
