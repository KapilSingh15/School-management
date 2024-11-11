const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class GroupMasterService {
    
    // Create a new group record
    async createGroup(data) {
        try {
            const group = await db.GroupMaster.create({
                GroupName: data.GroupName, // GroupName from schema
            });
            return group;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create group record: " + error);
        }
    }

    // Update an existing group record by GroupID
    async updateGroup(groupId, data) {
        try {
            const updatedGroup = await db.GroupMaster.update({
                GroupName: data.GroupName, // GroupName from schema
            }, {
                where: { GroupID: groupId } // Matching the GroupID to identify the record
            });

            if (updatedGroup[0] === 0) {
                throw new Error("Group record not found or no changes made");
            }

            return "Group record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update group record: " + error);
        }
    }

    // Delete a group record by GroupID
    async deleteGroup(groupId) {
        try {
            const deleted = await db.GroupMaster.destroy({
                where: { GroupID: groupId }
            });

            if (deleted === 0) {
                throw new Error("Group record not found");
            }

            return "Group record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete group record: " + error);
        }
    }

    // Fetch group records with optional search, sorting, and pagination
    async fetchGroups(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["GroupID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.GroupMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve group records");
        }
    }
}

module.exports = GroupMasterService;
