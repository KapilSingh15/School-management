const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ResultStatusService {
    
    // Create a new result status record
    async createResultStatus(data) {
        try {
            const resultStatus = await db.ResultStatus.create({
                StatusName: data.StatusName,
                Description: data.Description,
                IsActive: data.IsActive
            });
            return resultStatus;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create result status record: " + error);
        }
    }

    // Update an existing result status record by StatusID
    async updateResultStatus(statusId, data) {
        try {
            const updatedResultStatus = await db.ResultStatus.update({
                StatusName: data.StatusName,
                Description: data.Description,
                IsActive: data.IsActive
            }, {
                where: { StatusID: statusId }
            });

            if (updatedResultStatus[0] === 0) {
                throw new Error("Result status record not found or no changes made");
            }

            return "Result status record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update result status record: " + error);
        }
    }

    // Delete a result status record by StatusID
    async deleteResultStatus(statusId) {
        try {
            const deleted = await db.ResultStatus.destroy({
                where: { StatusID: statusId }
            });

            if (deleted === 0) {
                throw new Error("Result status record not found");
            }

            return "Result status record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete result status record: " + error);
        }
    }

    // Fetch result status records with optional search, sorting, and pagination
    async fetchResultStatuses(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["StatusID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ResultStatus.findAndCountAll({
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
            throw new Error("Failed to retrieve result status records");
        }
    }
}

module.exports = ResultStatusService;
