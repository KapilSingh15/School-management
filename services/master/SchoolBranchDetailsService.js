const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class SchoolBranchDetailsService {
    
    // Create a new school branch record
    async createBranch(data) {
        try {
            const branch = await db.SchoolBranchDetails.create({
                SchoolID: data.SchoolID,
                BranchName: data.BranchName,
                Address: data.Address,
                ContactNo: data.ContactNo,
                EmailID: data.EmailID,
                StatusID: data.StatusID
            });
            return branch;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create school branch record: " + error);
        }
    }

    // Update an existing school branch record by BranchID
    async updateBranch(branchId, data) {
        try {
            const updatedBranch = await db.SchoolBranchDetails.update({
                SchoolID: data.SchoolID,
                BranchName: data.BranchName,
                Address: data.Address,
                ContactNo: data.ContactNo,
                EmailID: data.EmailID,
                StatusID: data.StatusID
            }, {
                where: { BranchID: branchId }
            });

            if (updatedBranch[0] === 0) {
                throw new Error("School branch record not found or no changes made");
            }

            return "School branch record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update school branch record: " + error);
        }
    }

    // Delete a school branch record by BranchID
    async deleteBranch(branchId) {
        try {
            const deleted = await db.SchoolBranchDetails.destroy({
                where: { BranchID: branchId }
            });

            if (deleted === 0) {
                throw new Error("School branch record not found");
            }

            return "School branch record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete school branch record: " + error);
        }
    }

    // Fetch school branch records with optional search, sorting, and pagination
    async fetchBranches(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["BranchID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.SchoolBranchDetails.findAndCountAll({
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
            throw new Error("Failed to retrieve school branch records");
        }
    }
}

module.exports = SchoolBranchDetailsService;
