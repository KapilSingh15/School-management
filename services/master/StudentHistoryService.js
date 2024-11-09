const db = require("../../model");
const { Op } = require("sequelize");
const Helper = require("../../config/helper");

class StudentHistoryService {
    
    // Create a new student history record
    async createHistory(data) {
        try {
            const history = await db.StudentHistory.create({
                StudentID: data.StudentID,
                ClassID: data.ClassID,
                SectionID: data.SectionID,
                DateFrom: data.DateFrom,
                DateTo: data.DateTo,
                CreatedBy: data.CreatedBy,
                CreatedOn: new Date()
            });
            return history;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create student history record: " + error);
        }
    }

    // Update an existing student history record by StudentID
    async updateHistory(studentId, data) {
        try {
            const updatedHistory = await db.StudentHistory.update({
                ClassID: data.ClassID,
                SectionID: data.SectionID,
                DateFrom: data.DateFrom,
                DateTo: data.DateTo,
                CreatedBy: data.CreatedBy,
                CreatedOn: new Date()
            }, {
                where: { StudentID: studentId }
            });

            if (updatedHistory[0] === 0) {
                throw new Error("Student history record not found or no changes made");
            }

            return "Student history record updated successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update student history record: " + error);
        }
    }

    // Delete a student history record by StudentID
    async deleteHistory(studentId) {
        try {
            const deleted = await db.StudentHistory.destroy({
                where: { StudentID: studentId }
            });

            if (deleted === 0) {
                throw new Error("Student history record not found");
            }

            return "Student history record deleted successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete student history record: " + error);
        }
    }

    // Fetch student history records with optional search, sorting, and pagination
    async fetchHistories(query) {
        const { searchBy, searchValue, sortby, sortCode, page, limit } = query;

        try {
            let where = {};
            const offset = Helper.getPageNumber(page, limit);

            // Search functionality
            if (searchBy && searchValue) {
                where[searchBy] = { [Op.like]: `%${searchValue}%` };
            }

            // Sorting settings
            const order = sortby && sortCode ? [[sortby, sortCode]] : [["StudentID", "ASC"]];

            // Fetch data with pagination, search, and sorting
            const { count, rows } = await db.StudentHistory.findAndCountAll({
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
            throw new Error("Failed to retrieve student history records");
        }
    }
}

module.exports = StudentHistoryService;
