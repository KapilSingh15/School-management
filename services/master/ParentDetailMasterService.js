const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class ParentDetailMasterService {
    
    // Create a new parent detail record
    async createParentDetail(data) {
        try {
            const parentDetail = await db.ParentDetailMaster.create({
                ParentName: data.ParentName,
                ContactNumber: data.ContactNumber,
                Email: data.Email,
                Address: data.Address,
                StatusID: data.StatusID
            });
            return parentDetail;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create parent detail record: " + error);
        }
    }

    // Update an existing parent detail record by ParentID
    async updateParentDetail(parentId, data) {
        try {
            const updatedParentDetail = await db.ParentDetailMaster.update({
                ParentName: data.ParentName,
                ContactNumber: data.ContactNumber,
                Email: data.Email,
                Address: data.Address,
                StatusID: data.StatusID
            }, {
                where: { ParentID: parentId }
            });

            if (updatedParentDetail[0] === 0) {
                throw new Error("Parent detail record not found or no changes made");
            }

            return "Parent detail record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update parent detail record: " + error);
        }
    }

    // Delete a parent detail record by ParentID
    async deleteParentDetail(parentId) {
        try {
            const deleted = await db.ParentDetailMaster.destroy({
                where: { ParentID: parentId }
            });

            if (deleted === 0) {
                throw new Error("Parent detail record not found");
            }

            return "Parent detail record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete parent detail record: " + error);
        }
    }

    // Fetch parent detail records with optional search, sorting, and pagination
    async fetchParentDetails(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ParentID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.ParentDetailMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve parent detail records");
        }
    }
}

module.exports = ParentDetailMasterService;
