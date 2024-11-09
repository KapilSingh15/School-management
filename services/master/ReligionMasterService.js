const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ReligionMasterService {
    
    // Create a new religion record
    async createReligion(data) {
        try {
            const religion = await db.ReligionMaster.create({
                ReligionName: data.ReligionName,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return religion;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create religion record: " + error);
        }
    }

    // Update an existing religion record by ReligionID
    async updateReligion(religionId, data) {
        try {
            const updatedReligion = await db.ReligionMaster.update({
                ReligionName: data.ReligionName,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { ReligionID: religionId }
            });

            if (updatedReligion[0] === 0) {
                throw new Error("Religion record not found or no changes made");
            }

            return "Religion record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update religion record: " + error);
        }
    }

    // Delete a religion record by ReligionID
    async deleteReligion(religionId) {
        try {
            const deleted = await db.ReligionMaster.destroy({
                where: { ReligionID: religionId }
            });

            if (deleted === 0) {
                throw new Error("Religion record not found");
            }

            return "Religion record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete religion record: " + error);
        }
    }

    // Fetch religion records with optional search, sorting, and pagination
    async fetchReligions(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ReligionID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ReligionMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve religion records");
        }
    }
}

module.exports = ReligionMasterService;
