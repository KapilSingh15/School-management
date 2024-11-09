const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FeeHeadMonthMasterService {
    
    // Create a new fee head month record
    async createFeeHeadMonth(data) {
        try {
            const feeHeadMonth = await db.FeeHeadMonthMaster.create({
                FeeHeadID: data.FeeHeadID,
                Month: data.Month,
                Year: data.Year,
                StatusID: data.StatusID
            });
            return feeHeadMonth;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create fee head month record: " + error);
        }
    }

    // Update an existing fee head month record by FeeHeadMonthID
    async updateFeeHeadMonth(feeHeadMonthId, data) {
        try {
            const updatedFeeHeadMonth = await db.FeeHeadMonthMaster.update({
                FeeHeadID: data.FeeHeadID,
                Month: data.Month,
                Year: data.Year,
                StatusID: data.StatusID
            }, {
                where: { FeeHeadMonthID: feeHeadMonthId }
            });

            if (updatedFeeHeadMonth[0] === 0) {
                throw new Error("Fee head month record not found or no changes made");
            }

            return "Fee head month record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update fee head month record: " + error);
        }
    }

    // Delete a fee head month record by FeeHeadMonthID
    async deleteFeeHeadMonth(feeHeadMonthId) {
        try {
            const deleted = await db.FeeHeadMonthMaster.destroy({
                where: { FeeHeadMonthID: feeHeadMonthId }
            });

            if (deleted === 0) {
                throw new Error("Fee head month record not found");
            }

            return "Fee head month record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete fee head month record: " + error);
        }
    }

    // Fetch fee head month records with optional search, sorting, and pagination
    async fetchFeeHeadMonths(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["FeeHeadMonthID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FeeHeadMonthMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve fee head month records");
        }
    }
}

module.exports = FeeHeadMonthMasterService;
