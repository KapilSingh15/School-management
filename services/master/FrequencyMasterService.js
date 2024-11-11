const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class FrequencyMasterService {
    
    // Create a new frequency record
    async createFrequency(data) {
        try {
            const frequency = await db.FrequencyMaster.create({
                Frequency: data.Frequency, // Match model field: FrequencyName to Frequency
                Description: data.Description,
                StatusID: data.StatusID
            });
            return frequency;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create frequency record: " + error);
        }
    }

    // Update an existing frequency record by FrequencyID
    async updateFrequency(frequencyId, data) {
        try {
            const updatedFrequency = await db.FrequencyMaster.update({
                Frequency: data.Frequency, // Match model field: FrequencyName to Frequency
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { FrequencyID: frequencyId }
            });

            if (updatedFrequency[0] === 0) {
                throw new Error("Frequency record not found or no changes made");
            }

            return "Frequency record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update frequency record: " + error);
        }
    }

    // Delete a frequency record by FrequencyID
    async deleteFrequency(frequencyId) {
        try {
            const deleted = await db.FrequencyMaster.destroy({
                where: { FrequencyID: frequencyId }
            });

            if (deleted === 0) {
                throw new Error("Frequency record not found");
            }

            return "Frequency record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete frequency record: " + error);
        }
    }

    // Fetch frequency records with optional search, sorting, and pagination
    async fetchFrequencies(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["FrequencyID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.FrequencyMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve frequency records");
        }
    }
}

module.exports = FrequencyMasterService;
