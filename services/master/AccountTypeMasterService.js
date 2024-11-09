const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class AccountTypeMasterService {
    
    // Create a new account type
    async createAccountType(data) {
        try {
            const accountType = await db.AccountTypeMaster.create({
                AccountType: data.AccountType
            });
            return accountType;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create account type: " + error);
        }
    }

    // Update an existing account type by AccountTypeID
    async updateAccountType(accountTypeId, data) {
        try {
            const updatedAccountType = await db.AccountTypeMaster.update({
                AccountType: data.AccountType
            }, {
                where: {
                    AccountTypeID: accountTypeId
                }
            });

            if (updatedAccountType[0] === 0) {
                throw new Error("Account type not found or no changes made");
            }

            return "Account type updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update account type: " + error);
        }
    }

    // Delete an account type by AccountTypeID
    async deleteAccountType(accountTypeId) {
        try {
            const deleted = await db.AccountTypeMaster.destroy({
                where: {
                    AccountTypeID: accountTypeId
                }
            });

            if (deleted === 0) {
                throw new Error("Account type not found");
            }

            return "Account type deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete account type: " + error);
        }
    }

    // Fetch account types with optional search, sorting, and pagination
    async fetchAccountTypes(query) {
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
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["AccountTypeID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.AccountTypeMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve account types");
        }
    }
}

module.exports = AccountTypeMasterService;
