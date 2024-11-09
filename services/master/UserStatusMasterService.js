const db = require("../../model");
const { Op } = require("sequelize");

class UserStatusMasterService {
    
    // Create a new user status record
    async createUserStatus(data) {
        try {
            const userStatus = await db.UserStatusMaster.create({
                Status: data.Status
            });
            return userStatus;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create user status: " + error);
        }
    }

    // Update an existing user status record by StatusID
    async updateUserStatus(statusId, data) {
        try {
            const updatedUserStatus = await db.UserStatusMaster.update({
                Status: data.Status
            }, {
                where: { StatusID: statusId }
            });
            return updatedUserStatus;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update user status: " + error);
        }
    }

    // Delete a user status record by StatusID
    async deleteUserStatus(statusId) {
        try {
            const deletedUserStatus = await db.UserStatusMaster.destroy({
                where: { StatusID: statusId }
            });
            return deletedUserStatus;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete user status: " + error);
        }
    }

    // Fetch all user status records with optional filtering
    async fetchUserStatuses(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;
        try {
            let where = {};
            const offset = (page - 1) * limit;

            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            const order = sortby && sortCode ? [[sortby, sortCode]] : [["StatusID", "ASC"]];
            const { count, rows } = await db.UserStatusMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve user statuses: " + error);
        }
    }
}

module.exports = UserStatusMasterService;
