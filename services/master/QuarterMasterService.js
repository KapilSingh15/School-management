const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class QuarterMasterService {
    
    // Create a new quarter record
    async createQuarter(data) {
        try {
            const quarter = await db.QuaterMaster.create({
                Quater: data.Quater,
                FinancialYearID: data.FinancialYearID
            });
            return quarter;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create quarter record: " + error);
        }
    }

    // Update an existing quarter record by QuaterID
    async updateQuarter(quaterId, data) {
        try {
            const updatedQuarter = await db.QuaterMaster.update({
                Quater: data.Quater,
                FinancialYearID: data.FinancialYearID
            }, {
                where: { QuaterID: quaterId }
            });

            if (updatedQuarter[0] === 0) {
                throw new Error("Quarter record not found or no changes made");
            }

            return "Quarter record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update quarter record: " + error);
        }
    }

    // Delete a quarter record by QuaterID
    async deleteQuarter(quaterId) {
        try {
            const deleted = await db.QuaterMaster.destroy({
                where: { QuaterID: quaterId }
            });

            if (deleted === 0) {
                throw new Error("Quarter record not found");
            }

            return "Quarter record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete quarter record: " + error);
        }
    }

    // Fetch quarter records with optional search, sorting, and pagination
    async fetchQuarters(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["QuaterID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.QuaterMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve quarter records");
        }
    }
}

module.exports = QuarterMasterService;
