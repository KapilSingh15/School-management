const db = require("../../model");
const { Op } = require("sequelize");

class UserModulePermissionService {
    
    // Create a new user module permission record
    async createUserModulePermission(data) {
        try {
            const permission = await db.UserModulePermission.create({
                LoginID: data.LoginID,
                ModuleID: data.ModuleID
            });
            return permission;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create user module permission: " + error);
        }
    }

    // Update an existing user module permission record by LoginID and ModuleID
    async updateUserModulePermission(loginId, moduleId, data) {
        try {
            const updatedPermission = await db.UserModulePermission.update({
                ModuleID: data.ModuleID // Note: This might be unnecessary since ModuleID is a primary key
            }, {
                where: { LoginID: loginId, ModuleID: moduleId }
            });
            return updatedPermission;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update user module permission: " + error);
        }
    }

    // Delete a user module permission record by LoginID and ModuleID
    async deleteUserModulePermission(loginId, moduleId) {
        try {
            const deletedPermission = await db.UserModulePermission.destroy({
                where: { LoginID: loginId, ModuleID: moduleId }
            });
            return deletedPermission;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete user module permission: " + error);
        }
    }

    // Fetch all user module permission records with optional filtering
    async fetchUserModulePermissions(query) {
        const { loginId, sortby, sortCode, page, limit } = query;
        try {
            let where = {};
            const offset = (page - 1) * limit;

            if (loginId) {
                where.LoginID = { [Op.eq]: loginId };
            }

            const order = sortby && sortCode ? [[sortby, sortCode]] : [["LoginID", "ASC"]];
            const { count, rows } = await db.UserModulePermission.findAndCountAll({
                where,
                offset: parseInt(offset),
                limit: parseInt(limit),
                order
            });
            return {
                data: {
                    pagination: {
                        currentPage: parseInt(page),
                        pageSize: parseInt(limit),
                        totalPages: Math.ceil(count / limit),
                        totalResults: count,
                    },
                    data: rows,
                },
            };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to retrieve user module permissions: " + error);
        }
    }
}

module.exports = UserModulePermissionService;
