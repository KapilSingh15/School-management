const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class BloodGroupMasterService {
    
    // Create a new blood group
    async createBloodGroup(data) {
        try {
            const bloodGroup = await db.BloodGroupMaster.create({
                BloodGroup: data.BloodGroup
            });
            return bloodGroup;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create blood group: " + error);
        }
    }

    // Update an existing blood group by BloodGroupID
    async updateBloodGroup(bloodGroupId, data) {
        try {
            const updatedBloodGroup = await db.BloodGroupMaster.update({
                BloodGroup: data.BloodGroup
            }, {
                where: {
                    BloodGroupID: bloodGroupId
                }
            });

            if (updatedBloodGroup[0] === 0) {
                throw new Error("Blood group not found or no changes made");
            }

            return "Blood group updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update blood group: " + error);
        }
    }

    // Delete a blood group by BloodGroupID
    async deleteBloodGroup(bloodGroupId) {
        try {
            const deleted = await db.BloodGroupMaster.destroy({
                where: {
                    BloodGroupID: bloodGroupId
                }
            });

            if (deleted === 0) {
                throw new Error("Blood group not found");
            }

            return "Blood group deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete blood group: " + error);
        }
    }

    // Fetch blood groups with optional search, sorting, and pagination
    async fetchBloodGroups(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            
            // Calculate offset using Helper.getPageNumber
            const offset = Helper.getPageNumber(page, limit);
            
            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["BloodGroupID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.BloodGroupMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve blood groups");
        }
    }
}

module.exports = BloodGroupMasterService;
