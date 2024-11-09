const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FrequencyMonthMappingMasterService {
    
    // Create a new frequency month mapping record
    async createFrequencyMonthMapping(data) {
        try {
            const mapping = await db.FrequencyMonthMappingMaster.create({
                FrequencyID: data.FrequencyID,
                Month: data.Month,
                Year: data.Year,
                StatusID: data.StatusID
            });
            return mapping;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create frequency month mapping record: " + error);
        }
    }

    // Update an existing frequency month mapping record by MappingID
    async updateFrequencyMonthMapping(mappingId, data) {
        try {
            const updatedMapping = await db.FrequencyMonthMappingMaster.update({
                FrequencyID: data.FrequencyID,
                Month: data.Month,
                Year: data.Year,
                StatusID: data.StatusID
            }, {
                where: { MappingID: mappingId }
            });

            if (updatedMapping[0] === 0) {
                throw new Error("Frequency month mapping record not found or no changes made");
            }

            return "Frequency month mapping record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update frequency month mapping record: " + error);
        }
    }

    // Delete a frequency month mapping record by MappingID
    async deleteFrequencyMonthMapping(mappingId) {
        try {
            const deleted = await db.FrequencyMonthMappingMaster.destroy({
                where: { MappingID: mappingId }
            });

            if (deleted === 0) {
                throw new Error("Frequency month mapping record not found");
            }

            return "Frequency month mapping record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete frequency month mapping record: " + error);
        }
    }

    // Fetch frequency month mapping records with optional search, sorting, and pagination
    async fetchFrequencyMonthMappings(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["MappingID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FrequencyMonthMappingMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve frequency month mapping records");
        }
    }
}

module.exports = FrequencyMonthMappingMasterService;
