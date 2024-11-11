const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FinancialYearMasterService {
    
    // Create a new financial year record
    async createFinancialYear(data) {
        try {
            const financialYear = await db.FinancialYearMaster.create({
                BranchID: data.BranchID,
                StartDate: data.StartDate,
                EndDate: data.EndDate,
                CreatedOn: data.CreatedOn, // Optionally add CreatedOn and CreatedBy
                CreatedBy: data.CreatedBy
            });
            return financialYear;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create financial year record: " + error);
        }
    }

    // Update an existing financial year record by FinancialYearID
    async updateFinancialYear(financialYearId, data) {
        try {
            const updatedFinancialYear = await db.FinancialYearMaster.update({
                BranchID: data.BranchID,
                StartDate: data.StartDate,
                EndDate: data.EndDate,
                ModifiedOn: data.ModifiedOn, // Optionally add ModifiedOn and ModifiedBy
                ModifiedBy: data.ModifiedBy
            }, {
                where: { FinancialYearID: financialYearId }
            });

            if (updatedFinancialYear[0] === 0) {
                throw new Error("Financial year record not found or no changes made");
            }

            return "Financial year record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update financial year record: " + error);
        }
    }

    // Delete a financial year record by FinancialYearID
    async deleteFinancialYear(financialYearId) {
        try {
            const deleted = await db.FinancialYearMaster.destroy({
                where: { FinancialYearID: financialYearId }
            });

            if (deleted === 0) {
                throw new Error("Financial year record not found");
            }

            return "Financial year record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete financial year record: " + error);
        }
    }

    // Fetch financial year records with optional search, sorting, and pagination
    async fetchFinancialYears(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["FinancialYearID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FinancialYearMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve financial year records");
        }
    }
}

module.exports = FinancialYearMasterService;
