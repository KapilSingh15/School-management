const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class RoleMasterService {
    
    // Create a new role record
    async createRole(data) {
        try {
            const role = await db.RoleMaster.create({
                RoleName: data.RoleName,
                Description: data.Description,
                StatusID: data.StatusID
            });
            return role;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create role record: " + error);
        }
    }

    // Update an existing role record by RoleID
    async updateRole(roleId, data) {
        try {
            const updatedRole = await db.RoleMaster.update({
                RoleName: data.RoleName,
                Description: data.Description,
                StatusID: data.StatusID
            }, {
                where: { RoleID: roleId }
            });

            if (updatedRole[0] === 0) {
                throw new Error("Role record not found or no changes made");
            }

            return "Role record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update role record: " + error);
        }
    }

    // Delete a role record by RoleID
    async deleteRole(roleId) {
        try {
            const deleted = await db.RoleMaster.destroy({
                where: { RoleID: roleId }
            });

            if (deleted === 0) {
                throw new Error("Role record not found");
            }

            return "Role record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete role record: " + error);
        }
    }

    // Fetch role records with optional search, sorting, and pagination
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
            const { count, rows } = await db.RoleMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve role records");
        }
    }
}

module.exports = RoleMasterService;
