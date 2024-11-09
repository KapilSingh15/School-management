const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class StudentRegistrationService {
    
    // Create a new student registration record
    async createRegistration(data) {
        try {
            const registration = await db.StudentRegistration.create({
                FormNumber: data.FormNumber,
                FinancialYearID: data.FinancialYearID,
                RegistrationTypeID: data.RegistrationTypeID,
                BranchID: data.BranchID,
                RegistrationDate: data.RegistrationDate,
                StudentName: data.StudentName,
                ClassID: data.ClassID,
                FathersName: data.FathersName,
                DOB: data.DOB,
                ContactNo: data.ContactNo,
                Area: data.Area,
                ResidentialAddress: data.ResidentialAddress,
                Reference: data.Reference,
                RegistrationFee: data.RegistrationFee,
                Status: data.Status,
                CreatedOn: new Date(),
                CreatedBy: data.CreatedBy
            });
            return registration;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create student registration record: " + error);
        }
    }

    // Update an existing student registration record by ReceiptNo
    async updateRegistration(receiptNo, data) {
        try {
            const updatedRegistration = await db.StudentRegistration.update({
                FormNumber: data.FormNumber,
                FinancialYearID: data.FinancialYearID,
                RegistrationTypeID: data.RegistrationTypeID,
                BranchID: data.BranchID,
                RegistrationDate: data.RegistrationDate,
                StudentName: data.StudentName,
                ClassID: data.ClassID,
                FathersName: data.FathersName,
                DOB: data.DOB,
                ContactNo: data.ContactNo,
                Area: data.Area,
                ResidentialAddress: data.ResidentialAddress,
                Reference: data.Reference,
                RegistrationFee: data.RegistrationFee,
                Status: data.Status,
                ModifiedOn: new Date(),
                ModifiedBy: data.ModifiedBy
            }, {
                where: { ReceiptNo: receiptNo }
            });

            if (updatedRegistration[0] === 0) {
                throw new Error("Student registration record not found or no changes made");
            }

            return "Student registration record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update student registration record: " + error);
        }
    }

    // Delete a student registration record by ReceiptNo
    async deleteRegistration(receiptNo) {
        try {
            const deleted = await db.StudentRegistration.destroy({
                where: { ReceiptNo: receiptNo }
            });

            if (deleted === 0) {
                throw new Error("Student registration record not found");
            }

            return "Student registration record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete student registration record: " + error);
        }
    }

    // Fetch student registration records with optional search, sorting, and pagination
    async fetchRegistrations(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["ReceiptNo", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.StudentRegistration.findAndCountAll({
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
            throw new Error("Failed to retrieve student registration records");
        }
    }
}

module.exports = StudentRegistrationService;
