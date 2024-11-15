const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class RegistrationFeeMasterService {
    
    // Create a new registration fee record
    async createRegistrationFee(data) {
        try {
            const registrationFee = await db.RegistrationFeeMaster.create({
                RegistrationTypeID: data.RegistrationTypeID,
                FinancialYearID: data.FinancialYearID,
                BranchID: data.BranchID,
                RegistrationFee: data.RegistrationFee,
                CreatedOn: data.CreatedOn,
                CreatedBy: data.CreatedBy
            });
            return registrationFee;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create registration fee record: " + error);
        }
    }

    // Update an existing registration fee record by RegistrationFeeID
    async updateRegistrationFee(feeId, data) {
        try {
            const updatedRegistrationFee = await db.RegistrationFeeMaster.update({
                RegistrationTypeID: data.RegistrationTypeID,
                FinancialYearID: data.FinancialYearID,
                BranchID: data.BranchID,
                RegistrationFee: data.RegistrationFee,
                ModifiedOn: data.ModifiedOn,
                ModifiedBy: data.ModifiedBy
            }, {
                where: { RegistrationFeeID: feeId }
            });

            if (updatedRegistrationFee[0] === 0) {
                throw new Error("Registration fee record not found or no changes made");
            }

            return "Registration fee record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update registration fee record: " + error);
        }
    }

    // Delete a registration fee record by RegistrationFeeID
    async deleteRegistrationFee(feeId) {
        try {
            const deleted = await db.RegistrationFeeMaster.destroy({
                where: { RegistrationFeeID: feeId }
            });

            if (deleted === 0) {
                throw new Error("Registration fee record not found");
            }

            return "Registration fee record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete registration fee record: " + error);
        }
    }

    // Fetch registration fee records with optional search, sorting, and pagination
    async fetchRegistrationFees(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["RegistrationFeeID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.RegistrationFeeMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve registration fee records");
        }
    }
}

module.exports = RegistrationFeeMasterService;
