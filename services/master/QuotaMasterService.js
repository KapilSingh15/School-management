const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class QuotaMasterService {
    
    // Create a new quota record
    async createQuota(data) {
        try {
            const quota = await db.QuotaMaster.create({
                QuotaName: data.QuotaName,
            });
            return quota;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create quota record: " + error);
        }
    }

    // Update an existing quota record by QuotaID
    async updateQuota(quotaId, data) {
        try {
            const updatedQuota = await db.QuotaMaster.update({
                QuotaName: data.QuotaName,
            }, {
                where: { QuotaID: quotaId }
            });

            if (updatedQuota[0] === 0) {
                throw new Error("Quota record not found or no changes made");
            }

            return "Quota record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update quota record: " + error);
        }
    }

    // Delete a quota record by QuotaID
    async deleteQuota(quotaId) {
        try {
            const deleted = await db.QuotaMaster.destroy({
                where: { QuotaID: quotaId }
            });

            if (deleted === 0) {
                throw new Error("Quota record not found");
            }

            return "Quota record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete quota record: " + error);
        }
    }

    // Fetch quota records with optional search, sorting, and pagination
    async fetchQuotas(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["QuotaID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.QuotaMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve quota records");
        }
    }
}

module.exports = QuotaMasterService;
