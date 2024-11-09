const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FeeBalanceMasterService {
    
    // Create a new fee balance record
    async createFeeBalance(data) {
        try {
            const feeBalance = await db.FeeBalanceMaster.create({
                StudentID: data.StudentID,
                BalanceAmount: data.BalanceAmount,
                DueDate: data.DueDate,
                StatusID: data.StatusID
            });
            return feeBalance;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create fee balance record: " + error);
        }
    }

    // Update an existing fee balance record by FeeBalanceID
    async updateFeeBalance(feeBalanceId, data) {
        try {
            const updatedFeeBalance = await db.FeeBalanceMaster.update({
                StudentID: data.StudentID,
                BalanceAmount: data.BalanceAmount,
                DueDate: data.DueDate,
                StatusID: data.StatusID
            }, {
                where: { FeeBalanceID: feeBalanceId }
            });

            if (updatedFeeBalance[0] === 0) {
                throw new Error("Fee balance record not found or no changes made");
            }

            return "Fee balance record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update fee balance record: " + error);
        }
    }

    // Delete a fee balance record by FeeBalanceID
    async deleteFeeBalance(feeBalanceId) {
        try {
            const deleted = await db.FeeBalanceMaster.destroy({
                where: { FeeBalanceID: feeBalanceId }
            });

            if (deleted === 0) {
                throw new Error("Fee balance record not found");
            }

            return "Fee balance record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete fee balance record: " + error);
        }
    }

    // Fetch fee balance records with optional search, sorting, and pagination
    async fetchFeeBalances(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["FeeBalanceID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FeeBalanceMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve fee balance records");
        }
    }
}

module.exports = FeeBalanceMasterService;
