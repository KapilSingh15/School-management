const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class StaffMasterService {

    // Create a new staff record
    async createStaff(data) {
        try {
            const staff = await db.StaffMaster.create({
                RoleID: data.RoleID,
                BranchID: data.BranchID,
                LoginID: data.LoginID,
                Password: data.Password,
                Name: data.Name,
                GenderID: data.GenderID,
                MobileNumber: data.MobileNumber,
                PhoneNumber: data.PhoneNumber,
                EmailID: data.EmailID,
                Address: data.Address,
                Photo: data.Photo,
                DateOfJoining: data.DateOfJoining,
                DateOfLeave: data.DateOfLeave,
                CreatedBy: data.CreatedBy,
                CreatedOn: new Date(),
            });
            return staff;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create staff record: " + error);
        }
    }

    // Update an existing staff record by StaffID
    async updateStaff(staffId, data) {
        try {
            const updatedStaff = await db.StaffMaster.update({
                RoleID: data.RoleID,
                BranchID: data.BranchID,
                LoginID: data.LoginID,
                Password: data.Password,
                Name: data.Name,
                GenderID: data.GenderID,
                MobileNumber: data.MobileNumber,
                PhoneNumber: data.PhoneNumber,
                EmailID: data.EmailID,
                Address: data.Address,
                Photo: data.Photo,
                DateOfJoining: data.DateOfJoining,
                DateOfLeave: data.DateOfLeave,
                ModifiedBy: data.ModifiedBy,
                ModifiedOn: new Date(),
            }, {
                where: { StaffID: staffId }
            });

            if (updatedStaff[0] === 0) {
                throw new Error("Staff record not found or no changes made");
            }

            return "Staff record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update staff record: " + error);
        }
    }

    // Delete a staff record by StaffID
    async deleteStaff(staffId) {
        try {
            const deleted = await db.StaffMaster.destroy({
                where: { StaffID: staffId }
            });

            if (deleted === 0) {
                throw new Error("Staff record not found");
            }

            return "Staff record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete staff record: " + error);
        }
    }

    // Fetch staff records with optional search, sorting, and pagination
    async fetchStaffs(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["StaffID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.StaffMaster.findAndCountAll({
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
            throw new Error("Failed to retrieve staff records");
        }
    }
}

module.exports = StaffMasterService;
