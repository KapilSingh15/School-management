const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class StaffTypeMasterService {
    
    // Create a new staff type record
    async createType(data) {
        try {
            const staffType = await db.StaffTypeMaster.create({
                TypeName: data.TypeName,   // Staff Type Name
            });
            return staffType;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create staff type record: " + error);
        }
    }

    // Update an existing staff type record by TypeID
    async updateType(typeId, data) {
        try {
            const updatedType = await db.StaffTypeMaster.update({
                TypeName: data.TypeName,   // Staff Type Name
            }, {
                where: { TypeID: typeId }
            });

            if (updatedType[0] === 0) {
                throw new Error("Staff type record not found or no changes made");
            }

            return "Staff type record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update staff type record: " + error);
        }
    }

    // Delete a staff type record by TypeID
    async deleteType(typeId) {
        try {
            const deleted = await db.StaffTypeMaster.destroy({
                where: { TypeID: typeId }
            });

            if (deleted === 0) {
                throw new Error("Staff type record not found");
            }

            return "Staff type record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete staff type record: " + error);
        }
    }

    // Fetch staff type records with optional search, sorting, and pagination
    async fetchTypes(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["TypeID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.StaffTypeMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve staff type records");
        }
    }
}

module.exports = StaffTypeMasterService;
