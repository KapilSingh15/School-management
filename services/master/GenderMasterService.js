const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class GenderMasterService {
    
    // Create a new gender record
    async createGender(data) {
        try {
            const gender = await db.GenderMaster.create({
                GenderName: data.GenderName,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return gender;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create gender record: " + error);
        }
    }

    // Update an existing gender record by GenderID
    async updateGender(genderId, data) {
        try {
            const updatedGender = await db.GenderMaster.update({
                GenderName: data.GenderName,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { GenderID: genderId }
            });

            if (updatedGender[0] === 0) {
                throw new Error("Gender record not found or no changes made");
            }

            return "Gender record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update gender record: " + error);
        }
    }

    // Delete a gender record by GenderID
    async deleteGender(genderId) {
        try {
            const deleted = await db.GenderMaster.destroy({
                where: { GenderID: genderId }
            });

            if (deleted === 0) {
                throw new Error("Gender record not found");
            }

            return "Gender record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete gender record: " + error);
        }
    }

    // Fetch gender records with optional search, sorting, and pagination
    async fetchGenders(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["GenderID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.GenderMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve gender records");
        }
    }
}

module.exports = GenderMasterService;
