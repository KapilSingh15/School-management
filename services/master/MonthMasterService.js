const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class MonthMasterService {
    
    // Create a new month record
    async createMonth(data) {
        try {
            const month = await db.MonthMaster.create({
                MonthName: data.MonthName,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return month;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create month record: " + error);
        }
    }

    // Update an existing month record by MonthID
    async updateMonth(monthId, data) {
        try {
            const updatedMonth = await db.MonthMaster.update({
                MonthName: data.MonthName,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { MonthID: monthId }
            });

            if (updatedMonth[0] === 0) {
                throw new Error("Month record not found or no changes made");
            }

            return "Month record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update month record: " + error);
        }
    }

    // Delete a month record by MonthID
    async deleteMonth(monthId) {
        try {
            const deleted = await db.MonthMaster.destroy({
                where: { MonthID: monthId }
            });

            if (deleted === 0) {
                throw new Error("Month record not found");
            }

            return "Month record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete month record: " + error);
        }
    }

    // Fetch month records with optional search, sorting, and pagination
    async fetchMonths(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["MonthID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.MonthMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve month records");
        }
    }
}

module.exports = MonthMasterService;
