const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class LoginMasterService {
    
    // Create a new login record
    async createLogin(data) {
        try {
            const login = await db.LoginMaster.create({
                LoginID: data.LoginID,
                Password: data.Password, // Ensure passwords are hashed in production
                LoginName: data.LoginName,
                MobileNumber: data.MobileNumber,
                EmailID: data.EmailID,
                RoleID: data.RoleID,
                BranchID: data.BranchID,
                StatusID: data.StatusID,
                CreatedOn: data.CreatedOn,
                CreatedBy: data.CreatedBy
            });
            return login;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create login record: " + error);
        }
    }

    // Update an existing login record by LoginID
    async updateLogin(loginId, data) {
        try {
            const updatedLogin = await db.LoginMaster.update({
                Password: data.Password, // Ensure to hash the password when updating
                LoginName: data.LoginName,
                MobileNumber: data.MobileNumber,
                EmailID: data.EmailID,
                RoleID: data.RoleID,
                BranchID: data.BranchID,
                StatusID: data.StatusID,
                ModifiedOn: data.ModifiedOn,
                ModifiedBy: data.ModifiedBy
            }, {
                where: { LoginID: loginId }
            });

            if (updatedLogin[0] === 0) {
                throw new Error("Login record not found or no changes made");
            }

            return "Login record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update login record: " + error);
        }
    }

    // Delete a login record by LoginID
    async deleteLogin(loginId) {
        try {
            const deleted = await db.LoginMaster.destroy({
                where: { LoginID: loginId }
            });

            if (deleted === 0) {
                throw new Error("Login record not found");
            }

            return "Login record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete login record: " + error);
        }
    }

    // Fetch login records with optional search, sorting, and pagination
    async fetchLogins(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["LoginID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.LoginMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve login records");
        }
    }
}

module.exports = LoginMasterService;
