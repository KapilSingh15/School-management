const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class StaffRoleMasterService {

    // Create a new staff role record
    async createRole(data) {
        try {
            const role = await db.StaffRoleMaster.create({
                RoleName: data.RoleName,
                TypeID: data.TypeID,
                BranchID: data.BranchID,
                CreatedBy: data.CreatedBy,
                CreatedOn: new Date(),
            });
            return role;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create staff role record: " + error);
        }
    }

    // Update an existing staff role record by RoleID
    async updateRole(roleId, data) {
        try {
            const updatedRole = await db.StaffRoleMaster.update({
                RoleName: data.RoleName,
                TypeID: data.TypeID,
                BranchID: data.BranchID,
                ModifiedBy: data.ModifiedBy,
                ModifiedOn: new Date(),
            }, {
                where: { RoleID: roleId }
            });

            if (updatedRole[0] === 0) {
                throw new Error("Staff role record not found or no changes made");
            }

            return "Staff role record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update staff role record: " + error);
        }
    }

    // Delete a staff role record by RoleID
    async deleteRole(roleId) {
        try {
            const deleted = await db.StaffRoleMaster.destroy({
                where: { RoleID: roleId }
            });

            if (deleted === 0) {
                throw new Error("Staff role record not found");
            }

            return "Staff role record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete staff role record: " + error);
        }
    }

    // Fetch staff role records with optional search, sorting, and pagination
    async fetchRoles(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["RoleID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.StaffRoleMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve staff role records");
        }
    }
}

module.exports = StaffRoleMasterService;
